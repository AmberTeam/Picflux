using Cimber.Scraper.Models;
using Cimber.Scraper.Services;
using HtmlAgilityPack;
using Spectre.Console;
using System.Collections.Concurrent;

namespace Cimber.Scraper.Scrapers
{
    public class KinogoScraper : BaseScraper
    {
        private readonly object filmsLock = new object();
        private readonly object taskLock = new object();

        public override void Start()
        {
            try
            {
                getFilms(Website.KINOGO);
                var pagesCount = getPagesCount();

                AnsiConsole.Progress()
                    .Columns(new ProgressColumn[]
                    {
                        new TaskDescriptionColumn(),
                        new ProgressBarColumn(),
                        new PercentageColumn(),
                        new ElapsedTimeColumn(),
                        new RemainingTimeColumn()
                    }).Start(ctx =>
                    {
                        var task = ctx.AddTask($"[green]Scraping {Website.KINOGO}[/]");
                        task.MaxValue = pagesCount;

                        var options = new ParallelOptions { MaxDegreeOfParallelism = Environment.ProcessorCount };

                        Parallel.For(2, pagesCount + 1, options, i =>
                        {
                            var url = $"{Website.KINOGO}/page/{i}";

                            getFilms(url);

                            Console.Clear();
                            lock (taskLock)
                            {
                                task.Increment(1);
                                task.Description($"[green]Scraping {Website.KINOGO}[/]");
                            }
                        });

                        task.StopTask();
                    });
            }
            catch (Exception ex)
            {
                Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        // Modify the getFilms method to make it thread-safe
        protected override void getFilms(string url)
        {
            try
            {
                var links = getLinks(url);

                // Use a local list to temporarily store films
                var films = new List<Film>();

                // Parallelize the processing of links
                Parallel.ForEach(links!, link =>
                {
                    try
                    {
                        var film = getFilm(link.Attributes["href"].Value);

                        if (film != null && film.Players.Count > 0)
                        {
                            lock (filmsLock)
                            {
                                films.Add(film);
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                    }
                });

                // Add the films to the database outside of the parallel loop
                lock (filmsLock)
                {
                    Parallel.ForEach(films, film =>
                    {
                        DatabaseService.AddFilm(film);
                    });
                }
            }
            catch (Exception ex)
            {
                Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        protected override Film? getFilm(string url)
        {
            try
            {
                var document = GetDocument(url)?.DocumentNode;
                var title = document?.SelectSingleNode(".//h1[contains(concat(\" \",normalize-space(@class),\" \"),\" kino-h \")]").InnerText.Trim();
                var year = document?.SelectSingleNode(
                    "/html/body/div[1]/div/div[2]/div/div[2]/div[1]/article/div[2]/div/div[2]/ul[1]/li/div/span[contains(normalize-space(),\"Год выпуска:\")]/parent::*/parent::*"
                ).InnerText.Split(":")[1].Trim();
                var countries = document
                    ?.SelectSingleNode(
                        "/html/body/div[1]/div/div[2]/div/div[2]/div[1]/article/div[2]/div/div[2]/ul[1]/li/div/span[contains(normalize-space(),\"Страна:\")]/parent::*/parent::*"
                    ).InnerText.Split(":")[1].Trim()
                    .Split(",")
                    .Select(i => i.Trim())
                    .ToList();
                var genres = document
                    ?.SelectSingleNode(
                        ".//span[@itemprop=\"genre\"]"
                    ).InnerText
                    .Split(",")
                    .Select(i => i.Trim())
                    .ToList();
                string? duration = null;
                try
                {
                    duration = document?.SelectSingleNode(@".//ul//li//div//span[contains(normalize-space(),""Продолжительность:"")]/parent::*/parent::*").InnerText.Trim();
                }
                catch { }
                var description = document
                    ?.SelectSingleNode(".//span[@itemprop=\"description\"]")
                    .InnerText.Trim();
                var poster = Website.KINOGO + document
                    ?.SelectSingleNode(""".//img[@itemprop="image"]""").Attributes["src"]
                    .Value;
                var players = document
                    ?.SelectNodes(".//iframe")
                    .Where(i => i.Id != "frame_youtube")
                    .Select(i => i.Attributes["src"].Value.Trim().Length < 8 ? i.Attributes["data-tmp-src"].Value.Trim() : i.Attributes["src"].Value.Trim())
                    .Select(i => i.StartsWith("https") ? i : $"https{i}")
                    .Select(i => i.Contains("&#58;") ? i.Replace("&#58;", "::") : i)
                    .ToList();
                players!.RemoveAll(i => i.Contains("youtube"));
                players!.RemoveAll(i => i.Contains("red.uboost"));

                /* Translation */
                string? enTitle = null;
                try
                {
                    enTitle = GoogleService.Translate(Language.English, $"{title!} {year}").Result;

                    if (enTitle == null)
                    {
                        enTitle = TranslationService.Translate(Language.Russian, Language.English, title!).Result;
                    }
                }
                catch { }


                return new Film()
                {
                    Language = Language.Russian,
                    Title = title ?? "",
                    RussianTitle = title ?? "",
                    EnglishTitle = enTitle ?? "",
                    LowercaseTitle = title!.ToLower() ?? "",
                    Year = int.Parse(year ?? "0"),
                    Description = description ?? "",
                    Countries = countries!,
                    Duration = getDuration(duration!) ?? new TimeSpan(0, 0, 0),
                    Genres = genres!,
                    Poster = poster ?? "",
                    Players = players ?? new List<string>(),
                };
            }
            catch (Exception ex)
            {
                Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                return null;
            }
        }

        protected override TimeSpan? getDuration(string stringDuration)
        {
            try
            {
                if (stringDuration.Contains("—"))
                    return null;

                stringDuration = stringDuration.Replace("Продолжительность: ", "");
                int minutes = int.Parse(stringDuration.Split("мин")[0].Trim());

                return TimeSpan.FromMinutes(minutes);
            }
            catch (Exception ex)
            {
                Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                return null;
            }
        }

        protected override HtmlNodeCollection? getLinks(string url)
        {
            try
            {
                var document = GetDocument(url)?.DocumentNode;
                var nodes = document?.SelectNodes(
                    ".//div//a[contains(concat(\" \",normalize-space(@class),\" \"),\" kino-h \")]"
                );
                return nodes;
            }
            catch (Exception ex)
            {
                Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                return null;
            }
        }

        protected override int getPagesCount()
        {
            try
            {
                var document = GetDocument(Website.KINOGO)?.DocumentNode;
                string lastLink = document!
                    .SelectSingleNode(
                        @".//span[contains(concat("" "",normalize-space(@class),"" ""),"" navigation "")]/child::*[last()]/self::*"
                    )
                    .Attributes["href"].Value.Split("/page/")[1]
                    .Replace("/", "")
                    .Trim();

                return int.Parse(lastLink);
            }
            catch (Exception ex)
            {
                Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                return 0;
            }
        }
    }
}

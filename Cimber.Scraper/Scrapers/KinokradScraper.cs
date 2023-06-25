using Cimber.Scraper.Models;
using HtmlAgilityPack;
using Spectre.Console;
using System.Collections.Concurrent;

namespace Cimber.Scraper.Scrapers
{
    public class KinokradScraper : BaseScraper
    {
        private readonly object filmsLock = new object();
        private readonly object taskLock = new object();

        public override void Start()
        {
            try
            {
                getFilms(Website.KINOKRAD);
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
                        var task = ctx.AddTask($"[green]Scraping {Website.KINOKRAD}[/]");
                        task.MaxValue = pagesCount;

                        Parallel.For(2, pagesCount + 1, i =>
                        {
                            var url = $"{Website.KINOKRAD}/page/{i}";

                            getFilms(url);

                            Console.Clear();
                            lock (taskLock)
                            {
                                task.Increment(1);
                                task.Description($"[green]Scraping url({url}) page {i} of {pagesCount}[/]");
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

        protected override void getFilms(string url)
        {
            try
            {
                var links = getLinks(url);

                var films = new ConcurrentBag<Film>();

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

                lock (filmsLock)
                {
                    foreach (var film in films)
                    {
                        DatabaseService.AddFilm(film);
                    }
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
                var title = document?.SelectSingleNode(".//h1[@itemprop=\"name\"]").InnerText.Split(
                    "("
                )[0].Trim();
                string? englishTitle = null;
                try
                {
                    englishTitle = document?.SelectSingleNode(
                    ".//span[contains(concat(\" \",normalize-space(@class),\" \"),\" orange \")][contains(normalize-space(),\"Оригинальное название:\")]/parent::*"
                ).InnerText.Split(":")[1].Trim();
                }
                catch { }
                var year = document?.SelectSingleNode(
                    ".//span[contains(concat(\" \",normalize-space(@class),\" \"),\" orange \")][contains(normalize-space(),\"Год:\")]/parent::*"
                ).InnerText.Split(":")[1].Trim();
                var countries = document
                    ?.SelectSingleNode(
                        ".//span[contains(concat(\" \",normalize-space(@class),\" \"),\" orange \")][contains(normalize-space(),\"Страна:\")]/parent::*"
                    ).InnerText.Split(":")[1].Trim()
                    .Split(" ")
                    .ToList();
                var genres = document
                    ?.SelectSingleNode(
                        @"
.//span[contains(concat("" "",normalize-space(@class),"" ""),"" orange "")][contains(normalize-space(),""Жанр:"")]/parent::*"
                    )
                    .SelectNodes(".//a")
                    .Select(a => a.InnerText)
                    .ToList();
                var duration = document?.SelectSingleNode(
                    @".//span[contains(concat("" "",normalize-space(@class),"" ""),"" orange "")][contains(normalize-space(),""Продолжительность:"")]/parent::*"
                ).InnerText.Split(":")[1].Trim();
                var description = document
                    ?.SelectSingleNode(".//div[@itemprop=\"description\"]")
                    .InnerText.Trim();
                var poster = document
                    ?.SelectSingleNode(""".//div[contains(concat(" ",normalize-space(@class)," ")," bigposter ")]//picture//img""").Attributes["src"]
                    .Value;
                var players = document
                                ?.SelectNodes(".//div[contains(concat(\" \",normalize-space(@class),\" \"),\" tabs \")]//ul[contains(concat(\" \",normalize-space(@class),\" \"),\" film \")]//li")
                                .Select(i => i.Attributes["data-iframe"].Value.Trim())
                                .Select(i => i.StartsWith("https") ? i : $"https{i}")
                                .ToList();
                players!.RemoveAll(i => i.Contains("youtube"));
                players!.RemoveAll(i => i.Contains("red.uboost"));

                return new Film()
                {
                    Language = Language.Russian,
                    Title = title ?? "",
                    RussianTitle = title ?? "",
                    EnglishTitle = englishTitle ?? "",
                    LowercaseTitle = title!.ToLower() ?? "",
                    Year = int.Parse(year ?? "0"),
                    Description = description ?? "",
                    Countries = countries!,
                    Duration = getDuration(duration!) ?? new TimeSpan(0, 0, 0),
                    Genres = genres!,
                    Poster = $"{Website.KINOKRAD}{poster}" ?? "",
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
                if (stringDuration.Contains("-"))
                    return new TimeSpan(0, 0, 0);

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
                    ".//div[contains(concat(\" \",normalize-space(@class),\" \"),\" postertitle \")]//h2//a"
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
                var document = GetDocument(Website.KINOKRAD)?.DocumentNode;
                string lastLink = document!
                    .SelectSingleNode(
                        @".//div[contains(concat("" "",normalize-space(@class),"" ""),"" navcent "")]/child::*[last()]/self::*"
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

using Cimber.Scraper.Models;
using Cimber.Scraper.Services;
using HtmlAgilityPack;
using Spectre.Console;
using System.Collections.Concurrent;

namespace Cimber.Scraper.Scrapers
{
    public class UakinoScraper : BaseScraper
    {
        private readonly object filmsLock = new object();
        private readonly object taskLock = new object();

        public override void Start()
        {
            try
            {
                getFilms(Website.UAKINO);
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
                        var task = ctx.AddTask($"[green]Scraping {Website.UAKINO}[/]");
                        task.MaxValue = pagesCount;

                        Parallel.For(2, pagesCount + 1, i =>
                        {
                            var url = $"{Website.UAKINO}/page/{i}";

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

                        if (film != null)
                        {
                            lock (filmsLock)
                            {
                                if (film.Players.Count > 0)
                                {
                                    films.Add(film);
                                }
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


                if (url.Contains("series"))
                {
                    return null;
                }
                else
                {
                    var title = document?.SelectSingleNode("/html/body/div[1]/div[1]/div/div/div[2]/div[2]/div/div/div/h1/span").InnerText
                        .Trim()
                        .Replace("\n", "")
                        .Replace("\t", "")
                        .Trim();
                    var year = document
                        ?.SelectSingleNode(
                            @"//h2[contains(normalize-space(),""Рік виходу:"")]/parent::*/parent::*/div[2]/a"
                        )
                        .InnerText.Trim();
                    var countries = document
                        ?.SelectNodes(
                            @"//h2[contains(normalize-space(),""Країна:"")]/parent::*/parent::*/div[2]/a"
                        ).Select(a => a.InnerText.Trim())
                        .ToList();
                    var genres = document
                        ?.SelectNodes(
                            @"//h2[contains(normalize-space(),""Жанр:"")]/parent::*/parent::*/div[2]/a"
                        ).Select(a => a.InnerText.Trim())
                        .ToList();
                    string? duration = null;
                    try
                    {
                        duration = document
                            ?.SelectSingleNode(
                                @"//h2[contains(normalize-space(),""Тривалість:"")]/parent::*/parent::*/div[2]"
                            )
                            .InnerText.Trim();
                    }
                    catch { }
                    var description = document
                        ?.SelectSingleNode(".//div[@itemprop=\"description\"]")
                        .InnerText.Trim();
                    var poster = Website.UAKINO + document
                        ?.SelectSingleNode(".//img[@itemprop=\"image\"]").Attributes["src"]
                        .Value;

                    var players = document
                            !.SelectNodes(".//iframe")
                            .Where(i => i.Attributes["data-src"] == null)
                            .Select(i => i.Attributes["src"].Value.Trim())
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
                            enTitle = TranslationService.Translate(Language.Ukrainian, Language.English, title!).Result;
                        }
                    }
                    catch { }

                    return new Film()
                    {
                        Language = Language.Ukrainian,
                        Title = title ?? "",
                        EnglishTitle = enTitle ?? "",
                        UkrainianTitle = title ?? "",
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
                int minutes = int.Parse(stringDuration.Split("хв")[0].Trim());

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
                    @"/html/body/div[1]/div[1]/div/div/div[1]/div[2]/div/div/a"
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
                var document = GetDocument(Website.UAKINO)?.DocumentNode;
                string lastLink = document!
                    .SelectSingleNode(
                        @"/html/body/div[1]/div[1]/div/div/div[1]/div[2]/div/center[1]/div/div[3]/span[2]/a[10]"
                    )
                    .InnerText
                    .Trim();
                Logger.Info(lastLink);

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

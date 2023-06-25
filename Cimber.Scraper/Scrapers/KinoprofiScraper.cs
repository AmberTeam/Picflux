using Cimber.Scraper.Models;
using HtmlAgilityPack;
using Spectre.Console;
using System.Collections.Concurrent;

namespace Cimber.Scraper.Scrapers
{
    public class KinoprofiScraper : BaseScraper
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
                var name = document?.SelectSingleNode("\r\n.//h1[@itemprop=\"name\"]").InnerText
                    .Trim()
                    .Replace("\n", "")
                    .Replace("\t", "")
                    .Split("(")[0].Trim();
                var year = document
                    ?.SelectSingleNode(
                        @".//div[contains(concat("" "",normalize-space(@class),"" ""),"" more-info "")]/b[contains(normalize-space(),""Год"")]/parent::*/i"
                    )
                    .InnerText.Trim();
                var countries = document
                    ?.SelectSingleNode(
                        @".//div[contains(concat("" "",normalize-space(@class),"" ""),"" more-info "")]/b[contains(normalize-space(),""Страна"")]/parent::*/i"
                    )
                    .InnerText.Trim()
                    .Split(" ")
                    .ToList();
                var genres = document
                    ?.SelectSingleNode(
                        @".//div[contains(concat("" "",normalize-space(@class),"" ""),"" more-info "")]/b[contains(normalize-space(),""Жанр"")]/parent::*/i"
                    )
                    .SelectNodes(".//a")
                    .Select(a => a.InnerText)
                    .ToList();
                var duration = document
                    ?.SelectSingleNode(
                        @".//div[contains(concat("" "",normalize-space(@class),"" ""),"" more-info "")]/b[contains(normalize-space(),""Длительность"")]/parent::*/i"
                    )
                    .InnerText.Trim();
                var description = document
                    ?.SelectSingleNode(".//div[@itemprop=\"description\"]")
                    .InnerText.Trim();
                var poster = document
                    ?.SelectSingleNode(".//img[@itemprop=\"image\"]").Attributes["src"]
                    .Value;
                var players = document
                                ?.SelectSingleNode(".//div[@id=\"player-iframe\"]")
                                .SelectNodes("input")
                                .Where(i => i.Attributes.Contains("value"))
                                .Select(i => i.Attributes["value"].Value.Trim())
                                .Select(i => i.StartsWith("https") ? i : $"https{i}")
                                .ToList();
                players!.RemoveAll(i => i.Contains("youtube"));
                players!.RemoveAll(i => i.Contains("red.uboost"));

                try
                {
                    var inputPlayers = document
                        ?.SelectNodes(".//div[contains(concat(\" \",normalize-space(@class),\" \"),\" iframe-player \")]//input")
                        .Select(i => i.Attributes["value"].Value.Trim())
                        .Where(i => i.Length > 7)
                        .ToList();

                    if (inputPlayers!.Count > 0 && inputPlayers!.Count >= players.Count)
                        players = inputPlayers;
                }
                catch { }

                return new Film()
                {
                    Language = Language.Russian,
                    Title = name ?? "",
                    RussianTitle = name ?? "",
                    LowercaseTitle = name!.ToLower() ?? "",
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
                int hours = int.Parse(stringDuration.Contains("час") ? stringDuration.Split("час")[0].Trim() : "0");
                int minutes = 0;


                if (stringDuration.Contains("час"))
                    minutes = int.Parse(hours > 1 ? stringDuration.Split("мин")[0].Trim().Split("часа")[1].Trim() : stringDuration.Split("мин")[0].Trim().Split("час")[1].Trim());
                else
                    minutes = int.Parse(stringDuration.Split("мин")[0].Trim());

                TimeSpan timeSpan = new TimeSpan(hours, minutes, 0);

                return timeSpan;
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
                    @".//div[contains(concat("" "",normalize-space(@class),"" ""),"" title-main "")]/a"
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
                var document = GetDocument(Website.KINOPROFI)?.DocumentNode;
                string lastLink = document!
                    .SelectSingleNode(
                        @".//div[contains(concat("" "",normalize-space(@class),"" ""),"" navigation "")]/a[contains(concat("" "",normalize-space(@class),"" ""),"" next "")]/preceding-sibling::*[1]/self::*"
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

using Cimber.Scraper.Models;
using HtmlAgilityPack;
using Spectre.Console;

namespace Cimber.Scraper.Scrapers
{
    public class _123MoviesScraper : BaseScraper
    {
        public override void Start()
        {
            try
            {
                try
                {
                    getFilms(Website._123Movies);
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
                            var task = ctx.AddTask($"[green]Scraping {Website._123Movies}[/]");
                            task.MaxValue = pagesCount;

                            while (!ctx.IsFinished)
                            {
                                for (int i = 2; i <= pagesCount; i++)
                                {
                                    var url = $"{Website._123Movies}/page/{i}";

                                    getFilms(url);
                                    Console.Clear();
                                    task.Increment(1);
                                    task.Description($"[green]Scraping url({url}) page {i} of {pagesCount}[/]");
                                }

                                task.StopTask();
                            }
                        });
                }
                catch (Exception ex)
                {
                    Start();
                    Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                }
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

                foreach (var link in links!)
                {
                    try
                    {
                        var film = getFilm(link.Attributes["href"].Value);

                        if (film != null)
                            if (film!.Players!.Count > 0)
                                DatabaseService.AddFilm(film);
                    }
                    catch (Exception ex)
                    {
                        Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
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
                var name = document?.SelectSingleNode("//*[@id=\"mv-info\"]/div[1]/div[3]/h3").InnerText;
                var year = document
                    ?.SelectSingleNode(".//p//strong[contains(normalize-space(),\"Release:\")]/parent::*")
                    .InnerText.Split(":")[1].Trim();
                var countries = document
                    ?.SelectSingleNode(".//p//strong[contains(normalize-space(),\"Country:\")]/parent::*/span")
                    .SelectNodes(".//a")
                    .Select(a => a.InnerText)
                    .ToList();
                var genres = document
                    ?.SelectSingleNode(".//p//strong[contains(normalize-space(),\"Genre:\")]/parent::*/span")
                    .SelectNodes(".//a")
                    .Select(a => a.InnerText)
                    .ToList();
                var duration = document
                    ?.SelectSingleNode(".//p//strong[contains(normalize-space(),\"Runtime:\")]/parent::*")
                    .InnerText.Split(":")[1].Trim();
                var description = document
                    ?.SelectSingleNode(".//div[contains(concat(\" \",normalize-space(@class),\" \"),\" desc \")]//p")
                    .InnerText.Trim();
                var poster = document
                    ?.SelectSingleNode(".//div[contains(concat(\" \",normalize-space(@class),\" \"),\" thumb \")][contains(concat(\" \",normalize-space(@class),\" \"),\" mvic-thumb \")]").Attributes["style"].Value.Split("url(")[1].Trim().Split(")")[0].Trim();

                var watchingDocument = GetDocument(url + "/watching.html")?.DocumentNode;
                var players = watchingDocument
                    ?.SelectNodes(".//a[@id=\"episode-1\"][@data-server=\"8\"]")
                    .Select(p => "https://firesonic.sc/" + p.Attributes["data-drive"].Value)
                    .ToList();
                players!.RemoveAll(i => i.Contains("youtube"));
                players!.RemoveAll(i => i.Contains("red.uboost"));

                return new Film()
                {
                    Language = Language.English,
                    Title = name ?? "",
                    EnglishTitle = name ?? "",
                    LowercaseTitle = name!.ToLower() ?? "",
                    Year = int.Parse(year ?? "0"),
                    Description = description ?? "",
                    EnglishDescription = description ?? "",
                    Countries = countries!,
                    EnglishCountries = countries!,
                    Duration = getDuration(duration!) ?? new TimeSpan(0, 0, 0),
                    Genres = genres!,
                    EnglishGenres = genres!,
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
                int minutes = int.Parse(stringDuration.Split("min")[0].Trim());

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
                    ".//*[@id=\"main\"]/div/div[2]/div[1]/div[2]/div/a"
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
                var document = GetDocument(Website._123Movies)?.DocumentNode;
                string lastLink = document!
                    .SelectSingleNode(
                        @"//*[@id=""main""]/div/div[2]/div[2]/ul/li[last() - 1]"
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

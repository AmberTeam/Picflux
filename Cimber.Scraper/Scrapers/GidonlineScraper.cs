using Cimber.Scraper.Models;
using HtmlAgilityPack;
using Spectre.Console;

namespace Cimber.Scraper.Scrapers
{
    public class GidonlineScraper : BaseScraper
    {
        public override void Start()
        {
            try
            {
                try
                {
                    getFilms(Website.GIDONLINE);
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
                            var task = ctx.AddTask($"[green]Scraping {Website.GIDONLINE}[/]");
                            task.MaxValue = pagesCount;

                            while (!ctx.IsFinished)
                            {
                                for (int i = 2; i <= pagesCount; i++)
                                {
                                    var url = $"{Website.GIDONLINE}/page/{i}";

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
                var name = document?.SelectSingleNode(".//h1[@itemprop=\"name\"]").InnerText;
                var year = document
                    ?.SelectSingleNode(".//div[@itemprop=\"dateCreated\"]")
                    .SelectSingleNode(".//a")
                    .InnerText;
                var countries = document
                    ?.SelectSingleNode(".//div[@itemprop=\"countryOfOrigin\"]")
                    .SelectNodes(".//a")
                    .Select(a => a.InnerText)
                    .ToList();
                var genres = document
                    ?.SelectSingleNode(".//div[@itemprop=\"genre\"]")
                    .SelectNodes(".//a")
                    .Select(a => a.InnerText)
                    .ToList();
                var duration = document
                    ?.SelectSingleNode(".//div[@itemprop=\"duration\"]")
                    .InnerText;
                var description = document
                    ?.SelectSingleNode(".//div[@itemprop=\"description\"]")
                    .SelectSingleNode(".//p")
                    .InnerText.Trim();
                var poster =
                    Website.GIDONLINE
                    + document
                        ?.SelectSingleNode(".//img[@itemprop=\"image\"]").Attributes["src"]
                        .Value;
                var players = document
                    ?.SelectNodes(".//iframe")
                    .Select(i => i.Attributes["src"].Value.Split("?partner")[0].Trim())
                    .Select(i => i.StartsWith("https") ? i : $"https{i}")
                    .ToList();
                players!.RemoveAll(i => i.Contains("youtube"));
                players!.RemoveAll(i => i.Contains("red.uboost"));

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
                    ".//div/div/div/a[contains(concat(\" \",normalize-space(@class),\" \"),\" mainlink \")]"
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
                var document = GetDocument(Website.GIDONLINE)?.DocumentNode;
                string lastLink = document!
                    .SelectSingleNode(
                        @".//div[contains(concat("" "",normalize-space(@class),"" ""),"" wp-pagenavi "")]/child::*[last()]/self::a"
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

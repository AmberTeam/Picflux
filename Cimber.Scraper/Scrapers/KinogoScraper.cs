using Cimber.Scraper.Models;
using HtmlAgilityPack;
using Spectre.Console;

namespace Cimber.Scraper.Scrapers
{
    public class KinogoScraper : BaseScraper
    {
        public override void Start()
        {
            try
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

                            while (!ctx.IsFinished)
                            {
                                for (int i = 2; i <= pagesCount; i++)
                                {
                                    var url = $"{Website.KINOGO}/page/{i}";

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
                var name = document?.SelectSingleNode(".//h1[contains(concat(\" \",normalize-space(@class),\" \"),\" kino-h \")]").InnerText.Trim();
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
                var duration = document?.SelectSingleNode(@"/html/body/div[1]/div/div[2]/div/div[2]/div[1]/article/div[2]/div/div[2]/ul[1]/li/div/span[contains(normalize-space(),""Продолжительность:"")]/parent::*/parent::*").InnerText.Trim();
                var description = document
                    ?.SelectSingleNode(".//span[@itemprop=\"description\"]")
                    .InnerText.Trim();
                var poster = Website.KINOGO + document
                    ?.SelectSingleNode(".//img[@itemprop=\"image\"]").Attributes["src"]
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

                return new Film()
                {
                    Language = Language.Russian,
                    Title = name ?? "",
                    RussianTitle = name ?? "",
                    LowercaseTitle = name!.ToLower() ?? "",
                    Year = int.Parse(year ?? "0"),
                    Description = description ?? "",
                    RussianDescription = description ?? "",
                    Countries = countries!,
                    RussianCountries = countries!,
                    Duration = getDuration(duration!) ?? new TimeSpan(0, 0, 0),
                    Genres = genres!,
                    RussianGenres = genres!,
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

using Cimber.Scraper.Models;
using HtmlAgilityPack;
using Spectre.Console;

namespace Cimber.Scraper.Scrapers
{
    public class KinogouaScraper : BaseScraper
    {
        public override void Start()
        {
            try
            {
                try
                {
                    getFilms(Website.KINOGOUA);
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
                            var task = ctx.AddTask($"[green]Scraping {Website.KINOGOUA}[/]");
                            task.MaxValue = pagesCount;

                            while (!ctx.IsFinished)
                            {
                                for (int i = 2; i <= pagesCount; i++)
                                {
                                    var url = $"{Website.KINOGOUA}/page/{i}";

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
                var name = document?.SelectSingleNode("/html/body/div[1]/div/div/main/div[2]/article/div[1]/header/h1").InnerText;
                var year = document
                    ?.SelectNodes("/html/body/div[1]/div/div/main/div[2]/article/div[1]/div[2]/div[1]/a")
                    .Where(a => a.Attributes["href"].Value.Contains("year"))
                    .FirstOrDefault()!.InnerText;
                var countries = document
                    ?.SelectNodes("/html/body/div[1]/div/div/main/div[2]/article/div[1]/div[2]/div[1]/a")
                    .Where(a => a.Attributes["href"].Value.Contains("country")).Select(a => a.InnerText).ToList();
                List<string> genres = new List<string>();
                try
                {
                    genres = document
                        !.SelectNodes("/html/body/div[1]/div/div/main/div[2]/article/div[1]/div[2]/ul/li/div[contains(normalize-space(),\"Жанр\")]/parent::*/a")
                        .Select(a => a.InnerText).ToList();
                }
                catch { }
                var duration = document
                    ?.SelectSingleNode("/html/body/div[1]/div/div/main/div[2]/article/div[1]/div[2]/div[1]")
                    .InnerText
                    .Split(",")
                    .Where(x => x.Contains("хв")).FirstOrDefault();
                var description = document
                    ?.SelectSingleNode(".//div[contains(concat(\" \",normalize-space(@class),\" \"),\" full-text \")]")
                    .InnerText.Trim();
                var poster =
                    Website.KINOGOUA
                    + document
                        ?.SelectSingleNode(".//div[contains(concat(\" \",normalize-space(@class),\" \"),\"pmovie__poster\")]/img").Attributes["src"]
                        .Value;
                List<string> players = new List<string>();
                try
                {
                    players = document
                        !.SelectNodes(".//div[@id=\"smart_player_ajax\"]")
                        .Select(i => i.Attributes["data-iframe"].Value.Trim())
                        .Select(i => i.StartsWith("https") ? i : $"https{i}")
                        .ToList();
                }
                catch { }
                try
                {
                    players = document
                        !.SelectNodes(".//iframe")
                        .Select(i => i.Attributes["data-src"].Value.Trim())
                        .Select(i => i.StartsWith("https") ? i : $"https{i}")
                        .ToList();
                }
                catch { }

                players!.RemoveAll(i => i.Contains("youtube"));
                players!.RemoveAll(i => i.Contains("red.uboost"));


                return new Film()
                {
                    Language = Language.Ukrainian,
                    Title = name ?? "",
                    UkrainianTitle = name ?? "",
                    LowercaseTitle = name!.ToLower() ?? "",
                    Year = int.Parse(year ?? "0"),
                    Description = description ?? "",
                    UkrainianDescription = description ?? "",
                    Countries = countries!,
                    UkrainianCountries = countries!,
                    Duration = getDuration(duration!) ?? new TimeSpan(0, 0, 0),
                    Genres = genres!,
                    UkrainianGenres = genres!,
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
                int hours = int.Parse(stringDuration.Contains("год") ? stringDuration.Split("год")[0].Trim() : "0");
                int minutes = 0;


                if (stringDuration.Contains("год"))
                    minutes = int.Parse(stringDuration.Split("хв")[0].Trim().Split("год")[1].Trim());
                else
                    minutes = int.Parse(stringDuration.Split("хв")[0].Trim());

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
                    " .//h2[contains(concat(\" \",normalize-space(@class),\" \"),\" card__title \")]//a"
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
                var document = GetDocument(Website.KINOGOUA)?.DocumentNode;
                string lastLink = document!
                    .SelectSingleNode(
                        @"/html/body/div[1]/div/div[2]/main/section/div[2]/div/div/div[2]/a[10]"
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

using Cimber.Scraper.Models;
using Cimber.Scraper.Services;
using HtmlAgilityPack;
using Spectre.Console;
using System.Collections.Concurrent;

namespace Cimber.Scraper.Scrapers
{
    public class KinogouaScraper : BaseScraper
    {
        private readonly object filmsLock = new object();
        private readonly object taskLock = new object();

        public override void Start()
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

                        Parallel.For(2, pagesCount + 1, i =>
                        {
                            var url = $"{Website.KINOGOUA}/page/{i}";

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
                var title = document?.SelectSingleNode("/html/body/div[1]/div/div/main/div[2]/article/div[1]/header/h1").InnerText;
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
                        .Select(i => $"https://voidboost.net/embed/{i.Attributes["data-kp_id"].Value.Trim()}")
                        .ToList();
                }
                catch { }
                try
                {
                    players.AddRange(document
                        !.SelectNodes(".//iframe")
                        .Select(i => i.Attributes["data-src"].Value.Trim())
                        .ToList());
                }
                catch { }

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
                    EnglishTitle = enTitle ?? "",
                    Title = title ?? "",
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

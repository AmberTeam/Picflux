﻿using Cimber.Scraper.Models;
using HtmlAgilityPack;
using Spectre.Console;

namespace Cimber.Scraper.Scrapers
{
    public class UakinoScraper : BaseScraper
    {
        public override void Start()
        {
            try
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

                            while (!ctx.IsFinished)
                            {
                                for (int i = 2; i <= pagesCount; i++)
                                {
                                    var url = $"{Website.UAKINO}/page/{i}";

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


                if (url.Contains("series"))
                {
                    return null;
                }
                else
                {
                    var name = document?.SelectSingleNode("/html/body/div[1]/div[1]/div/div/div[2]/div[2]/div/div/div/h1/span").InnerText
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
                    var duration = document
                        ?.SelectSingleNode(
                            @"//h2[contains(normalize-space(),""Тривалість:"")]/parent::*/parent::*/div[2]"
                        )
                        .InnerText.Trim();
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

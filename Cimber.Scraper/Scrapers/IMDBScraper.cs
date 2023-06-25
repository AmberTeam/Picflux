using Cimber.Scraper.Models;
using HtmlAgilityPack;
using System.Text;

namespace Cimber.Scraper.Scrapers
{
    public static class IMDBScraper
    {
        private static string SEARCH_URL = "https://www.imdb.com/find?q=";

        private static HtmlDocument? GetDocument(string url, string? language = null)
        {
            try
            {
                HtmlWeb web = new HtmlWeb();
                web.OverrideEncoding = Encoding.UTF8;

                if (language != null)
                {
                    web.PreRequest += (request) =>
                    {
                        request.Headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.99 Safari/537.36";
                        request.Headers["Accept-Language"] = language;

                        return true;
                    };
                }
                HtmlDocument doc = web.Load(url);

                return doc;
            }
            catch (Exception ex)
            {
                Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                return null;
            }
        }

        public static string? GetEnglishTitle(string name)
        {
            try
            {
                var document = GetDocument($"{SEARCH_URL}{name}", "ua-US,en;q=1")?.DocumentNode;
                var englishName = document
                    ?.SelectSingleNode(
                        "/html/body/div[2]/main/div[2]/div[3]/section/div/div[1]/section[2]/div[2]/ul/li[1]/div[2]/div[1]/a"
                    )
                    ?.InnerText;
                return englishName;
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());
                return null;
            }
        }

        public static string? GetUkrainianTitle(string name)
        {
            try
            {
                var document = GetDocument($"{SEARCH_URL}{name}", "ua-UA,ua;q=1")?.DocumentNode;
                var englishName = document
                    ?.SelectSingleNode(
                        "/html/body/div[2]/main/div[2]/div[3]/section/div/div[1]/section[2]/div[2]/ul/li[1]/div[2]/div[1]/a"
                    )
                    ?.InnerText;
                return englishName!;
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());
                return null;
            }
        }

        public static string? GetRussianTitle(string name)
        {
            try
            {
                var document = GetDocument($"{SEARCH_URL}{name}", "ru-RU,ru;q=1")?.DocumentNode;
                var englishName = document
                    ?.SelectSingleNode(
                        "/html/body/div[2]/main/div[2]/div[3]/section/div/div[1]/section[2]/div[2]/ul/li[1]/div[2]/div[1]/a"
                    )
                    ?.InnerText;
                return englishName;
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());
                return null;
            }
        }

        private static string? getLink(string name)
        {
            try
            {
                var document = GetDocument($"{SEARCH_URL}{name}")?.DocumentNode;
                var link = document!
                    .SelectSingleNode(
                        "/html/body/div[2]/main/div[2]/div[3]/section/div/div[1]/section[2]/div[2]/ul/li[1]/div[2]/div[1]/a"
                    )
                    .Attributes["href"].Value;
                return $"https://imdb.com/{link}";
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());
                return null;
            }
        }
    }
}

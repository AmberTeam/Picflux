using Cimber.Scraper.Models;
using HtmlAgilityPack;
using Newtonsoft.Json;
using System.Text;

namespace Cimber.Scraper.Services
{
    public class GoogleService
    {
        private static int retryCount = 0;
        private static readonly string URL = "https://www.google.com/search?q=";

        public static async Task<string?> Translate(Language target, string text)
        {
            try
            {
                string url = URL;
                
                switch (target)
                {
                    case Language.English:
                        url += $"{text}&hl=en";
                        break;
                    case Language.Ukrainian:
                        url += $"{text}&hl=uk";
                        break;
                    case Language.Russian:
                        url += $"{text}&hl=ru";
                        break;
                    default:
                        url += $"{text}&hl=en";
                        break;
                }

                List<string> userAgents = new List<string>()
                {
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36 Edg/89.0.774.54",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0",
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
                    "Random User Agent" // Add your random user agent here
                };

                Random random = new Random();
                string randomUserAgent = userAgents[random.Next(userAgents.Count)];

                HtmlDocument doc = new HtmlDocument();
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("User-Agent", randomUserAgent);

                    try
                    {
                        HttpResponseMessage response = await client.GetAsync(url);
                        response.EnsureSuccessStatusCode();

                        string responseBody = await response.Content.ReadAsStringAsync();
                        doc.LoadHtml(responseBody);
                    }
                    catch (HttpRequestException ex)
                    {
                        Console.WriteLine($"Error: {ex.Message}");
                    }
                }
                var translatedTitle = doc.DocumentNode.SelectSingleNode("//*[@id=\"rcnt\"]/div[2]/div/div/div[3]/div[1]/div/div/div[2]/div[1]/div/div");

                if (translatedTitle == null)
                {
                    translatedTitle = doc.DocumentNode.SelectSingleNode("//*[@id=\"_5L6ZZI7iD_q04-EPzsSqcA_35\"]/div[1]/div/div[2]/div[1]/div/a/div");
                }

                if (translatedTitle != null)
                {
                    return translatedTitle.InnerText;
                }

                return null;
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());

                if (retryCount <= 2)
                {
                    return await Translate(target, text);
                }
                else
                {
                    retryCount = 0;
                    return null;
                }
            }
        }
    }
}

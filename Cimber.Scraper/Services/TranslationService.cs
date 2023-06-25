using Cimber.Scraper.Models;
using Newtonsoft.Json;

namespace Cimber.Scraper.Services
{
    public class TranslationService
    {
        private static int retryCount = 0;
        private static readonly string URL = "https://lingva.ml/api/v1/";

        public static string? Translate(Language source, Language target, string text)
        {
            try
            {
                string url = string.Empty;

                switch (source)
                {
                    case Language.English:
                        url = $"{URL}en/";
                        break;
                    case Language.Ukrainian:
                        url = $"{URL}ru/";
                        break;
                    case Language.Russian:
                        url = $"{URL}ru/";
                        break;
                    default:
                        url = $"{URL}ru/";
                        break;
                }

                switch (target)
                {
                    case Language.English:
                        url += "en/";
                        break;
                    case Language.Ukrainian:
                        url += "uk/";
                        break;
                    case Language.Russian:
                        url += "ru/";
                        break;
                    default:
                        url += "en/";
                        break;
                }
                url += text;

                using (var client = new HttpClient())
                {
                    string response = client.GetStringAsync(url).Result;
                    var json = JsonConvert.DeserializeObject<Dictionary<string, object>>(response);

                    return (string)json!["translation"] ?? "";
                }
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());

                if (retryCount <= 2)
                {
                    return Translate(source, target, text);
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

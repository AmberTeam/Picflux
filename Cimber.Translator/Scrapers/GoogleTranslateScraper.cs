using Cimber.Translator.Models;
using System.Diagnostics.Metrics;
using System.Net;
using System.Web;

namespace Cimber.Translator.Scrapers
{
    internal class GoogleTranslateScraper : BaseScraper
    {
        private const string UA_URL =
            "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=uk&dt=t&q=";
        private const string EN_URL =
            "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=en&dt=t&q=";

        public IEnumerable<string> GetEnglishCountries(List<string> countries)
        {
            foreach (var country in countries)
            {
                string? enCountry;
                try
                {
                    enCountry = translate(country, Language.English);
                }
                catch (Exception ex)
                {
                    Logger.Error(ex.ToString());
                    enCountry = null;
                }

                if (enCountry != null)
                {
                    yield return enCountry;
                }
            }
        }

        public IEnumerable<string> GetEnglishGenres(List<string> genres)
        {
            foreach (var genre in genres)
            {
                string? enGenre;
                try
                {
                    enGenre = translate(genre, Language.English);
                }
                catch (Exception ex)
                {
                    Logger.Error(ex.ToString());
                    enGenre = null;
                }

                if (enGenre != null)
                {
                    yield return enGenre;
                }
            }
        }

        public string? GetUkrainianName(string name)
        {
            try
            {
                return translate(name, Language.Ukrainian);
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());
                return null;
            }
        }

        public string? GetUkrainianDescription(string description)
        {
            try
            {
                return translate(description, Language.Ukrainian);
            }
            catch (Exception ex)
            {
                Logger.Error(ex.ToString());
                return null;
            }
        }

        public IEnumerable<string> GetUkrainianCountries(List<string> countries)
        {
            foreach (var country in countries)
            {
                string? uaCountry;
                try
                {
                    uaCountry = translate(country, Language.Ukrainian);
                }
                catch (Exception ex)
                {
                    Logger.Error(ex.ToString());
                    uaCountry = null;
                }

                if (uaCountry != null)
                {
                    yield return uaCountry;
                }
            }
        }

        public IEnumerable<string> GetUkrainianGenres(List<string> genres)
        {
            foreach (var genre in genres)
            {
                string? uaGenre;
                try
                {
                    uaGenre = translate(genre, Language.Ukrainian);
                }
                catch (Exception ex)
                {
                    Logger.Error(ex.ToString());
                    uaGenre = null;
                }

                if (uaGenre != null)
                {
                    yield return uaGenre;
                }
            }
        }

        private string? translate(string text, Language language)
        {
            var url = language == Language.Ukrainian ? UA_URL + text : EN_URL + text;

            using (var client = new HttpClient())
            {
                var result = client.GetStringAsync(url).Result;
                try
                {
                    result = result.Substring(
                        4,
                        result.IndexOf("\"", 4, StringComparison.Ordinal) - 4
                    );
                    return result;
                }
                catch
                {
                    return null;
                }
            }
        }
    }
}

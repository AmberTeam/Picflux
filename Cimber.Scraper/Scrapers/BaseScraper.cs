using Cimber.Scraper.Models;
using HtmlAgilityPack;
using System.Text;

namespace Cimber.Scraper.Scrapers
{
    public class BaseScraper
    {
        protected DatabaseService DatabaseService = new DatabaseService();

        protected HtmlDocument? GetDocument(string url)
        {
            try
            {
                HtmlWeb web = new HtmlWeb();
                web.OverrideEncoding = Encoding.UTF8;
                HtmlDocument doc = web.Load(url);

                return doc;
            }
            catch (Exception ex)
            {
                Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                return null;
            }
        }

        protected HtmlDocument? GetDynamicDocument(string url) { throw new NotImplementedException(); }

        public virtual void Start() { }

        protected virtual HtmlNodeCollection? getLinks(string url) { throw new NotImplementedException(); }

        protected virtual int getPagesCount() { throw new NotImplementedException(); }

        protected virtual void getFilms(string url) { throw new NotImplementedException(); }

        protected virtual Film? getFilm(string url) { throw new NotImplementedException(); }

        protected virtual TimeSpan? getDuration(string stringDuration) { throw new NotImplementedException(); }
    }
}

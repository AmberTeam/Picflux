using Cimber.Translator.Models;
using Cimber.Translator.Scrapers;
using ShellProgressBar;

namespace Cimber.Translator
{
    internal class Translator
    {
        private readonly Database _database;
        private readonly Language _language;

        public Translator(string path, string name, Language langauge)
        {
            _language = langauge;
            _database = new Database(path, name);
        }

        public void Start()
        {
            var films = _database.GetFilms();
            var options = new ProgressBarOptions { ProgressCharacter = '-' };

            if (_language == Language.English)
            {
                using (var pbar = new ProgressBar(films.Count(), "Translating", options))
                {
                    foreach (var film in films)
                    {
                        var imdbScraper = new ImdbScraper();
                        var googleTranslateScraper = new GoogleTranslateScraper();

                        var enFilm = imdbScraper.GetEnglishFilm(film);
                        var enCountries = googleTranslateScraper
                            .GetEnglishCountries(film.Countries)
                            .ToList();
                        var enGenres = googleTranslateScraper
                            .GetEnglishGenres(film.Genres)
                            .ToList();

                        if (enFilm != null && enCountries != null && enGenres != null)
                        {
                            enFilm.Countries = enCountries;
                            enFilm.Genres = enGenres;

                            _database.AddEnglishFilm(enFilm);
                            pbar.Tick($"Last film: {enFilm}({film.Id})");
                        }
                        else
                        {
                            pbar.Tick("Didn't work");
                        }
                    }
                }
            }
            else
            {
                using (var pbar = new ProgressBar(films.Count(), "Translating", options))
                {
                    foreach (var film in films)
                    {
                        var googleTranslateScraper = new GoogleTranslateScraper();

                        var uaName = googleTranslateScraper.GetUkrainianName(film.Name);
                        var uaDescription = googleTranslateScraper.GetUkrainianDescription(
                            film.Description
                        );
                        var uaCountries = googleTranslateScraper
                            .GetUkrainianCountries(film.Countries)
                            .ToList();
                        var uaGenres = googleTranslateScraper
                            .GetUkrainianGenres(film.Genres)
                            .ToList();

                        var uaFilm = film;

                        if (
                            uaFilm != null
                            && uaName != null
                            && uaDescription != null
                            && uaCountries != null
                            && uaGenres != null
                        )
                        {
                            uaFilm.Countries = uaCountries;
                            uaFilm.Genres = uaGenres;
                            uaFilm.Name = uaName;
                            uaFilm.Description = uaDescription;

                            _database.AddUkrainianFilm(uaFilm);
                            pbar.Tick($"Last film: {uaFilm}({film.Id})");
                        }
                        else
                        {
                            pbar.Tick("Didn't work");
                        }
                    }
                }
            }
        }
    }
}

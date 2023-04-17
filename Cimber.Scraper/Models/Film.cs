namespace Cimber.Scraper.Models
{
    public class Film
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime DateUpdated { get; set; }

        public Language Language { get; set; }

        public string? Title { get; set; }
        public string? LowercaseTitle { get; set; }
        public string? OriginalTitle { get; set; }
        public string? EnglishTitle { get; set; }
        public string? UkrainianTitle { get; set; }
        public string? RussianTitle { get; set; }

        public string? Description { get; set; }
        public string? OriginalDescription { get; set; }
        public string? EnglishDescription { get; set; }
        public string? UkrainianDescription { get; set; }
        public string? RussianDescription { get; set; }

        public int Year { get; set; }

        public List<string?> Countries { get; set; } = new List<string?>();
        public List<string?> EnglishCountries { get; set; } = new List<string?>();
        public List<string?> UkrainianCountries { get; set; } = new List<string?>();
        public List<string?> RussianCountries { get; set; } = new List<string?>();

        public TimeSpan Duration { get; set; } = new TimeSpan(0, 0, 0);

        public List<string?> Genres { get; set; } = new List<string?>();
        public List<string?> EnglishGenres { get; set; } = new List<string?>();
        public List<string?> UkrainianGenres { get; set; } = new List<string?>();
        public List<string?> RussianGenres { get; set; } = new List<string?>();

        public string? Poster { get; set; }

        public List<string> Players { get; set; } = new List<string>();
    }
}

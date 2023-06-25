namespace Cimber.Scraper.Models
{
    public class Film
    {
        public int Id { get; set; }
        public Guid _Id { get; set; } = Guid.NewGuid();
        public DateTime DateAdded { get; set; }
        public DateTime DateUpdated { get; set; }

        public Language Language { get; set; }

        public string? Title { get; set; }
        public string? EnglishTitle { get; set; }
        public string? UkrainianTitle { get; set; }
        public string? RussianTitle { get; set; }
        public string? LowercaseTitle { get; set; }
        public string? LowercaseEnglishTitle { get; set; }
        public string? LowercaseUkrainianTitle { get; set; }
        public string? LowercaseRussianTitle { get; set; }

        public string? Description { get; set; }

        public int Year { get; set; }

        public List<string?> Countries { get; set; } = new List<string?>();

        public TimeSpan Duration { get; set; } = new TimeSpan(0, 0, 0);

        public List<string?> Genres { get; set; } = new List<string?>();

        public string? Poster { get; set; }

        public List<string> Players { get; set; } = new List<string>();
    }
}

namespace Cimber.Bot.Models
{
    public class Bug
    {
        public int? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Type Type { get; set; }
        public string? Path { get; set; }
        public long? FromUserId { get; set; }
        public string? FromUsername { get; set; }
        public Os? Os { get; set; }
    }
}

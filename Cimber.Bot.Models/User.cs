namespace Cimber.Bot.Models
{
    public class User
    {
        public long Id { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Username { get; set; }
        public string? BugTitle { get; set; }
        public string? BugDescription { get; set; }
        public Os Os { get; set; } = Os.Other;
        public State State { get; set; } = State.Default;
        public Language InterfaceLanguage { get; set; } = Language.English;
        public UserPermission Permission { get; set; } = UserPermission.User;
        public int LastMessageId { get; set; }
        public int LastBugId { get; set; }
    }
}

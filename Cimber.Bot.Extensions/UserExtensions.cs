using Cimber.Bot.Models;

namespace Cimber.Bot.Extensions
{
    public static class UserExtensions
    {
        private static readonly Database.UsersDatabase usersDatabase = new Database.UsersDatabase();

        public static User? User(this Telegram.Bot.Types.User messageUser)
        {
            try
            {
                var user = usersDatabase.GetUser(messageUser.Id);
                return user;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                return null;
            }
        }

        public static void AddUser(this Telegram.Bot.Types.User messageUser, List<long> adminList)
        {
            try
            {
                var user = new Models.User()
                {
                    ChatId = messageUser.Id,
                    Firstname = messageUser.FirstName,
                    Lastname = messageUser.LastName,
                    Username = messageUser.Username,
                    IsAdmin = adminList.Contains(messageUser.Id)
                };
                usersDatabase.AddUser(user);
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetState(this Telegram.Bot.Types.User messageUser, State state)
        {
            try
            {
                var user = usersDatabase.GetUser(messageUser.Id);
                user!.State = state;
                usersDatabase.UpdateUser(user!);
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetCurrentMessageId(this Telegram.Bot.Types.User messageUser, int messageId)
        {
            try
            {
                var user = usersDatabase.GetUser(messageUser.Id);
                user!.CurrentMessageId = messageId;
                usersDatabase.UpdateUser(user!);
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetCurrentBugId(this Telegram.Bot.Types.User messageUser, int bugId)
        {
            try
            {
                var user = usersDatabase.GetUser(messageUser.Id);
                user!.CurrentBugId = bugId;
                usersDatabase.UpdateUser(user!);
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetLanguage(this Telegram.Bot.Types.User messageUser, Language language)
        {
            try
            {
                var user = usersDatabase.GetUser(messageUser.Id);
                user!.InterfaceLanguage = language;
                usersDatabase.UpdateUser(user!);
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetOs(this Telegram.Bot.Types.User messageUser, Os os)
        {
            try
            {
                var user = usersDatabase.GetUser(messageUser.Id);
                user!.Os = os;
                usersDatabase.UpdateUser(user!);
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetTitle(this Telegram.Bot.Types.User messageUser, string title)
        {
            try
            {
                var user = usersDatabase.GetUser(messageUser.Id);
                user!.BugTitle = title;
                usersDatabase.UpdateUser(user!);
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetDescription(this Telegram.Bot.Types.User messageUser, string description)
        {
            try
            {
                var user = usersDatabase.GetUser(messageUser.Id);
                user!.BugDescription = description;
                usersDatabase.UpdateUser(user!);
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetPermission(this Telegram.Bot.Types.User messageUser, List<long> adminList)
        {
            try
            {
                var user = usersDatabase.GetUser(messageUser.Id);
                user!.IsAdmin = adminList.Contains(user.ChatId);
                usersDatabase.UpdateUser(user!);
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static User? GetUser(long id)
        {
            try
            {
                var user = usersDatabase.GetUser(id);
                return user;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                return null;
            }
        }
    }
}

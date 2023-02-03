using Cimber.Bot.Models;
using Telegram.Bot.Types;

namespace Cimber.Bot.Extensions
{
    public static class UserExtensions
    {
        public static Models.User? User(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list)
        {
            try
            {
                Models.User? user;
                try
                {
                    user = list.ToList().First(u => u.Id == messageUser!.Id);

                    if (user == null)
                    {
                        user = messageUser.Activate(ref list);
                    }
                }
                catch
                {
                    user = messageUser.Activate(ref list);
                }
                return user;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                return null;
            }
        }

        public static void SetState(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list, State state)
        {
            try
            {
                var user = messageUser.User(ref list);

                if (user == null)
                    user = messageUser.Activate(ref list);

                list.First(u => u.Id == user!.Id).State = state;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetLastMessageId(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list, int messageId)
        {
            try
            {
                var user = messageUser.User(ref list);

                if (user == null)
                    user = messageUser.Activate(ref list);

                list.First(u => u.Id == user!.Id).LastMessageId = messageId;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetLastBugId(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list, int bugId)
        {
            try
            {
                var user = messageUser.User(ref list);

                if (user == null)
                    user = messageUser.Activate(ref list);

                list.First(u => u.Id == user!.Id).LastBugId = bugId;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetLastBug(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list, Bug? bug)
        {
            try
            {
                var user = messageUser.User(ref list);

                if (user == null)
                    user = messageUser.Activate(ref list);

                list.First(u => u.Id == user!.Id).LastBug = bug;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetLanguage(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list, Language language)
        {
            try
            {
                var user = messageUser.User(ref list);

                if (user == null)
                    user = messageUser.Activate(ref list);

                list.First(u => u.Id == user!.Id).InterfaceLanguage = language;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetOs(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list, Os os)
        {
            try
            {
                var user = messageUser.User(ref list);

                if (user == null)
                    user = messageUser.Activate(ref list);

                list.First(u => u.Id == user!.Id).Os = os;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetTitle(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list, string title)
        {
            try
            {
                var user = messageUser.User(ref list);

                if (user == null)
                    user = messageUser.Activate(ref list);

                list.First(u => u.Id == user!.Id).BugTitle = title;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetDescription(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list, string description)
        {
            try
            {
                var user = messageUser.User(ref list);

                if (user == null)
                    user = messageUser.Activate(ref list);

                list.First(u => u.Id == user!.Id).BugDescription = description;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void Inactivate(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list)
        {
            try
            {
                list.RemoveAll(u => u.Id == messageUser.Id);
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static void SetPermission(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list, List<long> adminList)
        {
            try
            {
                var user = messageUser.User(ref list);

                if (user == null)
                    user = messageUser.Activate(ref list);

                list.First(u => u.Id == user!.Id).Permission = adminList.Contains(messageUser.Id) ? UserPermission.Admin : UserPermission.User;
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        public static Models.User? Activate(this Telegram.Bot.Types.User messageUser, ref List<Models.User> list)
        {
            try
            {
                var user = new Models.User()
                {
                    Id = messageUser!.Id,
                    Os = Os.Other,
                    State = State.Default,
                    Firstname = messageUser!.FirstName,
                    Lastname = messageUser!.LastName,
                    Username = messageUser!.Username
                };

                if (list.Where(u => u.Id == user!.Id).Count() < 1)
                {
                    list.Add(user!);
                }
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

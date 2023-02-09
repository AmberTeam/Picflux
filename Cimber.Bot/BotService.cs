using Cimber.Bot.Extensions;
using Cimber.Bot.MessageTemplates;
using Cimber.Bot.Models;
using DotNetEnv;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;

namespace Cimber.Bot
{
    public class BotService
    {
        private readonly List<long> AdminList = new List<long>()
        {
            930727649,
            1495480119
        };
        private readonly Database.BugsDatabase bugsDatabase = new Database.BugsDatabase();
        
        private readonly TelegramBotClient _client;

        public BotService()
        {
            Env.Load();

            string token = Env.GetString("TOKEN");
            _client = new TelegramBotClient(token);
            Logger.Logger.Debug($"Client has been created");
        }

        public void Start()
        {
            _client.StartReceiving(_update, _error);
        }

        private Task _error(ITelegramBotClient client, Exception exception, CancellationToken token)
        {
            Logger.Logger.Error($"[{exception.GetLine()}] [{exception.Source}]\n\t{exception.Message}");

            return Task.CompletedTask;
        }

        private async Task _update(ITelegramBotClient client, Update update, CancellationToken token)
        {
            try
            {
                switch (update.Type)
                {
                    case UpdateType.Unknown:
                        break;
                    case UpdateType.Message:
                        if (update.Message == null || update.Message.From == null)
                            return;
                        update.Message.From.AddUser(AdminList);
                        update.Message.From.SetPermission(AdminList);
                            
                        if (update!.Message!.Type != MessageType.Text)
                            await messageHandler(update, update!.Message!.From!.User()!);
                        else if (update!.Message!.Text!.StartsWith("/"))
                            await commandHandler(update, update!.Message!.From!.User()!);
                        else
                            await messageHandler(update, update!.Message!.From!.User()!);
                        break;
                    case UpdateType.InlineQuery:
                        break;
                    case UpdateType.ChosenInlineResult:
                        break;
                    case UpdateType.CallbackQuery:
                        if (update.CallbackQuery == null)
                            return;
                        update.CallbackQuery.From.AddUser(AdminList);
                        update.CallbackQuery.From.SetPermission(AdminList);
                        await callBackQueryHandler(update, update!.CallbackQuery!.From!.User()!);
                        break;
                    case UpdateType.EditedMessage:
                        break;
                    case UpdateType.ChannelPost:
                        break;
                    case UpdateType.EditedChannelPost:
                        break;
                    case UpdateType.ShippingQuery:
                        break;
                    case UpdateType.PreCheckoutQuery:
                        break;
                    case UpdateType.Poll:
                        break;
                    case UpdateType.PollAnswer:
                        break;
                    case UpdateType.MyChatMember:
                        break;
                    case UpdateType.ChatMember:
                        break;
                    case UpdateType.ChatJoinRequest:
                        break;
                    default:
                        break;
                }
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        private async Task commandHandler(Update update, Models.User user)
        {
            try
            {
                if (update == null || update.Message == null || update.Message.Text == null) return;

                string command = update.Message.Text;
                switch (command)
                {
                    case "/start":
                        await StartMessage(update, user);

                        break;
                    case "/sendbug":
                        await SendOSMessage(update, user);

                        break;
                    case "/buglist":
                        await SendBugList(update, user);
                        
                        break;
                    case "/language":
                        await SendLanguage(update, user);
                        
                        break;
                    default:
                        break;
                }
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        private async Task messageHandler(Update update, Models.User user)
        {
            try
            {
                if (update == null || update.Message == null) return;

                var message = update.Message;

                switch (update!.Message!.Type)
                {
                    case MessageType.Text:
                        switch (user.State)
                        {
                            case State.Default:

                                switch (message!.Text)
                                {
                                    #region English

                                    case "Send a bug":
                                        await SendOSMessage(update, user);

                                        break;
                                    case "Bugs list":
                                        await SendBugList(update, user);

                                        break;
                                    case "Change the language":
                                        await SendLanguage(update, user);

                                        break;

                                    #endregion

                                    #region Ukrainian

                                    case "Надіслати помилку":
                                        await SendOSMessage(update, user);

                                        break;
                                    case "Список помилок":
                                        await SendBugList(update, user);

                                        break;
                                    case "Змінити мову":
                                        await SendLanguage(update, user);

                                        break;

                                    #endregion

                                    #region Chinese

                                    case "发送错误":
                                        await SendOSMessage(update, user);

                                        break;
                                    case "错误列表":
                                        await SendBugList(update, user);

                                        break;
                                    case "更改语言":
                                        await SendLanguage(update, user);

                                        break;

                                    #endregion

                                    #region Russian

                                    case "Отправить ошибку":
                                        await SendOSMessage(update, user);

                                        break;
                                    case "Список ошибок":
                                        await SendBugList(update, user);

                                        break;

                                    case "Изменить язык":
                                        await SendLanguage(update, user);

                                        break;

                                    #endregion

                                    default:
                                        break;
                                }

                                break;
                            case State.SendBugTitle:
                                message!.From!.SetTitle(message!.Text!);
                                message!.From!.SetState(State.SendBugDescription);

                                await _client.SendTextMessageAsync(message!.From!.Id, user.SendBugDescriptionMessage(), parseMode: ParseMode.Html);

                                break;
                            case State.SendBugDescription:
                                message!.From!.SetDescription(message!.Text!);
                                message!.From!.SetState(State.SendBugMedia);

                                await _client.SendTextMessageAsync(message!.From!.Id, user.SendBugMediaMessage(), replyMarkup: user.SubmitWithoutMedia(), parseMode: ParseMode.Html);

                                break;
                            case State.ChooseLanguage:
                                break;
                            case State.ChoseRejectReason:
                                var bug = bugsDatabase.DeleteBug(message!.From!.User()!.CurrentBugId);

                                message!.From!.SetState(State.Default);

                                await _client.SendTextMessageAsync(message!.From!.Id, user.SuccessRejectedBug());

                                if (bug!.FromUserId == null) return;
                                long id = bug!.FromUserId ?? 0;

                                await _client.SendTextMessageAsync(bug!.FromUserId!, UserExtensions.GetUser(id)!.YourBugRejected(message.Text!));
                                   
                                break;
                        }
                        break;
                    case MessageType.Photo:
                        if (user.State != State.SendBugMedia) return;

                        var photoPath = await _client.GetFilePath(message, Models.Type.Photo, Env.GetString("TOKEN"));
                        if (photoPath == null) return;

                        var photoBug = new Bug()
                        {
                            Description = message!.From!.User()!.BugDescription,
                            Title = message!.From!.User()!.BugTitle,
                            Type = Models.Type.Photo,
                            FromUserId = message.Chat.Id,
                            FromUsername = message!.From!.Username,
                            Path = photoPath,
                            Os = message!.From!.User()!.Os
                        };
                        bugsDatabase.AddBug(photoBug);
                        photoBug.Id = bugsDatabase.AddBug(photoBug);

                        message.From.SetState(State.Default);
                        await _client.SendTextMessageAsync(message.From!.Id, user.SendThanksMessage());

                        foreach (var admin in AdminList)
                        {
                            string photoText = $"<b>{UserExtensions.GetUser(admin)!.NewBugMessage()}</b>\n\n\n<b>Id: </b>{photoBug!.Id}\n<b>Title: </b>{photoBug!.Title}\n<b>Description: </b>{photoBug!.Description}\n<b>Type: </b>{photoBug!.Type}\n<b>From User(Id): </b>{photoBug!.FromUserId}\n<b>From User(Username): </b>{photoBug!.FromUsername}\n<b>Operating System: </b>{photoBug!.Os}\n<b>Media path: </b>{photoBug!.Path}";
                            InlineKeyboardMarkup photoMarkup = new(new[]
                            {
                            new []
                            {
                                 InlineKeyboardButton.WithCallbackData(UserExtensions.GetUser(admin)!.AcceptMessage(), $"ACCEPT:{photoBug.Id}")
                            },
                            new[]
                            {
                                InlineKeyboardButton.WithCallbackData(UserExtensions.GetUser(admin)!.RejectMessage(), $"REJECT:{photoBug.Id}")
                            }
                        });

                            await _client.SendTextMessageAsync(admin, photoText, replyMarkup: photoMarkup, parseMode: ParseMode.Html);
                        }

                        break;
                    case MessageType.Video:
                        if (user.State != State.SendBugMedia) return;

                        var videoPath = await _client.GetFilePath(message, Models.Type.Video, Env.GetString("TOKEN"));
                        if (videoPath == null) return;

                        var videoBug = new Bug()
                        {
                            Description = message!.From!.User()!.BugDescription,
                            Title = message!.From!.User()!.BugTitle,
                            Type = Models.Type.Video,
                            FromUserId = message.Chat.Id,
                            FromUsername = message!.From!.Username,
                            Path = videoPath,
                            Os = message!.From!.User()!.Os
                        };
                        videoBug.Id = bugsDatabase.AddBug(videoBug);

                        message.From.SetState(State.Default);
                        await _client.SendTextMessageAsync(message.From!.Id, user.SendThanksMessage());

                        string videoText = $"<b>{user.NewBugMessage()}</b>\n\n\n<b>Id: </b>{videoBug!.Id}\n<b>Title: </b>{videoBug!.Title}\n<b>Description: </b>{videoBug!.Description}\n<b>Type: </b>{videoBug!.Type}\n<b>From User(Id): </b>{videoBug!.FromUserId}\n<b>From User(Username): </b>{videoBug!.FromUsername}\n<b>Operating System: </b>{videoBug!.Os}\n<b>Media path: </b>{videoBug!.Path}";
                        InlineKeyboardMarkup videoMarkup = new(new[]
                        {
                            new []
                            {
                                 InlineKeyboardButton.WithCallbackData("✅ Accept", $"ACCEPT:{videoBug.Id}")
                            },
                            new[]
                            {
                                InlineKeyboardButton.WithCallbackData("❌ Reject", $"REJECT:{videoBug.Id}")
                            }
                        });

                        foreach (var admin in AdminList)
                        {
                            await _client.SendTextMessageAsync(admin, videoText, replyMarkup: videoMarkup, parseMode: ParseMode.Html);
                        }

                        break;
                    case MessageType.Document:
                        if (user.State != State.SendBugMedia) return;

                        var documentPath = await _client.GetFilePath(message, Models.Type.Document, Env.GetString("TOKEN"));
                        if (documentPath == null) return;

                        var documentBug = new Bug()
                        {
                            Description = message!.From!.User()!.BugDescription,
                            Title = message!.From!.User()!.BugTitle,
                            Type = Models.Type.Document,
                            FromUserId = message.Chat.Id,
                            FromUsername = message!.From!.Username,
                            Path = documentPath,
                            Os = message!.From!.User()!.Os
                        };
                        documentBug.Id = bugsDatabase.AddBug(documentBug);

                        string documentText = $"<b>{user.NewBugMessage()}</b>\n\n\n<b>Id: </b>{documentBug!.Id}\n<b>Title: </b>{documentBug!.Title}\n<b>Description: </b>{documentBug!.Description}\n<b>Type: </b>{documentBug!.Type}\n<b>From User(Id): </b>{documentBug!.FromUserId}\n<b>From User(Username): </b>{documentBug!.FromUsername}\n<b>Operating System: </b>{documentBug!.Os}\n<b>Media path: </b>{documentBug!.Path}";
                        InlineKeyboardMarkup documentMarkup = new(new[]
                        {
                            new []
                            {
                                 InlineKeyboardButton.WithCallbackData("✅ Accept", $"ACCEPT:{documentBug.Id}")
                            },
                            new[]
                            {
                                InlineKeyboardButton.WithCallbackData("❌ Reject", $"REJECT:{documentBug.Id}")
                            }
                        });

                        foreach (var admin in AdminList)
                        {
                            await _client.SendTextMessageAsync(admin, documentText, replyMarkup: documentMarkup, parseMode: ParseMode.Html);
                        }

                        break;
                    default: break;
                }
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        private async Task callBackQueryHandler(Update update, Models.User user)
        {
            try
            {
                if (update == null || update.CallbackQuery == null || update.CallbackQuery.Data == null) return;

                string data = update.CallbackQuery.Data;
                switch (data)
                {
                    #region OS

                    case "ANDROID":
                        if (user.State != State.ChooseOs) return;

                        update.CallbackQuery.From.SetOs(Os.Android);
                        update.CallbackQuery.From.SetState(State.SendBugTitle);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugTitleMessage());

                        break;
                    case "IOS":
                        if (user.State != State.ChooseOs) return;

                        update.CallbackQuery.From.SetOs(Os.Ios);
                        update.CallbackQuery.From.SetState(State.SendBugTitle);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugTitleMessage());
                        break;
                    case "IPADOS":
                        if (user.State != State.ChooseOs) return;

                        update.CallbackQuery.From.SetOs(Os.IPadOS);
                        update.CallbackQuery.From.SetState(State.SendBugTitle);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugTitleMessage());

                        break;
                    case "MACOS":
                        if (user.State != State.ChooseOs) return;

                        update.CallbackQuery.From.SetOs(Os.MacOS);
                        update.CallbackQuery.From.SetState(State.SendBugTitle);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugTitleMessage());

                        break;
                    case "LINUX":
                        if (user.State != State.ChooseOs) return;

                        update.CallbackQuery.From.SetOs(Os.Linux);
                        update.CallbackQuery.From.SetState(State.SendBugTitle);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugTitleMessage());

                        break;
                    case "WINDOWS":
                        if (user.State != State.ChooseOs) return;

                        update.CallbackQuery.From.SetOs(Os.Windows);
                        update.CallbackQuery.From.SetState(State.SendBugTitle);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugTitleMessage());

                        break;
                    case "OTHER":
                        if (user.State != State.ChooseOs) return;

                        update.CallbackQuery.From.SetOs(Os.Other);
                        update.CallbackQuery.From.SetState(State.SendBugTitle);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugTitleMessage());

                        break;

                    #endregion

                    #region Language

                    case "EN":
                        if (user.State != State.ChooseLanguage) return;

                        update.CallbackQuery.From.SetLanguage(Models.Language.English);
                        update.CallbackQuery.From.SetState(Models.State.Default);
                        await _client.SendTextMessageAsync(
                            update.CallbackQuery.From.Id,
                            "You have successfully changed the language to English",
                            replyMarkup: user.StartMarkup()
                            );

                        break;
                    case "UA":
                        if (user.State != State.ChooseLanguage) return;

                        update.CallbackQuery.From.SetLanguage(Models.Language.Ukrainian);
                        update.CallbackQuery.From.SetState(Models.State.Default);
                        await _client.SendTextMessageAsync(
                            update.CallbackQuery.From.Id,
                            "Ви успішно змінили мову на українську",
                            replyMarkup: user.StartMarkup()
                            );

                        break;
                    case "CN":
                        if (user.State != State.ChooseLanguage) return;

                        update.CallbackQuery.From.SetLanguage(Models.Language.Chinese);
                        update.CallbackQuery.From.SetState(Models.State.Default);
                        await _client.SendTextMessageAsync(
                            update.CallbackQuery.From.Id,
                            "您已成功将语言更改为中文",
                            replyMarkup: user.StartMarkup()
                            );

                        break;
                    case "RU":
                        if (user.State != Models.State.ChooseLanguage) return;

                        update.CallbackQuery.From.SetLanguage(Models.Language.Russian);
                        update.CallbackQuery.From.SetState(Models.State.Default);
                        await _client.SendTextMessageAsync(
                            update.CallbackQuery.From.Id,
                            "Вы успешно сменили язык на русский",
                            replyMarkup: user.StartMarkup()
                            );

                        break;

                    #endregion

                    #region Bug

                    case "SUBMIT":
                        if (user.State != State.SendBugMedia) return;

                        var bug = new Bug()
                        {
                            Description = user!.BugDescription,
                            Title = user!.BugTitle,
                            Type = Models.Type.Text,
                            FromUserId = update.CallbackQuery.From.Id,
                            FromUsername = update.CallbackQuery.From.Username,
                            Path = null,
                            Os = user!.Os
                        };
                        bug.Id = bugsDatabase.AddBug(bug);

                        update.CallbackQuery.From!.SetState(State.Default);
                        await _client.SendTextMessageAsync(update.CallbackQuery.From!.Id, user.SendThanksMessage());
                        
                        string text = $"<b>{user.NewBugMessage()}</b>\n\n\n<b>Id: </b>{bug!.Id}\n<b>Title: </b>{bug!.Title}\n<b>Description: </b>{bug!.Description}\n<b>Type: </b>{bug!.Type}\n<b>From User(Id): </b>{bug!.FromUserId}\n<b>From User(Username): </b>{bug!.FromUsername}\n<b>Operating System: </b>{bug!.Os}\n<b>Media path: </b>{bug!.Path}";
                        InlineKeyboardMarkup markup = new(new[]
                        {
                            new []
                            {
                                 InlineKeyboardButton.WithCallbackData("✅ Accept", $"ACCEPT:{bug.Id}")
                            },
                            new[]
                            {
                                InlineKeyboardButton.WithCallbackData("❌ Reject", $"REJECT:{bug.Id}")
                            }
                        });

                        foreach (var admin in AdminList)
                        {
                            await _client.SendTextMessageAsync(admin, text, replyMarkup: markup, parseMode: ParseMode.Html);
                        }

                        break;

                    case "BACK":
                        if (user.IsAdmin == false) return;

                        var backBugs = bugsDatabase.GetBugs().ToList();

                        if (backBugs == null) return;

                        var bugsList = backBugs.Select(b => InlineKeyboardButton.WithCallbackData($"{b.Id} {b.Title}", $"BUG:{b.Id}MESSAGE:{user.CurrentMessageId}")).ToList();
                        var menu = new Menu<InlineKeyboardButton>(5, bugsList);

                        InlineKeyboardMarkup bugsMarkup = new InlineKeyboardMarkup(menu.Pages);

                        await _client.EditMessageTextAsync(update!.CallbackQuery.From.Id, user.CurrentMessageId, user.BugsListMessage(), replyMarkup: bugsMarkup);

                        break;

                    #endregion

                    default:
                        if (data.Contains("BUG:") 
                            && user.IsAdmin == true)
                        {
                            var messageId = int.Parse(data.Split("MESSAGE:")[1].Trim().Split(":")[0]);
                            int bugId;
                            var isInt = int.TryParse(data.Split("BUG:")[1].Trim().Split("MESSAGE:")[0], out bugId);

                            if (isInt)
                            {
                                var bugs = bugsDatabase.GetBugs().ToList();
                                var bug_ = bugs.FirstOrDefault(b => b.Id == bugId);

                                if (bug_ == null) return;
                                
                                string text_ =$"<b>Id: </b>{bug_!.Id}\n<b>Title: </b>{bug_!.Title}\n<b>Description: </b>{bug_!.Description}\n<b>Type: </b>{bug_!.Type}\n<b>From User(Id): </b>{bug_!.FromUserId}\n<b>From User(Username): </b>{bug_!.FromUsername}\n<b>Operating System: </b>{bug_!.Os}\n<b>Media path: </b>{bug_!.Path}";

                                if (bug_.Id != null)
                                    update!.CallbackQuery.From.SetCurrentBugId(bug_.Id ?? 0);
                                await _client.EditMessageTextAsync(update!.CallbackQuery!.From.Id, messageId, text_, replyMarkup: (InlineKeyboardMarkup)user.DetailedBugMarkup(), parseMode: ParseMode.Html);
                            }
                        }
                        else if (data.Contains("FIX")
                            && user.IsAdmin == true)
                        {
                            var messageId = user.CurrentMessageId;
                            var bugId = user.CurrentBugId;
                            
                            var fixedBug = bugsDatabase.DeleteBug(bugId);

                            var backBugs_ = bugsDatabase.GetBugs().ToList();

                            if (backBugs_ == null) return;

                            var bugsList_ = backBugs_.Select(b => InlineKeyboardButton.WithCallbackData($"{b.Id} {b.Title}", $"BUG:{b.Id}MESSAGE:{user.CurrentMessageId}")).ToList();
                            var menu_ = new Menu<InlineKeyboardButton>(5, bugsList_);

                            InlineKeyboardMarkup bugsMarkup_ = new InlineKeyboardMarkup(menu_.Pages);

                            await _client.EditMessageTextAsync(update!.CallbackQuery.From.Id, user.CurrentMessageId, user.BugsListMessage(), replyMarkup: bugsMarkup_);
                            await _client.SendTextMessageAsync(fixedBug!.FromUserId!, $"<b>Your bug has been fixed</b>\n\n\n<b>Id: </b>{fixedBug!.Id}\n<b>Title: </b>{fixedBug!.Title}\n<b>Description: </b>{fixedBug!.Description}\n<b>Type: </b>{fixedBug!.Type}\n<b>From User(Id): </b>{fixedBug!.FromUserId}\n<b>From User(Username): </b>{fixedBug!.FromUsername}\n<b>Operating System: </b>{fixedBug!.Os}", parseMode: ParseMode.Html);
                        }
                        else if (data.Contains("REJECT")
                            && user.IsAdmin == true)
                        {
                            int bugId;
                            bool isInt = int.TryParse(data.Split("REJECT:")[1].Trim(), out bugId);

                            if (isInt)
                            {
                                update.CallbackQuery.From.SetState(State.ChoseRejectReason);
                                update.CallbackQuery.From.SetCurrentBugId(bugId);
                                
                                await _client.SendTextMessageAsync(update.CallbackQuery.From.Id, user.ChooseRejectReason());
                            }
                        }
                        else if (data.Contains("ACCEPT"))
                        {
                            int bugId;
                            bool isInt = int.TryParse(data.Split("ACCEPT:")[1].Trim(), out bugId);

                            if (isInt)
                            {
                                bugsDatabase.Verify(bugId);

                                await _client.SendTextMessageAsync(update.CallbackQuery.From.Id, "✅");
                            }
                        }
                        break;
                }
            }
            catch (Exception ex)
            {
                Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
            }
        }

        private async Task StartMessage(Update update, Models.User user)
        {
            await _client.SendTextMessageAsync(
                update!.Message!.Chat.Id,
                user.StartMessage(),
                replyMarkup: user.StartMarkup(),
                replyToMessageId: update.Message.MessageId);
        }

        private async Task SendOSMessage(Update update, Models.User user)
        {
            await _client.SendTextMessageAsync(
                                        update!.Message!.Chat.Id,
                                        user.ChooseOSMessage(),
                                        replyMarkup: Markups.ChooseOS,
                                        replyToMessageId: update.Message.MessageId);

            update.Message.From!.SetState(State.ChooseOs);
        }

        private async Task SendBugList(Update update, Models.User user)
        {
            if (user.IsAdmin == false) return;

            var bugs = bugsDatabase.GetBugs().ToList();

            if (bugs == null) return;
            
            var message = await _client.SendTextMessageAsync(update!.Message!.Chat.Id, "Loading...");
            update!.Message!.From!.SetCurrentMessageId(message.MessageId);

            var bugsList = bugs.Select(b => InlineKeyboardButton.WithCallbackData($"{b.Id} {b.Title}", $"BUG:{b.Id}MESSAGE:{message.MessageId}")).ToList();
            var menu = new Menu<InlineKeyboardButton>(5, bugsList);

            InlineKeyboardMarkup bugsMarkup = new InlineKeyboardMarkup(menu.Pages);

            await _client.EditMessageTextAsync(update!.Message!.Chat.Id, message.MessageId, user.BugsListMessage(), replyMarkup: bugsMarkup);
        }

        private async Task SendLanguage(Update update, Models.User user)
        {
            await _client.SendTextMessageAsync(
                            update!.Message!.Chat.Id,
                            user.ChooseLanguage(),
                            replyMarkup: Markups.ChooseLanguage);
            update!.Message!.From!.SetState(Models.State.ChooseLanguage);
        }
    }
}
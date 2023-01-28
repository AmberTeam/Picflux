using Cimber.Bot.Extensions;
using Cimber.Bot.MessageTemplates;
using Cimber.Bot.Models;
using DotNetEnv;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;

namespace Cimber.Bot
{
    public class BotService
    {
        private List<Models.User> ActiveUsers = new List<Models.User>();
        private readonly List<long> AdminList = new List<long>()
        {
            930727649,
            1495480119
        };
        private readonly Database.Database database = new Database.Database();
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
                        update.Message.From.SetPermission(ref ActiveUsers, AdminList);

                        if (update!.Message!.Type != MessageType.Text)
                            await messageHandler(update, update!.Message!.From!.User(ref ActiveUsers)!);
                        else if (update!.Message!.Text!.StartsWith("/"))
                            await commandHandler(update, update!.Message!.From!.User(ref ActiveUsers)!);
                        else
                            await messageHandler(update, update!.Message!.From!.User(ref ActiveUsers)!);
                        break;
                    case UpdateType.InlineQuery:
                        break;
                    case UpdateType.ChosenInlineResult:
                        break;
                    case UpdateType.CallbackQuery:
                        if (update.CallbackQuery == null)
                            return;
                        update.CallbackQuery.From.SetPermission(ref ActiveUsers, AdminList);
                        await callBackQueryHandler(update, update!.CallbackQuery!.From!.User(ref ActiveUsers)!);
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
                        await SendABugMessage(update, user);

                        break;
                    case "/buglist":
                        await SendBugList(update, user);
                        
                        break;
                    case "/fix":
                        await SendFix(update, user);

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
                                        await SendABugMessage(update, user);

                                        break;
                                    case "Bugs list":
                                        await SendBugList(update, user);

                                        break;
                                    case "Fix a bug":
                                        await SendFix(update, user);

                                        break;

                                    case "Change the language":
                                        await SendLanguage(update, user);

                                        break;

                                    #endregion

                                    #region Ukrainian

                                    case "Надіслати помилку":
                                        await SendABugMessage(update, user);

                                        break;
                                    case "Список помилок":
                                        await SendBugList(update, user);

                                        break;
                                    case "Виправте помилку":
                                        await SendFix(update, user);

                                        break;

                                    case "Змінити мову":
                                        await SendLanguage(update, user);

                                        break;

                                    #endregion

                                    #region Chinese

                                    case "发送错误":
                                        await SendABugMessage(update, user);

                                        break;
                                    case "错误列表":
                                        await SendBugList(update, user);

                                        break;
                                    case "修复错误":
                                        await SendFix(update, user);

                                        break;

                                    case "更改语言":
                                        await SendLanguage(update, user);

                                        break;

                                    #endregion

                                    #region Russian

                                    case "Отправить ошибку":
                                        await SendABugMessage(update, user);

                                        break;
                                    case "Список ошибок":
                                        await SendBugList(update, user);

                                        break;
                                    case "Исправить ошибку":
                                        await SendFix(update, user);

                                        break;

                                    case "Изменить язык":
                                        await SendLanguage(update, user);

                                        break;

                                    #endregion

                                    default:
                                        break;
                                }

                                break;
                            case State.SendABug:
                                var bug = new Bug()
                                {
                                    Description = message!.Text,
                                    Type = Models.Type.Text,
                                    FromUser = message.Chat.Id,
                                    Path = null,
                                    Os = message!.From!.User(ref ActiveUsers)!.Os
                                };
                                database.AddBug(bug);

                                message!.From!.SetState(ref ActiveUsers, State.Default);
                                await _client.SendTextMessageAsync(message!.From!.Id, user.SendThanksMessage());

                                foreach (var admin in AdminList)
                                {
                                    await _client.SendTextMessageAsync(admin, $"<b>New bug</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<b>ID</b>    <b>TYPE</b>    <b>DESCRIPTION</b>   <b>FROM USER</b>   <b>OS</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n{bug!.Id}    {bug.Type}    {bug.Description}    {bug.FromUser}    {bug.Os}", parseMode: ParseMode.Html);
                                }

                                break;
                            case State.Fix:
                                if (user.Permission != UserPermission.Admin)
                                    return;

                                var fixBug = database.DeleteBug(int.Parse(message!.Text!));
                                string text = $"<b>{user.SendFixedBug()}</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<b>ID</b>    <b>TYPE</b>    <b>DESCRIPTION</b>   <b>FROM USER</b>   <b>OS</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n{fixBug!.Id}    {fixBug.Type}    {fixBug.Description}    {fixBug.FromUser}    {fixBug.Os}";

                                await _client.SendTextMessageAsync(message!.From!.Id, text, parseMode: ParseMode.Html);
                                await _client.SendTextMessageAsync(fixBug!.FromUser!, text, parseMode: ParseMode.Html);

                                break;
                            case State.ChooseLanguage:
                                break;
                        }
                        break;
                    case MessageType.Photo:
                        if (user.State != State.SendABug) return;

                        var photoBug = await _client.GetFilePath(message, Models.Type.Photo, Env.GetString("TOKEN"));
                        if (photoBug == null) return;

                        photoBug.Os = message!.From!.User(ref ActiveUsers)!.Os;
                        database.AddBug(photoBug);

                        message!.From!.SetState(ref ActiveUsers, State.Default);
                        await _client.SendTextMessageAsync(message!.From!.Id, user.SendThanksMessage());

                        foreach (var admin in AdminList)
                        {
                            await _client.SendTextMessageAsync(admin, $"<b>New bug</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<b>ID</b>    <b>TYPE</b>    <b>DESCRIPTION</b>   <b>FROM USER</b>   <b>OS</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n{photoBug!.Id}    {photoBug.Type}    {photoBug.Description}    {photoBug.FromUser}    {photoBug.Os}", parseMode: ParseMode.Html);
                        }

                        break;
                    case MessageType.Video:
                        if (user.State != State.SendABug) return;

                        var videoBug = await _client.GetFilePath(message, Models.Type.Video, Env.GetString("TOKEN"));
                        if (videoBug == null) return;

                        videoBug.Os = message!.From!.User(ref ActiveUsers)!.Os;
                        database.AddBug(videoBug);

                        message!.From!.SetState(ref ActiveUsers, State.Default);
                        await _client.SendTextMessageAsync(message!.From!.Id, user.SendThanksMessage());

                        foreach (var admin in AdminList)
                        {
                            await _client.SendTextMessageAsync(admin, $"<b>New bug</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<b>ID</b>    <b>TYPE</b>    <b>DESCRIPTION</b>   <b>FROM USER</b>   <b>OS</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n{videoBug!.Id}    {videoBug.Type}    {videoBug.Description}    {videoBug.FromUser}    {videoBug.Os}", parseMode: ParseMode.Html);
                        }

                        break;
                    case MessageType.Document:
                        if (user.State != State.SendABug) return;

                        var documentBug = await _client.GetFilePath(message, Models.Type.Document, Env.GetString("TOKEN"));
                        if (documentBug == null) return;

                        documentBug.Os = message!.From!.User(ref ActiveUsers)!.Os;
                        database.AddBug(documentBug);

                        message!.From!.SetState(ref ActiveUsers, State.Default);
                        await _client.SendTextMessageAsync(message!.From!.Id, user.SendThanksMessage());

                        foreach (var admin in AdminList)
                        {
                            await _client.SendTextMessageAsync(admin, $"<b>New bug</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<b>ID</b>    <b>TYPE</b>    <b>DESCRIPTION</b>   <b>FROM USER</b>   <b>OS</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n{documentBug!.Id}    {documentBug.Type}    {documentBug.Description}    {documentBug.FromUser}    {documentBug.Os}", parseMode: ParseMode.Html);
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


        private async Task StartMessage(Update update, Models.User user)
        {
            await _client.SendTextMessageAsync(
                update!.Message!.Chat.Id,
                user.StartMessage(),
                replyMarkup: user.StartMarkup(),
                replyToMessageId: update.Message.MessageId);
        }

        private async Task SendABugMessage(Update update, Models.User user)
        {
            await _client.SendTextMessageAsync(
                                        update!.Message!.Chat.Id,
                                        user.ChooseOSMessage(),
                                        replyMarkup: Markups.ChooseOS,
                                        replyToMessageId: update.Message.MessageId);

            update.Message.From!.Activate(ref ActiveUsers);
            update.Message.From!.SetState(ref ActiveUsers, State.SendABug);
        }

        private async Task SendBugList(Update update, Models.User user)
        {
            if (user.Permission == UserPermission.User) return;

            var bugs = database.GetBugs().ToList();
            string text = "<b>Bugs</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━<b>ID</b>    <b>TYPE</b>    <b>DESCRIPTION</b>    <b>PATH</b>    <b>FROM USER</b>    <b>OS</b>\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

            foreach (var bug in bugs)
            {
                text += $"\n<b>{bug.Id}</b>    {bug.Type}    {bug.Description}    {bug.Path}    {bug.FromUser}    {bug.Os}\n\n";
            }

            await _client.SendTextMessageAsync(update!.Message!.Chat.Id, text, parseMode: ParseMode.Html);

        }

        private async Task SendFix(Update update, Models.User user)
        {
            if (user.Permission == UserPermission.User) return;

            await _client.SendTextMessageAsync(update!.Message!.Chat.Id, user.SendBugIdMessage());
            update!.Message!.From!.SetState(ref ActiveUsers, State.Fix);
        }

        private async Task SendLanguage(Update update, Models.User user)
        {
            await _client.SendTextMessageAsync(
                            update!.Message!.Chat.Id,
                            user.ChooseLanguage(),
                            replyMarkup: Markups.ChooseLanguage);
            update!.Message!.From!.SetState(ref ActiveUsers, Models.State.ChooseLanguage);
        }


        private async Task callBackQueryHandler(Update update, Models.User user)
        {
            try
            {
                if (update == null || update.CallbackQuery == null || update.CallbackQuery.Data == null) return;

                string data = update.CallbackQuery.Data;
                switch (data)
                {
                    case "ANDROID":
                        if (user.State != State.SendABug) return;

                        update.CallbackQuery.From.SetOs(ref ActiveUsers, Os.Android);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugMessage());

                        break;
                    case "IOS":
                        if (user.State != State.SendABug) return;

                        update.CallbackQuery.From.SetOs(ref ActiveUsers, Os.Ios);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugMessage());
                        break;
                    case "IPADOS":
                        if (user.State != State.SendABug) return;

                        update.CallbackQuery.From.SetOs(ref ActiveUsers, Os.IPadOS);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugMessage());

                        break;
                    case "MACOS":
                        if (user.State != State.SendABug) return;

                        update.CallbackQuery.From.SetOs(ref ActiveUsers, Os.MacOS);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugMessage());

                        break;
                    case "LINUX":
                        if (user.State != State.SendABug) return;

                        update.CallbackQuery.From.SetOs(ref ActiveUsers, Os.Linux);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugMessage());

                        break;
                    case "WINDOWS":
                        if (user.State != State.SendABug) return;

                        update.CallbackQuery.From.SetOs(ref ActiveUsers, Os.Windows);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugMessage());

                        break;
                    case "OTHER":
                        if (user.State != State.SendABug) return;

                        update.CallbackQuery.From.SetOs(ref ActiveUsers, Os.Other);
                        await _client.SendTextMessageAsync(update!.CallbackQuery.From.Id, user.SendBugMessage());

                        break;
                    case "EN":
                        if (user.State != State.ChooseLanguage) return;

                        update.CallbackQuery.From.SetLanguage(ref ActiveUsers, Models.Language.English);
                        update.CallbackQuery.From.SetState(ref ActiveUsers, Models.State.Default);
                        await _client.SendTextMessageAsync(
                            update.CallbackQuery.From.Id,
                            "You have successfully changed the language to English",
                            replyMarkup: user.StartMarkup()
                            );

                        break;
                    case "UA":
                        if (user.State != State.ChooseLanguage) return;

                        update.CallbackQuery.From.SetLanguage(ref ActiveUsers, Models.Language.Ukrainian);
                        update.CallbackQuery.From.SetState(ref ActiveUsers, Models.State.Default);
                        await _client.SendTextMessageAsync(
                            update.CallbackQuery.From.Id,
                            "Ви успішно змінили мову на українську",
                            replyMarkup: user.StartMarkup()
                            );

                        break;
                    case "CN":
                        if (user.State != State.ChooseLanguage) return;

                        update.CallbackQuery.From.SetLanguage(ref ActiveUsers, Models.Language.Chinese);
                        update.CallbackQuery.From.SetState(ref ActiveUsers, Models.State.Default);
                        await _client.SendTextMessageAsync(
                            update.CallbackQuery.From.Id,
                            "您已成功将语言更改为中文",
                            replyMarkup: user.StartMarkup()
                            );

                        break;
                    case "RU":
                        if (user.State != Models.State.ChooseLanguage) return;

                        update.CallbackQuery.From.SetLanguage(ref ActiveUsers, Models.Language.Russian);
                        update.CallbackQuery.From.SetState(ref ActiveUsers, Models.State.Default);
                        await _client.SendTextMessageAsync(
                            update.CallbackQuery.From.Id,
                            "Вы успешно сменили язык на русский",
                            replyMarkup: user.StartMarkup()
                            );

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
    }
}

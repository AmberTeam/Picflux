using Telegram.Bot.Types.ReplyMarkups;

namespace Cimber.Bot.MessageTemplates
{
    public static class MessageTemplates
    {
        public static string StartMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "Welcome to Cimber Bot🍿! Here you can easily report bugs to us. Choose an action below:";
                case Models.Language.Ukrainian:
                    return "Ласкаво просимо до Cimber Bot🍿! Тут ви можете легко повідомити нам про помилки. Виберіть дію нижче:";
                case Models.Language.Chinese:
                    return "欢迎来到 Cimber Bot🍿！ 在这里您可以轻松地向我们报告错误。选择以下操作：";
                case Models.Language.Russian:
                    return "Добро пожаловать в Cimber Bot🍿! Тут вы можете легко сообщить нам об ошибках. Выберите действие ниже:";

                default:
                    return "Welcome to Cimber Bot🍿! Here you can easily report bugs to us. Choose an action below:";
            }
        }

        public static IReplyMarkup StartMarkup(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    if (user.Permission == Models.UserPermission.User)
                        return Markups.MainMenuEngUser;
                    else
                        return Markups.MainMenuEngAdmin;
                case Models.Language.Ukrainian:
                    if (user.Permission == Models.UserPermission.User)
                        return Markups.MainMenuUkrUser;
                    else
                        return Markups.MainMenuUkrAdmin;
                case Models.Language.Chinese:
                    if (user.Permission == Models.UserPermission.User)
                        return Markups.MainMenuChiUser;
                    else
                        return Markups.MainMenuChiAdmin;
                case Models.Language.Russian:
                    if (user.Permission == Models.UserPermission.User)
                        return Markups.MainMenuRusUser;
                    else
                        return Markups.MainMenuRusAdmin;
                default:
                    if (user.Permission == Models.UserPermission.User)
                        return Markups.MainMenuEngUser;
                    else
                        return Markups.MainMenuEngAdmin;
            }
        }

        public static string ChooseLanguage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "Please select a language below:";
                case Models.Language.Ukrainian:
                    return "Будь ласка, виберіть мову нижче:";
                case Models.Language.Chinese:
                    return "请在下方选择一种语言：";
                case Models.Language.Russian:
                    return "Пожалуйста, выберите язык ниже:";

                default:
                    return "Please select a language below:";
            }
        }

        public static string ChooseOSMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "Please choose your Operating System below:";
                case Models.Language.Ukrainian:
                    return "Виберіть свою операційну систему нижче:";
                case Models.Language.Chinese:
                    return "请在下面选择您的操作系统：";
                case Models.Language.Russian:
                    return "Пожалуйста, выберите свою операционную систему ниже:";

                default:
                    return "Please choose your Operating System below:";
            }
        }

        public static string SendBugMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "Please submit an error description with a photo|file|video (in one message) under 10 MB in size here:";
                case Models.Language.Ukrainian:
                    return "Будь ласка, надішліть опис помилки з фотографією|файлом|відео (одним повідомленням) розміром менше 10 МБ сюди:";
                case Models.Language.Chinese:
                    return "请在此处提交带有 照片|文件|视频（一条消息）的错误说明，大小不超过 10 MB：";
                case Models.Language.Russian:
                    return "Пожалуйста, отправьте описание ошибки с фотографией|файлом|видео (одним сообщением) размером менее 10 МБ сюда:";

                default:
                    return "Please submit an error description with a photo|file|video (in one message) under 10 MB in size here:";
            }
        }

        public static string SendThanksMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "Thank you for submitting the bug, it will help us improve our platform!";
                case Models.Language.Ukrainian:
                    return "Дякуємо, що повідомили про помилку, це допоможе нам покращити нашу платформу!";
                case Models.Language.Chinese:
                    return "感谢您提交错误，它将帮助我们改进我们的平台！";
                case Models.Language.Russian:
                    return "Спасибо за сообщение об ошибке, это поможет нам улучшить нашу платформу!";

                default:
                    return "Thank you for submitting the bug, it will help us improve our platform!";
            }
        }

        public static string SendBugIdMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "Please send the ID of a bug you want to fix";
                case Models.Language.Ukrainian:
                    return "Будь ласка, надішліть ID помилки, яку ви хочете виправити";
                case Models.Language.Chinese:
                    return "请发送您要修复的错误的 ID";
                case Models.Language.Russian:
                    return "Пожалуйста, отправьте ID ошибки, которую вы хотите исправить";

                default:
                    return "Please send the ID of a bug you want to fix";
            }
        }

        public static string SendFixedBug(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "The bug has been successfully fixed :D";
                case Models.Language.Ukrainian:
                    return "Помилка успішно виправлена :D";
                case Models.Language.Chinese:
                    return "该错误已成功修复 :D";
                case Models.Language.Russian:
                    return "Ошибка успешно исправлена :D";

                default:
                    return "The bug has been successfully fixed :D";
            }
        }
    }
}

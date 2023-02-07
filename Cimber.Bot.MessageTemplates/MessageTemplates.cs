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
                    if (user.IsAdmin == false)
                        return Markups.MainMenuEngUser;
                    else
                        return Markups.MainMenuEngAdmin;
                case Models.Language.Ukrainian:
                    if (user.IsAdmin == false)
                        return Markups.MainMenuUkrUser;
                    else
                        return Markups.MainMenuUkrAdmin;
                case Models.Language.Chinese:
                    if (user.IsAdmin == false)
                        return Markups.MainMenuChiUser;
                    else
                        return Markups.MainMenuChiAdmin;
                case Models.Language.Russian:
                    if (user.IsAdmin == false)
                        return Markups.MainMenuRusUser;
                    else
                        return Markups.MainMenuRusAdmin;
                default:
                    if (user.IsAdmin == false)
                        return Markups.MainMenuEngUser;
                    else
                        return Markups.MainMenuEngAdmin;
            }
        }

        public static IReplyMarkup SubmitWithoutMedia(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return Markups.SubmitWithoutMediaEng;
                case Models.Language.Ukrainian:
                    return Markups.SubmitWithoutMediaUkr;
                case Models.Language.Chinese:
                    return Markups.SubmitWithoutMediaChi;
                case Models.Language.Russian:
                    return Markups.SubmitWithoutMediaRus;
                default:
                    return Markups.SubmitWithoutMediaEng;
            }
        }

        public static IReplyMarkup DetailedBugMarkup(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return Markups.DetailedBugEng;
                case Models.Language.Ukrainian:
                    return Markups.DetailedBugUkr;
                case Models.Language.Chinese:
                    return Markups.DetailedBugChi;
                case Models.Language.Russian:
                    return Markups.DetailedBugRus;

                default:
                    return Markups.DetailedBugEng;
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

        public static string SendBugTitleMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "Please submit a bug title below:";
                case Models.Language.Ukrainian:
                    return "Будь ласка, надішліть назву помилки нижче:";
                case Models.Language.Chinese:
                    return "请在下方提交错误标题：";
                case Models.Language.Russian:
                    return "Пожалуйста, отправьте название ошибки ниже:";

                default:
                    return "Please submit a bug title below:";
            }
        }

        public static string SendBugDescriptionMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "Please submit a bug description below:";
                case Models.Language.Ukrainian:
                    return "Будь ласка, надішліть опис помилки нижче:";
                case Models.Language.Chinese:
                    return "请在下方提交错误描述：";
                case Models.Language.Russian:
                    return "Пожалуйста, отправьте описание ошибки ниже:";

                default:
                    return "Please submit a bug description below:";
            }
        }

        public static string SendBugMediaMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "Please submit a photo|video|document of the error (up to 10 MB) below:";
                case Models.Language.Ukrainian:
                    return "Будь ласка, надішліть фото|відео|документ помилки (до 10 МБ) нижче:";
                case Models.Language.Chinese:
                    return "请在下方提交错误的 照片|视频|文档（低于 10 MB）：";
                case Models.Language.Russian:
                    return "Пожалуйста, отправьте фото|видео|документ об ошибке (до 10 МБ) ниже:";

                default:
                    return "Please submit a photo|video|document of the error (up to 10 MB) below:";
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

        public static string ChooseRejectReason(this Models.User user) 
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "Enter a rejection reason below (this reason will be visible to the submitting user):";
                case Models.Language.Ukrainian:
                    return "Введіть причину відхилення нижче (цю причину бачитиме користувач, який надсилає запит):";
                case Models.Language.Chinese:
                    return "在下方输入拒绝原因（提交用户可以看到该原因）：";
                case Models.Language.Russian:
                    return "Введите причину отклонения ниже (эта причина будет видна подавшему заявку пользователю): ";

                default:
                    return "Enter a rejection reason below (this reason will be visible to the submitting user): ";
            }
        }

        public static string SuccessRejectedBug(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "✅ You have successfully rejected a bug";
                case Models.Language.Ukrainian:
                    return "✅ Ви успішно відхилили помилку";
                case Models.Language.Chinese:
                    return "✅ 您已成功拒绝一个错误";
                case Models.Language.Russian:
                    return "✅ Вы успешно отклонили ошибку";

                default:
                    return "✅ You have successfully rejected a bug";
            }
        }

        public static string YourBugRejected(this Models.User user, string text)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return $"❌ Your bug has benn rejected, due to the reason: {text}";
                case Models.Language.Ukrainian:
                    return $"❌ Вашу помилку відхилено з причини: {text}";
                case Models.Language.Chinese:
                    return $"❌ 您的错误已被拒绝，原因是：{text}";
                case Models.Language.Russian:
                    return $"❌ Ваш баг отклонен по причине: {text}";

                default:
                    return $"❌ Your bug has benn rejected, due to the reason: {text}";
            }
        }
        
        public static string AcceptMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "✅ Accept";
                case Models.Language.Ukrainian:
                    return "✅ Прийняти";
                case Models.Language.Chinese:
                    return "✅ 接受";
                case Models.Language.Russian:
                    return "✅ Принять";

                default:
                    return "✅ Accept";
            }
        }

        public static string RejectMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "❌ Reject";
                case Models.Language.Ukrainian:
                    return "❌ Відхилити";
                case Models.Language.Chinese:
                    return "❌ 拒绝";
                case Models.Language.Russian:
                    return "❌ Отклонить";

                default:
                    return "❌ Reject";
            }
        }

        public static string NewBugMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "🆕 New Bug";
                case Models.Language.Ukrainian:
                    return "🆕 Нова помилка";
                case Models.Language.Chinese:
                    return "🆕 新错误";
                case Models.Language.Russian:
                    return "🆕 Новая ошибка";

                default:
                    return "🆕 New Bug";
            }
        }

        public static string BugsListMessage(this Models.User user)
        {
            switch (user.InterfaceLanguage)
            {
                case Models.Language.English:
                    return "⛔ Bugs List";
                case Models.Language.Ukrainian:
                    return "⛔ Список помилок";
                case Models.Language.Chinese:
                    return "⛔ 错误列表";
                case Models.Language.Russian:
                    return "⛔ Список ошибок";

                default:
                    return "⛔ Bugs List";
            }
        }
    }
}

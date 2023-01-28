using Telegram.Bot.Types.ReplyMarkups;

namespace Cimber.Bot.MessageTemplates
{
    public static class Markups
    {
        public readonly static ReplyKeyboardMarkup MainMenuEngUser = new(
            new[] { 
                new KeyboardButton[] 
                { 
                    "Send a bug",
                    "Change the language"
                } 
            }) { ResizeKeyboard = true };
        public readonly static ReplyKeyboardMarkup MainMenuEngAdmin = new(
            new[] {
                new KeyboardButton[] {
                    "Send a bug", 
                    "Bugs list",
                    "Change the language",
                    "Fix a bug" 
                } 
            }) { ResizeKeyboard = true };

        public readonly static ReplyKeyboardMarkup MainMenuUkrUser = new(
            new[] {
                new KeyboardButton[]
                {
                    "Надіслати помилку",
                    "Змінити мову"
                }
            })
        { ResizeKeyboard = true };
        public readonly static ReplyKeyboardMarkup MainMenuUkrAdmin = new(
            new[] {
                new KeyboardButton[] {
                    "Надіслати помилку",
                    "Список помилок",
                    "Змінити мову",
                    "Виправте помилку"
                }
            })
        { ResizeKeyboard = true };

        public readonly static ReplyKeyboardMarkup MainMenuChiUser = new(
            new[] {
                new KeyboardButton[]
                {
                    "发送错误",
                    "更改语言"
                }
            })
        { ResizeKeyboard = true };
        public readonly static ReplyKeyboardMarkup MainMenuChiAdmin = new(
            new[] {
                new KeyboardButton[] {
                    "发送错误",
                    "错误列表",
                    "更改语言",
                    "修复错误"
                }
            })
        { ResizeKeyboard = true };

        public readonly static ReplyKeyboardMarkup MainMenuRusUser = new(
            new[] {
                new KeyboardButton[]
                {
                    "Отправить ошибку",
                    "Изменить язык"
                }
            })
        { ResizeKeyboard = true };
        public readonly static ReplyKeyboardMarkup MainMenuRusAdmin = new(
            new[] {
                new KeyboardButton[] {
                    "Отправить ошибку",
                    "Список ошибок",
                    "Изменить язык",
                    "Исправить ошибку"
                }
            })
        { ResizeKeyboard = true };


        public readonly static InlineKeyboardMarkup ChooseOS = new(new[]
        {
            new []
            {
                InlineKeyboardButton.WithCallbackData("Ios (Safari)", "IOS"),
                InlineKeyboardButton.WithCallbackData("MacOS (Safari)", "MACOS"),
                InlineKeyboardButton.WithCallbackData("IPadOS (Safari)", "IPADOS"),
                InlineKeyboardButton.WithCallbackData("Linux", "LINUX"),
            },
            new[]
            {
                InlineKeyboardButton.WithCallbackData("Android", "ANDROID"),
                InlineKeyboardButton.WithCallbackData("Windows", "WINDOWS"),
                InlineKeyboardButton.WithCallbackData("Other", "OTHER"),
            }
        });

        public readonly static InlineKeyboardMarkup ChooseLanguage = new(new[]
        {
            new []
            {
                InlineKeyboardButton.WithCallbackData("English", "EN"),
                InlineKeyboardButton.WithCallbackData("Українська", "UA"),
                InlineKeyboardButton.WithCallbackData("中文（简体）", "CN"),
                InlineKeyboardButton.WithCallbackData("Русский", "RU"),
            },
        });
    }
}

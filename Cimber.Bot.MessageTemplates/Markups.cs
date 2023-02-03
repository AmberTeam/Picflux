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
                    "Change the language"
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
                    "Змінити мову"
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
                    "更改语言"
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
                    "Изменить язык"
                }
            })
        { ResizeKeyboard = true };

        public readonly static InlineKeyboardMarkup SubmitWithoutMediaEng = new(new[]
        {
            new []
            {
                InlineKeyboardButton.WithCallbackData("✅ Submit Without Media", "SUBMIT"),
            },
        });

        public readonly static InlineKeyboardMarkup SubmitWithoutMediaUkr = new(new[]
        {
            new []
            {
                InlineKeyboardButton.WithCallbackData("✅ Надіслати без медіа", "SUBMIT"),
            },
        });

        public readonly static InlineKeyboardMarkup SubmitWithoutMediaChi = new(new[]
        {
            new []
            {
                InlineKeyboardButton.WithCallbackData("✅ 无媒体提交", "SUBMIT"),
            },
        });

        public readonly static InlineKeyboardMarkup SubmitWithoutMediaRus = new(new[]
        {
            new []
            {
                InlineKeyboardButton.WithCallbackData("✅ Отправить без медиа", "SUBMIT"),
            },
        });

        public readonly static InlineKeyboardMarkup DetailedBugEng = new(new[]
{
            new []
            {
                InlineKeyboardButton.WithCallbackData("⬅️ Back", "BACK"),
                InlineKeyboardButton.WithCallbackData("🛠 Fix", "FIX")
            },
        });

        public readonly static InlineKeyboardMarkup DetailedBugUkr = new(new[]
        {
            new []
            {
                InlineKeyboardButton.WithCallbackData("⬅️ Назад", "BACK"),
                InlineKeyboardButton.WithCallbackData("🛠 Виправити", "FIX")
            },
        });

        public readonly static InlineKeyboardMarkup DetailedBugChi = new(new[]
        {
            new []
            {
                InlineKeyboardButton.WithCallbackData("⬅️ 返回", "BACK"),
                InlineKeyboardButton.WithCallbackData("🛠 修复", "FIX")
            },
        });

        public readonly static InlineKeyboardMarkup DetailedBugRus = new(new[]
        {
            new []
            {
                InlineKeyboardButton.WithCallbackData("⬅️ Назад", "BACK"),
                InlineKeyboardButton.WithCallbackData("🛠 Исправить", "FIX")
            },
        });

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

using Cimber.Bot.Models;
using Telegram.Bot;
using Telegram.Bot.Types;

namespace Cimber.Bot.Extensions
{
    public static class ClientExtensions
    {
        public static async Task<Bug?> GetFilePath(this ITelegramBotClient client, Message message, Models.Type type, string token)
        {
            if (type == Models.Type.Text) return null;

            string fileId = string.Empty;

            if (type == Models.Type.Photo)
                fileId = message!.Photo!.Last().FileId;

            else if (type == Models.Type.Document)
                fileId = message!.Document!.FileId;

            else if (type == Models.Type.Video)
                fileId = message!.Video!.FileId;


            var fileInfo = await client.GetFileAsync(fileId);
            var bug = new Bug()
            {
                Description = message!.Caption ?? "NO DESCRIPTION",
                Type = type,
                FromUser = message.Chat.Id,
                Path = $"https://api.telegram.org/file/bot{token}/{fileInfo.FilePath}"
            };

            return bug;
        }
    }
}

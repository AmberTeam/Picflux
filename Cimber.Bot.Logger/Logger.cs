using NLog.Fluent;

namespace Cimber.Bot.Logger
{
    public class Logger
    {
		private readonly static NLog.ILogger _log = NLog.LogManager.GetCurrentClassLogger();

        public static void InitLogger()
        {
            _log.Info($"Logger has been initialized");
        }

        public static void Debug(string text)
        {
            Console.ForegroundColor = ConsoleColor.Gray;
            _log.Debug(text);
        }

        public static void Info(string text)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            _log.Info(text);
        }

        public static void Warning(string text)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            _log.Warn(text);
        }

        public static void Error(string text)
        {
            Console.ForegroundColor = ConsoleColor.Magenta;
            _log.Error(text);
        }
    }
}

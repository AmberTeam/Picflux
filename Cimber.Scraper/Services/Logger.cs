using NLog;

namespace Cimber.Scraper
{
    public static class Logger
    {
        private static ILogger log = LogManager.GetCurrentClassLogger();

        public static ILogger Log
        {
            get { return log; }
        }

        public static void InitLogger()
        {
            log.Info($"Logger has been initialized");
        }

        public static void Info(string text)
        {
            Console.ForegroundColor = ConsoleColor.White;
            Log.Info(text);
        }

        public static void Debug(string text)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Log.Debug(text);
        }

        public static void Warning(string text)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Log.Warn(text);
        }

        public static void Error(string text)
        {
            Console.ForegroundColor = ConsoleColor.Magenta;
            Log.Error(text);
        }
    }
}
namespace Cimber.Translator
{
    internal class RequirementsChecker
    {
        public static void Init()
        {
            Directory.CreateDirectory("requirements");
        }

        public static bool CheckIMDB()
        {
            if (File.Exists(Directory.GetCurrentDirectory() + "\\requirements\\imdb.db"))
            {
                return true;
            }

            return false;
        }

        public static void UpdateIMDB()
        {
            const string URL = "https://datasets.imdbws.com/name.basics.tsv.gz";
            var httpClient = new HttpClient();

            using (
                var stream = httpClient.GetStreamAsync("https://via.placeholder.com/300.png").Result
            )
            {
                using (
                    var fileStream = new FileStream(
                        Directory.GetCurrentDirectory() + "\\requirements\\imdb.db",
                        FileMode.CreateNew
                    )
                )
                {
                    stream.CopyToAsync(fileStream).Wait();
                }
            }
        }
    }
}

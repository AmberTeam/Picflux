using Cimber.Scraper;
using Cimber.Scraper.Models;

Console.Write(
    "Please choose a website to scrape:\n1 - Gidonline\n2 - Kinogo\n3 - Kinokrad\n4 - Kinoprofi\n-> "
);
var website = Console.ReadLine();
Scraper scraper;

if (website!.Contains("1"))
{
    scraper = new Scraper(Website.GIDONLINE);
}
else if (website!.Contains("2"))
{
    scraper = new Scraper(Website.KINOGO);
}
else if (website!.Contains("3"))
{
    scraper = new Scraper(Website.KINOKRAD);
}
else if (website!.Contains("4"))
{
    scraper = new Scraper(Website.KINOPROFI);
}
else
{
    scraper = new Scraper(Website.GIDONLINE);
}

var watch = new System.Diagnostics.Stopwatch();
watch.Start();

Logger.InitLogger();
scraper.Start();

watch.Stop();
Console.WriteLine(
    $"Execution Time: {watch.Elapsed.Hours} hours and {watch.Elapsed.Minutes} minutes"
);
Console.ReadLine();

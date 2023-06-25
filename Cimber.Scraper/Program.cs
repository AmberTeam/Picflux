using Cimber.Scraper.Scrapers;
using Cimber.Scraper;
using Spectre.Console;

Console.OutputEncoding = System.Text.Encoding.UTF8;
Logger.InitLogger();

AnsiConsole.Markup("[purple][bold]Cimber Scraper v3.0.1[/][/]\n");

var table = new Table();

table.AddColumn("Id");
table.AddColumn("[red]Name[/]");
table.AddColumn("[green]Url[/]");
table.AddColumn("[blue]Language[/]");

//table.AddRow("1", "Gidonline", Website.GIDONLINE, "Russian");
table.AddRow("1", "Kinokrad", Website.KINOKRAD, "Russian");
table.AddRow("2", "Kinoprofi", Website.KINOPROFI, "Russian");
table.AddRow("3", "Kinogo", Website.KINOGO, "Russian");
table.AddRow("4", "Kinogoua", Website.KINOGOUA, "Ukrainian");
table.AddRow("5", "Uakino", Website.UAKINO, "Ukrainian");
table.AddRow("6", "123Movies", Website._123Movies, "English");

AnsiConsole.Write(table);
var website = AnsiConsole.Prompt(
    new SelectionPrompt<string>()
        .PageSize(8)
        .Title("What website do you want to parse?")
        .AddChoices(new[]
        {
        /*"1 - (Gidonline)", */"1 - (Kinokrad)", "2 - (Kinoprofi)", "3 - (Kinogo)", "4 - (Kinogoua)", "5 - (Uakino)", "6 - (123Movies)", "[green]All[/]"
        }));
AnsiConsole.Markup($"You chose -> {website}\n");

//if (website!.StartsWith("1"))
//{
//    var scraper = new GidonlineScraper();
//    scraper.Start();
//}
if (website!.StartsWith("1"))
{
    var scraper = new KinokradScraper();
    scraper.Start();
}
else if (website!.StartsWith("2"))
{
    var scraper = new KinoprofiScraper();
    scraper.Start();
}
else if (website!.StartsWith("3"))
{
    var scraper = new KinogoScraper();
    scraper.Start();
}
else if (website!.StartsWith("4"))
{
    var scraper = new KinogouaScraper();
    scraper.Start();
}
else if (website!.StartsWith("5"))
{
    var scraper = new UakinoScraper();
    scraper.Start();
}
else if (website!.StartsWith("6"))
{
    var scraper = new _123MoviesScraper();
    scraper.Start();
}
else if (website!.Contains("All"))
{
    //var gidonlineScraper = new GidonlineScraper();
    var kinokradScraper = new KinokradScraper();
    var kinoprofiScraper = new KinoprofiScraper();
    var kinogoScraper = new KinogoScraper();
    var kinogouaScraper = new KinogouaScraper();
    var uakinoScraper = new UakinoScraper();
    //var _123MoviesScraper = new _123MoviesScraper();

    //gidonlineScraper.Start();
    kinogoScraper.Start();
    uakinoScraper.Start();
    kinoprofiScraper.Start();
    kinokradScraper.Start();
    kinogouaScraper.Start();
    //_123MoviesScraper.Start();
}
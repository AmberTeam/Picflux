using Cimber.Translator;
using Cimber.Translator.Models;
using System.Text;

const string LOGO =
    "  ___                              ___  \r\n (o o)                            (o o) \r\n(  V  ) CIMBER TRANSLATOR v1.0.0 (  V  )\r\n--m-m------------------------------m-m--\n";

Console.OutputEncoding = Encoding.UTF8;
Console.WriteLine(LOGO);

Console.Write("Please enter the path to your database\n-> ");
string? path = Console.ReadLine();

if (path == null)
    return;

Console.Write("Please enter a new name of your database\n-> ");
string? name = Console.ReadLine();

if (name == null)
    return;

Console.Write("Please enter a language you want to translate\n0 - English\n1 - Ukrainian\n-> ");
string? languageText = Console.ReadLine();

if (languageText == null)
    return;

var language = languageText.Contains("0") ? Language.English : Language.Ukrainian;
Logger.InitLogger();

var translator = new Translator(path, name, language);
translator.Start();

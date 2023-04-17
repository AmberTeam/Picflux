using Cimber.Scraper.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Collections.Generic;
using System;
using System.Text;

namespace Cimber.Scraper
{
    public class DatabaseService
    {
        private readonly NpgsqlConnection _connection;

        public DatabaseService()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                    .AddJsonFile("appsettings.json").Build();
            string connectionString = configuration.GetConnectionString("DbConnection") ?? "";
            _connection = new NpgsqlConnection(connectionString);
            _connection.Open();

            using (var cmd = new NpgsqlCommand("SET lc_messages = 'en_US.UTF-8'", _connection))
            {
                cmd.ExecuteNonQuery();
            }

            try
            {
                var commandString = "CREATE TABLE IF NOT EXISTS Film (Id SERIAL PRIMARY KEY,DateAdded TIMESTAMP NOT NULL,DateUpdated TIMESTAMP NOT NULL,Language INT NOT NULL,Title TEXT UNIQUE NOT NULL,LowercaseTitle TEXT,OriginalTitle TEXT UNIQUE NOT NULL,EnglishTitle TEXT,UkrainianTitle TEXT,RussianTitle TEXT,Description TEXT,OriginalDescription TEXT,EnglishDescription TEXT,UkrainianDescription TEXT,RussianDescription TEXT,Year INTEGER NOT NULL,Countries TEXT[],EnglishCountries TEXT[],UkrainianCountries TEXT[],RussianCountries TEXT[],Duration INTERVAL NOT NULL,Genres TEXT[],EnglishGenres TEXT[],UkrainianGenres TEXT[],RussianGenres TEXT[],Poster TEXT,Players TEXT[],Reviews TEXT);";
                var command = new NpgsqlCommand(commandString, _connection);
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                if (!e.ToString().Contains("already"))
                    Logger.Error($"[{e.GetLine()}] [{e.Source}]\n\t{e.Message}");
            }
        }

        private string removeSpecialCharacters(string str)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'А' && c <= 'Я') || (c >= 'а' && c <= 'я') || (c >= 'a' && c <= 'z') || c == 'є' || c == 'і' || c == 'ї' || c == '.' || c == '_')
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }

        public Film? AddFilm(Film film)
        {
            try
            {
                if (film == null || film.Players == null) return null;

                film.Players = film.Players.Where(p => p.Length > 7).ToList();
                film.Players.Where(p => film.Players.Contains(p.Split("/")[0]) == false);

                if (film!.Players!.Count < 1) return null;

                film.Description = film!.Description!.Replace("'", "");
                film.Description = film!.Description!.Replace("© ГидОнлайн", "");
                film.Description = film!.Description!.Replace("&laquo;", "«").Replace("&raquo;", "»");
                film.LowercaseTitle = removeSpecialCharacters(film.Title!.ToLower());

                try
                {
                    using (var cmd = new NpgsqlCommand())
                    {
                        cmd.Connection = _connection;
                        cmd.CommandText = "INSERT INTO Film(DateAdded, DateUpdated, Language, Title, LowercaseTitle, OriginalTitle, EnglishTitle, UkrainianTitle, RussianTitle, Description, OriginalDescription, EnglishDescription, UkrainianDescription, RussianDescription, Year, Countries, EnglishCountries, UkrainianCountries, RussianCountries, Duration, Genres, EnglishGenres, UkrainianGenres, RussianGenres, Poster, Players) VALUES(@DateAdded, @DateUpdated, @Language, @Title, @LowercaseTitle, @OriginalTitle, @EnglishTitle, @UkrainianTitle, @RussianTitle, @Description, @OriginalDescription, @EnglishDescription, @UkrainianDescription, @RussianDescription, @Year, @Countries, @EnglishCountries, @UkrainianCountries, @RussianCountries, @Duration, @Genres, @EnglishGenres, @UkrainianGenres, @RussianGenres, @Poster, @Players);";
                        cmd.Parameters.AddWithValue("DateAdded", DateTime.Now);
                        cmd.Parameters.AddWithValue("DateUpdated", DateTime.Now);
                        cmd.Parameters.AddWithValue("Language", (int)film.Language);
                        cmd.Parameters.AddWithValue("Title", film.Title ?? "");
                        cmd.Parameters.AddWithValue("LowercaseTitle", film.LowercaseTitle ?? "");
                        cmd.Parameters.AddWithValue("OriginalTitle", film.OriginalTitle ?? "");
                        cmd.Parameters.AddWithValue("EnglishTitle", film.EnglishTitle ?? "");
                        cmd.Parameters.AddWithValue("UkrainianTitle", film.UkrainianTitle ?? "");
                        cmd.Parameters.AddWithValue("RussianTitle", film.RussianTitle ?? "");
                        cmd.Parameters.AddWithValue("Description", film.Description ?? "");
                        cmd.Parameters.AddWithValue("OriginalDescription", film.OriginalDescription ?? "");
                        cmd.Parameters.AddWithValue("EnglishDescription", film.EnglishDescription ?? "");
                        cmd.Parameters.AddWithValue("UkrainianDescription", film.UkrainianDescription ?? "");
                        cmd.Parameters.AddWithValue("RussianDescription", film.RussianDescription ?? "");
                        cmd.Parameters.AddWithValue("Year", film.Year);
                        cmd.Parameters.AddWithValue("Countries", film.Countries);
                        cmd.Parameters.AddWithValue("EnglishCountries", film.EnglishCountries!);
                        cmd.Parameters.AddWithValue("UkrainianCountries", film.UkrainianCountries!);
                        cmd.Parameters.AddWithValue("RussianCountries", film.RussianCountries!);
                        cmd.Parameters.AddWithValue("Duration", film.Duration);
                        cmd.Parameters.AddWithValue("Genres", film.Genres);
                        cmd.Parameters.AddWithValue("EnglishGenres", film.EnglishGenres);
                        cmd.Parameters.AddWithValue("UkrainianGenres", film.UkrainianGenres);
                        cmd.Parameters.AddWithValue("RussianGenres", film.RussianGenres);
                        cmd.Parameters.AddWithValue("Poster", film.Poster ?? "");
                        cmd.Parameters.AddWithValue("Players", film.Players);

                        cmd.ExecuteNonQuery();

                        Logger.Debug($"Added {film.Title}");

                        return film;
                    }
                }
                catch (Exception ex)
                {
                    if (ex.Message.ToLower().Contains("unique"))
                    {
                        try
                        {
                            int? existFilmId = null;
                            using (var cmd = new NpgsqlCommand())
                            {
                                cmd.Connection = _connection;
                                cmd.CommandText = "SELECT Id, Players FROM Film WHERE Title=@Name;";
                                cmd.Parameters.AddWithValue("Name", film.Title ?? "");

                                using (var reader = cmd.ExecuteReader())
                                {
                                    while (reader.Read())
                                    {
                                        existFilmId = reader.GetInt32(0);
                                        var existFilmPlayers = reader.GetFieldValue<string[]>(1).ToList();

                                        foreach (var p in existFilmPlayers!)
                                        {
                                            if (film!.Players!.Contains(p) == false)
                                            {
                                                film.Players.Add(p);
                                            }
                                        }
                                    }
                                }
                            }
                            var updateCommand = new NpgsqlCommand("UPDATE Film SET Players=@Players, DateUpdated=@DateUpdated WHERE Id=@Id;");
                            updateCommand.Connection = _connection;
                            updateCommand.Parameters.AddWithValue("Players", film.Players);
                            updateCommand.Parameters.AddWithValue("DateUpdated", DateTime.Now);
                            updateCommand.Parameters.AddWithValue("Id", existFilmId!);
                            updateCommand.ExecuteNonQuery();

                            Logger.Debug($"Updated {film.Title}");

                            return film;
                        }
                        catch (Exception e)
                        {
                            Logger.Error($"[{e.GetLine()}] [{e.Source}]\n\t{e.Message}");

                            return null;
                        }
                    }
                    return null;
                }
            }
            catch (Exception e)
            {
                if (!e.ToString().Contains("already"))
                    Logger.Error($"[{e.GetLine()}] [{e.Source}]\n\t{e.Message}");
                
                return null;
            }
        }

        ~DatabaseService()
        {
            _connection.Close();
        }
    }
}

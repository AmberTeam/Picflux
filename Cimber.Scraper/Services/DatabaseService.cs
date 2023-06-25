using Cimber.Scraper.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Collections.Generic;
using System;
using System.Text;
using Cimber.Scraper.Scrapers;

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

            try
            {
                var commandString = "CREATE TABLE IF NOT EXISTS Film (Id SERIAL PRIMARY KEY,_Id UUID,DateAdded TIMESTAMP,DateUpdated TIMESTAMP,Language INT,Title TEXT,EnglishTitle TEXT,UkrainianTitle TEXT,RussianTitle TEXT,LowercaseTitle TEXT,LowercaseEnglishTitle TEXT,LowercaseUkrainianTitle TEXT,LowercaseRussianTitle TEXT,Description TEXT,Year INT,Countries TEXT[],Duration INTERVAL,Genres TEXT[],Poster TEXT NOT NULL,Players TEXT[] NOT NULL);";
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
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'А' && c <= 'Я') || (c >= 'а' && c <= 'я') || (c >= 'a' && c <= 'z') || c == 'є' || c == 'і' || c == 'ї')
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }

        private string removeSpecialCharactersLeaveSpaces(string str)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'А' && c <= 'Я') || (c >= 'а' && c <= 'я') || (c >= 'a' && c <= 'z') || c == 'є' || c == 'і' || c == 'ї' || c == ' ')
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
                if (film == null || film.Players == null)
                    return null;

                film.Players = film.Players.Where(p => p.Length > 7).ToList();
                film.Players = film.Players.Where(p => !film.Players.Contains(p.Split("/")[0])).ToList();
                film.Players.Select(p => p.Replace("https//", "https://"));

                if (film.Players.Count < 1)
                    return null;

                film.Description = film.Description?.Replace("'", "");
                film.Description = film.Description?.Replace("© ГидОнлайн", "");
                film.Description = film.Description?.Replace("&laquo;", "«").Replace("&raquo;", "»");
                film.LowercaseTitle = removeSpecialCharacters(film.Title?.ToLower()!);
                film.Genres = film.Genres.Select(g => g?.ToLower()).ToList();

                using (var cmd = new NpgsqlCommand())
                {
                    cmd.Connection = _connection;
                    cmd.CommandText = "SELECT Id, Players FROM Film WHERE Title=@Title AND Year=@Year;";
                    cmd.Parameters.AddWithValue("Title", film.Title ?? "");
                    cmd.Parameters.AddWithValue("Year", film.Year);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            int existingFilmId = reader.GetInt32(0);
                            var existingFilmPlayers = reader.GetFieldValue<string[]>(1).ToList();

                            foreach (var p in existingFilmPlayers)
                            {
                                if (!film.Players.Contains(p))
                                {
                                    film.Players.Add(p);
                                }
                            }

                            var updateCommand = new NpgsqlCommand("UPDATE Film SET Players=@Players, DateUpdated=@DateUpdated WHERE Id=@Id;");
                            updateCommand.Connection = _connection;
                            updateCommand.Parameters.AddWithValue("Players", film.Players);
                            updateCommand.Parameters.AddWithValue("DateUpdated", DateTime.Now);
                            updateCommand.Parameters.AddWithValue("Id", existingFilmId);
                            updateCommand.ExecuteNonQuery();

                            Logger.Debug($"Updated {film.Title}");

                            return film;
                        }
                    }
                }

                using (var insertCommand = new NpgsqlCommand())
                {
                    insertCommand.Connection = _connection;
                    insertCommand.CommandText = "INSERT INTO Film(_ID, DateAdded, DateUpdated, Language, Title, EnglishTitle, UkrainianTitle, RussianTitle, LowercaseTitle, LowercaseEnglishTitle, LowercaseUkrainianTitle, LowercaseRussianTitle, Description, Year, Countries, Duration, Genres, Poster, Players) " +
                                                "VALUES(@_Id, @DateAdded, @DateUpdated, @Language, @Title, @EnglishTitle, @UkrainianTitle, @RussianTitle, @LowercaseTitle, @LowercaseEnglishTitle, @LowercaseUkrainianTitle, @LowercaseRussianTitle, @Description, @Year, @Countries, @Duration, @Genres, @Poster, @Players);";
                    insertCommand.Parameters.AddWithValue("_Id", film._Id);
                    insertCommand.Parameters.AddWithValue("DateAdded", DateTime.Now);
                    insertCommand.Parameters.AddWithValue("DateUpdated", DateTime.Now);
                    insertCommand.Parameters.AddWithValue("Language", (int)film.Language);
                    insertCommand.Parameters.AddWithValue("Title", film.Title ?? "");
                    insertCommand.Parameters.AddWithValue("EnglishTitle", film.EnglishTitle ?? "");
                    insertCommand.Parameters.AddWithValue("UkrainianTitle", film.UkrainianTitle ?? "");
                    insertCommand.Parameters.AddWithValue("RussianTitle", film.RussianTitle ?? "");
                    insertCommand.Parameters.AddWithValue("LowercaseTitle", film.Title ?? "");
                    insertCommand.Parameters.AddWithValue("LowercaseEnglishTitle", film.EnglishTitle ?? "");
                    insertCommand.Parameters.AddWithValue("LowercaseUkrainianTitle", film.UkrainianTitle ?? "");
                    insertCommand.Parameters.AddWithValue("LowercaseRussianTitle", film.RussianTitle ?? "");
                    insertCommand.Parameters.AddWithValue("Description", film.Description ?? "");
                    insertCommand.Parameters.AddWithValue("Year", film.Year);
                    insertCommand.Parameters.AddWithValue("Countries", film.Countries);
                    insertCommand.Parameters.AddWithValue("Duration", film.Duration);
                    insertCommand.Parameters.AddWithValue("Genres", film.Genres);
                    insertCommand.Parameters.AddWithValue("Poster", film.Poster ?? "");
                    insertCommand.Parameters.AddWithValue("Players", film.Players);

                    insertCommand.ExecuteNonQuery();

                    Logger.Debug($"Added {film.Title}");

                    return film;
                }
            }
            catch (Npgsql.PostgresException ex)
            {
                if (ex.SqlState == "23505") // Unique violation error
                {
                    Logger.Error($"Film with the same title and year already exists in the database.");
                    return null;
                }

                Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                return null;
            }
            catch (Exception e)
            {
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

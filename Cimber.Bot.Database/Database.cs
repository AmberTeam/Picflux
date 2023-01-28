using Cimber.Bot.Extensions;
using Cimber.Bot.Models;
using System.Data.SQLite;

namespace Cimber.Bot.Database
{
    public class Database
    {
        private readonly SQLiteConnection _connection;

        public Database()
        {
            string connectionString = "URI=file:CimberBugs.db";

            _connection = new SQLiteConnection(connectionString);
            _connection.Open();

            try
            {
                var commandString =
                    "CREATE TABLE Bug ("
                    + "Id INTEGER PRIMARY KEY,"
                    + "Description TEXT    NOT NULL,"
                    + "Type INTEGER,"
                    + "FromUser INTEGER,"
                    + "Os INTEGER,"
                    + "Path TEXT)";
                var command = new SQLiteCommand(commandString, _connection);
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                if (!e.Message.Contains("already"))
                    Logger.Logger.Error($"[{e.GetLine()}] [{e.Source}]\n\t{e.Message}");
            }
        }


        ~Database()
        {
            _connection.Close();
        }

        /// <summary>
        /// Adds bug to db
        /// </summary>
        /// <param name="bug"></param>
        /// <returns>Has bug added to db</returns>
        public bool AddBug(Bug bug)
        {
            try
            {
                string commandString;

                if (bug.Path == null)
                {
                    commandString = $"INSERT INTO Bug (Description, Type, FromUser, Os) VALUES ('{bug.Description}', {(int)bug.Type}, {bug.FromUser}, {(int)bug!.Os!});";
                }
                else
                {
                    commandString = $"INSERT INTO Bug (Description, Type, FromUser, Os, Path) VALUES ('{bug.Description}', {(int)bug.Type}, {bug.FromUser}, {(int)bug!.Os!}, '{bug.Path}');";
                }
                var command = new SQLiteCommand(commandString, _connection);
                command.ExecuteNonQuery();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public IEnumerable<Bug> GetBugs()
        {
            var getCommandString = $@"SELECT * FROM Bug;";
            var reader = new SQLiteCommand(getCommandString, _connection).ExecuteReader();

            while (reader.Read())
            {
                Bug? bug;

                try
                {
                    int id = reader.GetInt32(0);
                    string description = reader.GetString(1);
                    int? type = reader.GetInt32(2);
                    long? fromUser = reader.GetInt32(3);
                    int? os = reader.GetInt32(4);

                    string? path;

                    try
                    {
                        path = reader.GetString(5);
                    }
                    catch
                    {
                        path = "NO PATH";
                    }
                    bug = new Bug() { Id = id, FromUser = fromUser, Description = description, Type = (Models.Type)type, Os = (Os)os, Path = path };
                }
                catch (Exception ex)
                {
                    Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                    bug = null;
                }

                if (bug != null)
                {
                    yield return bug;
                }
            }
        }

        public Bug? DeleteBug(int id)
        {
            try
            {
                // Getting bug 
                var getCommandString = $@"SELECT * FROM Bug WHERE Id = {id};";
                var reader = new SQLiteCommand(getCommandString, _connection).ExecuteReader();


                Bug? bug = null;

                while (reader.Read())
                {
                    try
                    {
                        string description = reader.GetString(1);
                        int? type = reader.GetInt32(2);
                        long? fromUser = reader.GetInt32(3);
                        var path = reader.GetValue(4);

                        bug = new Bug() { Id = id, FromUser = fromUser, Description = description, Type = (Models.Type)type, Path = path.ToString() };
                    }
                    catch (Exception ex)
                    {
                        Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                        bug = null;
                    }
                }

                // Deleting bug
                var commandString = $"DELETE FROM Bug WHERE Id = {id}";
                var command = new SQLiteCommand(commandString, _connection);

                command.ExecuteNonQuery();

                return bug;
            }
            catch (Exception e)
            {
                Logger.Logger.Error($"[{e.GetLine()}] [{e.Source}]\n\t{e.Message}");
                return null;
            }
        }
    }
}

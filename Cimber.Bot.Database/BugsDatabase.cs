using Cimber.Bot.Models;
using System.Data.SQLite;
using System.Diagnostics;

namespace Cimber.Bot.Database
{
    public class BugsDatabase
    {
        private readonly SQLiteConnection _connection;

        public BugsDatabase()
        {
            string connectionString = "URI=file:CimberBugs.db";

            _connection = new SQLiteConnection(connectionString);
            _connection.Open();

            try
            {
                var commandString =
                    "CREATE TABLE Bug ("
                    + "Id INTEGER PRIMARY KEY,"
                    + "Title TEXT    NOT NULL,"
                    + "Description TEXT    NOT NULL,"
                    + "Type INTEGER,"
                    + "FromUserId INTEGER,"
                    + "FromUserName TEXT,"
                    + "Os INTEGER,"
                    + "IsVerified BOOLEAN DEFAULT 0,"
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


        ~BugsDatabase()
        {
            _connection.Close();
        }

        /// <summary>
        /// Adds bug to db
        /// </summary>
        /// <param name="bug"></param>
        /// <returns>Bug Id</returns>
        public int AddBug(Bug bug)
        {
            try
            {
                string commandString;

                if (bug.Path == null)
                {
                    commandString = $"INSERT INTO Bug (Title, Description, Type, FromUserId, FromUserName, Os, IsVerified) VALUES ('{bug.Title}', '{bug.Description}', {(int)bug.Type}, {bug.FromUserId}, '{bug.FromUsername}', {(int)bug!.Os!}, {false});";
                }
                else
                {
                    commandString = $"INSERT INTO Bug (Title, Description, Type, FromUserId, FromUserName, Os, IsVerified, Path) VALUES ('{bug.Title}', '{bug.Description}', {(int)bug.Type}, {bug.FromUserId}, '{bug.FromUsername}', {(int)bug!.Os!}, {false}, '{bug.Path}');";
                }
                var command = new SQLiteCommand(commandString, _connection);
                return command.ExecuteNonQuery();
            }
            catch
            {
                return 0;
            }
        }

        public IEnumerable<Bug> GetBugs()
        {
            var getCommandString = $@"SELECT * FROM Bug WHERE IsVerified = {true};";
            var reader = new SQLiteCommand(getCommandString, _connection).ExecuteReader();

            while (reader.Read())
            {
                Bug? bug;

                try
                {
                    int id = reader.GetInt32(0);
                    string title = reader.GetString(1);
                    string description = reader.GetString(2);
                    int? type = reader.GetInt32(3);
                    long? fromUserId = reader.GetInt32(4);
                    string? fromUserName = reader.GetString(5);
                    int? os = reader.GetInt32(6);

                    string? path;

                    try
                    {
                        path = reader.GetString(8);
                    }
                    catch
                    {
                        path = "NO PATH";
                    }
                    bug = new Bug() { Id = id, FromUserId = fromUserId, FromUsername = fromUserName, Title = title, Description = description, Type = (Models.Type)type, Os = (Os)os, Path = path };
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

        public Bug? GetBug(int id)
        {
            var getCommandString = $@"SELECT * FROM Bug WHERE id = {id};";
            var reader = new SQLiteCommand(getCommandString, _connection).ExecuteReader();

            while (reader.Read())
            {
                try
                {
                    string title = reader.GetString(1);
                    string description = reader.GetString(2);
                    int? type = reader.GetInt32(3);
                    long? fromUserId = reader.GetInt32(4);
                    string? fromUserName = reader.GetString(5);
                    int? os = reader.GetInt32(6);

                    string? path;

                    try
                    {
                        path = reader.GetString(8);
                    }
                    catch
                    {
                        path = "NO PATH";
                    }
                    var bug = new Bug() { Id = id, FromUserId = fromUserId, FromUsername = fromUserName, Title = title, Description = description, Type = (Models.Type)type, Os = (Os)os, Path = path };
                    return bug;
                }
                catch (Exception ex)
                {
                    Logger.Logger.Error($"[{ex.GetLine()}] [{ex.Source}]\n\t{ex.Message}");
                    return null;
                }
            }
            return null;
        }

        public void Verify(int id)
        {
            try
            {
                string commandString = $"UPDATE Bug SET IsVerified={true} WHERE id={id};";

                var command = new SQLiteCommand(commandString, _connection);
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                Logger.Logger.Error($"[{e.GetLine()}] [{e.Source}]\n\t{e.Message}");
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
                        string title = reader.GetString(1);
                        string description = reader.GetString(2);
                        int? type = reader.GetInt32(3);
                        long? fromUserId = reader.GetInt32(4);
                        string? fromUserName = reader.GetString(5);
                        int? os = reader.GetInt32(6);

                        string? path;

                        try
                        {
                            path = reader.GetString(8);
                        }
                        catch
                        {
                            path = "NO PATH";
                        }

                        bug = new Bug() { Id = id, FromUserId = fromUserId, FromUsername = fromUserName, Title = title, Description = description, Type = (Models.Type)type, Os = (Os)os, Path = path };
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

    internal static class ExceptionExtensions
    {
        internal static int GetLine(this Exception exception)
        {
            StackTrace stackTrace = new StackTrace(exception, true);
            StackFrame? frame = stackTrace.GetFrame(0);
            int line = frame!.GetFileLineNumber();

            return line;
        }
    }
}

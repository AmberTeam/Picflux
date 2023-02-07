using Cimber.Bot.Models;
using System.Data.SQLite;
using System.Diagnostics;

namespace Cimber.Bot.Database
{
    public class UsersDatabase
    {
        private readonly SQLiteConnection _connection;

        public UsersDatabase()
        {
            string connectionString = "URI=file:CimberUsers.db";

            _connection = new SQLiteConnection(connectionString);
            _connection.Open();

            try
            {
                var commandString =
                    "CREATE TABLE User ("
                    + "Id INTEGER PRIMARY KEY,"
                    + "Chat INTEGER UNIQUE,"
                    + "Firstname TEXT,"
                    + "Lastname TEXT,"
                    + "Username TEXT,"
                    + "BugTitle TEXT,"
                    + "BugDescription TEXT,"
                    + "Os INTEGER,"
                    + "State INTEGER,"
                    + "InterfaceLanguage INTEGER,"
                    + "IsAdmin BOOLEAN,"
                    + "CurrentMessageId INTEGER,"
                    + "CurrentBugId INTEGER)";
                var command = new SQLiteCommand(commandString, _connection);
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                if (!e.Message.ToLower().Contains("already"))
                    Logger.Logger.Error($"[{e.GetLine()}] [{e.Source}]\n\t{e.Message}");
            }
        }

        ~UsersDatabase()
        {
            _connection.Close();
        }

        public void AddUser(User user)
        {
            try
            {
                string commandString = $"INSERT INTO User (" +
                    $"Chat, Firstname, Lastname, Username, BugTitle, BugDescription, Os, State, InterfaceLanguage, IsAdmin, CurrentMessageId, CurrentBugId) " +
                    $"VALUES ({user.ChatId}, '{user.Firstname}', '{user.Lastname}', '{user.Username}', '{user.BugTitle}', '{user.BugDescription}', {(int)user.Os}, {(int)user.State}, {(int)user.InterfaceLanguage}, {user.IsAdmin}, {user.CurrentMessageId}, {user.CurrentBugId});";

                var command = new SQLiteCommand(commandString, _connection);
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                if (e.Message.ToLower().Contains("unique") == false)
                    Logger.Logger.Error($"[{e.GetLine()}] [{e.Source}]\n\t{e.Message}");
            }
        }

        public void UpdateUser(User user)
        {
            try
            {
                string commandString = $"UPDATE User " +
                    $"SET Firstname = '{user.Firstname}'," +
                    $"Lastname = '{user.Lastname}'," +
                    $"Username = '{user.Username}'," +
                    $"BugTitle = '{user.BugTitle}'," +
                    $"BugDescription = '{user.BugDescription}'," +
                    $"Os = {(int)user.Os}," +
                    $"State = {(int)user.State}," +
                    $"InterfaceLanguage = {(int) user.InterfaceLanguage}," +
                    $"IsAdmin = {user.IsAdmin}," +
                    $"CurrentMessageId = {user.CurrentMessageId}," +
                    $"CurrentBugId = {user.CurrentBugId} " +
                    $"WHERE Chat={user.ChatId};";

                var command = new SQLiteCommand(commandString, _connection);
                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                Logger.Logger.Error($"[{e.GetLine()}] [{e.Source}]\n\t{e.Message}");
            }
        }

        public User? GetUser(long chatId)
        {
            try
            {
                var commandString = $"SELECT * FROM User WHERE Chat = {chatId}";
                var reader = new SQLiteCommand(commandString, _connection).ExecuteReader();

                while (reader.Read())
                {
                    long chat = reader.GetInt64(1);
                    string firstname = reader.GetString(2);
                    string lastname = reader.GetString(3);
                    string username = reader.GetString(4);
                    string bugTitle = reader.GetString(5);
                    string bugDescription = reader.GetString(6);
                    Os os = (Os)reader.GetInt32(7);
                    State state = (State)reader.GetInt32(8);
                    Language interfaceLanguage = (Language)reader.GetInt32(9);
                    bool isAdmin = reader.GetBoolean(10);
                    int currentMessageId = reader.GetInt32(11);
                    int currentBugId = reader.GetInt32(12);

                    var user = new User()
                    {
                        ChatId = chat,
                        Firstname = firstname,
                        Lastname = lastname,
                        Username = username,
                        BugTitle = bugTitle,
                        BugDescription = bugDescription,
                        Os = os,
                        State = state,
                        InterfaceLanguage = interfaceLanguage,
                        IsAdmin = isAdmin,
                        CurrentMessageId = currentMessageId,
                        CurrentBugId = currentBugId,
                    };

                    return user;
                }
                return null;
            }
            catch (Exception e)
            {
                Logger.Logger.Error($"[{e.GetLine()}] [{e.Source}]\n\t{e.Message}");
                return null;
            }
        }
    }
}

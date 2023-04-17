using System.Diagnostics;

namespace Cimber.Scraper
{
    public static class ExceptionExtensions
    {
        public static int GetLine(this Exception exception)
        {
            StackTrace stackTrace = new StackTrace(exception, true);
            StackFrame? frame = stackTrace.GetFrame(0);
            int line = frame!.GetFileLineNumber();

            return line;
        }
    }
}

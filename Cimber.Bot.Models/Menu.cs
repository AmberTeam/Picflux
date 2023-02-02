namespace Cimber.Bot.Models
{
    public class Menu<T>
    {
        public int MaxCountInPage { get; private set; }
        public int Count { get; private set; }
        public List<List<T>> Pages { get; private set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="maxCountInPage">Max count in 1 page</param>
        /// <param name="objects"></param>
        public Menu(int maxCountInPage, List<T> objects)
        {
            MaxCountInPage = maxCountInPage;

            var pages = new List<List<T>>()
            {
                new List<T>()
            };
            int listIndex = 0;
            for (int i = 0; i < objects.Count(); i++)
            {
                if (i % MaxCountInPage == 0
                    && i != 0)
                {
                    pages.Add(new List<T>());
                    listIndex++;
                }

                pages[listIndex].Add(objects[i]);
            }

            Pages = pages;
            Count = pages.Count;
        }
    }
}

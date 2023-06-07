interface IFiltersHandlers {
  onYearChange: (year: string) => void
  onAddGenre: (genre: string) => void
  onChangeLoadMethod: (loadMethod: string) => void
}

export default IFiltersHandlers
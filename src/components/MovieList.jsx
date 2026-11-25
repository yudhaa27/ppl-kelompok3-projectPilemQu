import ErrorMessage from './ErrorMessage'
import Loading from './Loading'
import MovieCard from './MovieCard'

/**
 * Renders loading, error, empty, or movie grid states consistently across catalog views.
 */
function MovieList({
  movies,
  loading,
  error,
  onRetry,
  loadingMessage,
  emptyMessage = 'No movies available.',
  showFullDate = false,
  onSelectMovie,
}) {
  if (loading) {
    return <Loading message={loadingMessage} />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="status-message">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          showFullDate={showFullDate}
          onSelect={onSelectMovie}
        />
      ))}
    </div>
  )
}

export default MovieList

import MovieCard from './MovieCard'

function MovieList({ movies = [], emptyMessage = 'Tidak ada film yang tersedia.' }) {
  if (!movies.length) {
    return (
      <div className="status-message">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieList

import { getImageUrl } from '../services/tmdb'

function MovieCard({ movie }) {
  const posterUrl = getImageUrl(movie.poster_path, 'w500')
  const releaseYear = movie.release_date?.slice(0, 4) || 'Unknown'
  const rating =
    typeof movie.vote_average === 'number' && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : 'N/A'

  return (
    <article className="movie-card">
      <a href={`#/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-poster">
          {posterUrl ? (
            <img src={posterUrl} alt={movie.title} loading="lazy" />
          ) : (
            <div className="poster-placeholder">No Poster Available</div>
          )}

          <div className="poster-overlay">
            <span className="movie-explore">
              Lihat Detail <span>↗</span>
            </span>
          </div>

          <div className="movie-rating">★ {rating}</div>
        </div>

        <div className="movie-info">
          <h3 title={movie.title}>{movie.title}</h3>
          <div className="movie-meta">
            <span>{releaseYear}</span>
            <span className="meta-dot">•</span>
            <span>Movie</span>
          </div>
        </div>
      </a>
    </article>
  )
}

export default MovieCard

import { getImageUrl } from '../services/tmdb'

export default function MovieCard({
  movie,
  onSelect,
  isSelected = false,
  actionLabel = 'Rekomendasi',
}) {
  if (!movie) return null

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : 'Unknown'
  const rating =
    typeof movie.vote_average === 'number'
      ? movie.vote_average.toFixed(1)
      : '-'
  const posterUrl = getImageUrl(movie.poster_path, 'w500')

  return (
    <article className={`movie-card ${isSelected ? 'selected-card' : ''}`}>
      <div className="movie-poster">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title || 'Movie Poster'}
            loading="lazy"
          />
        ) : (
          <div className="poster-placeholder">
            Tidak Ada Poster
          </div>
        )}

        <div className="poster-overlay">
          <button
            type="button"
            className="movie-explore"
            onClick={() => onSelect && onSelect(movie)}
          >
            {actionLabel} <span>↗</span>
          </button>
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
    </article>
  )
}

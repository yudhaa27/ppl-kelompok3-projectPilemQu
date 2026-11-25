import { getImageUrl } from '../services/tmdb'

/**
 * Formats a TMDB release date either as a full localized Indonesian date or as a 4-digit year.
 */
function formatReleaseDate(dateString, showFullDate) {
  if (!dateString) return showFullDate ? 'Tanggal belum tersedia' : 'Unknown'
  if (!showFullDate) return dateString.slice(0, 4)

  const parsed = new Date(`${dateString}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return dateString

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed)
}

/**
 * Renders an individual movie card with poster fallback, rating badge, and release metadata.
 */
function MovieCard({ movie, showFullDate = false, onSelect }) {
  const posterUrl = getImageUrl(movie.poster_path, 'w500')
  const hasRating =
    typeof movie.vote_average === 'number' && movie.vote_average > 0
  const formattedDate = formatReleaseDate(movie.release_date, showFullDate)

  const handleExplore = (event) => {
    if (!onSelect) return
    event.preventDefault()
    onSelect(movie)
  }

  return (
    <article className="movie-card">
      <a
        href={`#/movie/${movie.id}`}
        className="movie-card-link"
        onClick={handleExplore}
      >
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

          <div className="movie-rating">
            {hasRating ? `★ ${movie.vote_average.toFixed(1)}` : 'TBA'}
          </div>
        </div>

        <div className="movie-info">
          <h3 title={movie.title}>{movie.title}</h3>
          <div className="movie-meta">
            <span>{formattedDate}</span>
            <span className="meta-dot">•</span>
            <span>Movie</span>
          </div>
        </div>
      </a>
    </article>
  )
}

export default MovieCard

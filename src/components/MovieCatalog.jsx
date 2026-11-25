import { useEffect, useState } from 'react'
import MovieList from './MovieList'

const MAX_TMDB_PAGE = 500

/**
 * Formats TMDB date range metadata (minimum - maximum) into a readable Indonesian range.
 */
function formatDateRange(dates) {
  if (!dates?.minimum || !dates?.maximum) return ''

  const formatter = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const minDate = new Date(`${dates.minimum}T00:00:00`)
  const maxDate = new Date(`${dates.maximum}T00:00:00`)

  if (Number.isNaN(minDate.getTime()) || Number.isNaN(maxDate.getTime())) {
    return `${dates.minimum} – ${dates.maximum}`
  }

  return `${formatter.format(minDate)} – ${formatter.format(maxDate)}`
}

/**
 * Shared paginated movie catalog layout used by Now Playing and Upcoming pages.
 */
function MovieCatalog({
  label,
  title,
  description,
  fetcher,
  loadingMessage,
  emptyMessage,
  showFullDate = false,
  onSelectMovie,
}) {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [dateRange, setDateRange] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadToken, setReloadToken] = useState(0)

  useEffect(() => {
    let ignore = false

    fetcher(page)
      .then((data) => {
        if (ignore) return
        setMovies(data.results || [])
        setTotalPages(Math.max(1, Math.min(data.total_pages || 1, MAX_TMDB_PAGE)))
        setDateRange(formatDateRange(data.dates))
      })
      .catch((err) => {
        if (ignore) return
        setError(err.message || 'Gagal memuat daftar film.')
      })
      .finally(() => {
        if (ignore) return
        setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [fetcher, page, reloadToken])

  const changePage = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return
    setLoading(true)
    setError('')
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setReloadToken((prev) => prev + 1)
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="hero-label">
            <span className="gold-dot"></span>
            {label}
          </span>

          <h1>{title}</h1>
          <p className="page-hero-description">{description}</p>

          {(dateRange || (!loading && !error && movies.length > 0)) && (
            <div className="page-hero-meta">
              {dateRange && <span className="page-badge">Periode: {dateRange}</span>}
              {!loading && !error && movies.length > 0 && (
                <span className="page-badge">
                  Halaman {page} dari {totalPages}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <main className="main-content">
        <section className="popular-section">
          <MovieList
            movies={movies}
            loading={loading}
            error={error}
            onRetry={handleRetry}
            loadingMessage={loadingMessage}
            emptyMessage={emptyMessage}
            showFullDate={showFullDate}
            onSelectMovie={onSelectMovie}
          />

          {!loading && !error && totalPages > 1 && (
            <nav className="pagination" aria-label="Pagination">
              <button
                type="button"
                className="button-secondary pagination-button"
                onClick={() => changePage(page - 1)}
                disabled={page <= 1}
              >
                ← Sebelumnya
              </button>

              <span className="pagination-info">
                Halaman <strong>{page}</strong> dari {totalPages}
              </span>

              <button
                type="button"
                className="button-secondary pagination-button"
                onClick={() => changePage(page + 1)}
                disabled={page >= totalPages}
              >
                Berikutnya →
              </button>
            </nav>
          )}
        </section>
      </main>
    </>
  )
}

export default MovieCatalog

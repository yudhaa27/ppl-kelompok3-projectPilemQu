import { useEffect, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { getImageUrl, getMovieDetail } from '../services/tmdb'

function formatReleaseDate(dateString) {
  if (!dateString) return 'Belum tersedia'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function formatRuntime(minutes) {
  if (!minutes || minutes <= 0) return null
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (hours === 0) return `${remainingMinutes}m`
  if (remainingMinutes === 0) return `${hours}j`
  return `${hours}j ${remainingMinutes}m`
}

function MovieDetail({ movieId, onBack }) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    getMovieDetail(movieId, { signal: controller.signal })
      .then((data) => {
        setMovie(data)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Gagal memuat detail film.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [movieId, retryCount])

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setRetryCount((count) => count + 1)
  }

  if (loading) {
    return (
      <main className="main-content detail-page">
        <Loading message="Memuat detail film..." />
      </main>
    )
  }

  if (error || !movie) {
    return (
      <main className="main-content detail-page">
        <ErrorMessage
          message={error || 'Data detail film tidak tersedia.'}
          onRetry={handleRetry}
        >
          <a href="#/" className="button-primary">
            Kembali ke Beranda
          </a>
        </ErrorMessage>
      </main>
    )
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'w1280')
  const posterUrl = getImageUrl(movie.poster_path, 'w500')
  const releaseYear = movie.release_date?.slice(0, 4) || 'Unknown'
  const runtimeLabel = formatRuntime(movie.runtime)
  const ratingValue =
    typeof movie.vote_average === 'number' && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : 'N/A'
  const genres = Array.isArray(movie.genres) ? movie.genres : []
  const productionCountries = Array.isArray(movie.production_countries)
    ? movie.production_countries.map((country) => country.name).join(', ')
    : ''

  return (
    <div className="detail-page">
      <section
        className={`detail-hero ${backdropUrl ? '' : 'hero-fallback'}`}
        style={
          backdropUrl
            ? {
                backgroundImage: `linear-gradient(90deg, #111318 0%, rgba(17,19,24,0.92) 42%, rgba(17,19,24,0.62) 100%), linear-gradient(0deg, #111318 0%, rgba(17,19,24,0.25) 45%), url('${backdropUrl}')`,
              }
            : undefined
        }
      >
        <div className="detail-hero-inner">
          <button
            type="button"
            className="detail-back-button"
            onClick={onBack}
          >
            ← Kembali
          </button>

          <div className="detail-hero-grid">
            <div className="detail-poster-wrap">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="detail-poster"
                />
              ) : (
                <div className="poster-placeholder detail-poster-fallback">
                  No Poster Available
                </div>
              )}
            </div>

            <div className="detail-summary">
              <span className="hero-label">
                <span className="gold-dot"></span>
                MOVIE DETAIL
              </span>

              <h1>{movie.title}</h1>

              {movie.original_title &&
                movie.original_title !== movie.title && (
                  <p className="detail-original-title">
                    Judul Asli: {movie.original_title}
                  </p>
                )}

              {movie.tagline && (
                <p className="detail-tagline">&ldquo;{movie.tagline}&rdquo;</p>
              )}

              <div className="hero-meta detail-meta">
                <span className="rating">
                  ★ {ratingValue}
                  {typeof movie.vote_count === 'number' &&
                  movie.vote_count > 0
                    ? ` (${movie.vote_count.toLocaleString('id-ID')} suara)`
                    : ''}
                </span>
                <span>{releaseYear}</span>
                {runtimeLabel && <span>{runtimeLabel}</span>}
              </div>

              {genres.length > 0 && (
                <div className="detail-genres" aria-label="Genre Film">
                  {genres.map((genre) => (
                    <span key={genre.id} className="genre-pill">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="detail-synopsis-block">
                <h2>Sinopsis</h2>
                <p>
                  {movie.overview ||
                    'Sinopsis belum tersedia untuk film ini.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="main-content detail-body">
        <section className="detail-info-section" aria-label="Informasi Tambahan">
          <div className="section-heading">
            <div>
              <span className="section-label">INFORMASI FILM</span>
              <h2>Detail Produksi</h2>
            </div>
          </div>

          <div className="detail-facts-grid">
            <div className="detail-fact-card">
              <span className="detail-fact-label">Tanggal Rilis</span>
              <strong>{formatReleaseDate(movie.release_date)}</strong>
            </div>

            <div className="detail-fact-card">
              <span className="detail-fact-label">Status</span>
              <strong>{movie.status || 'Tidak diketahui'}</strong>
            </div>

            <div className="detail-fact-card">
              <span className="detail-fact-label">Bahasa Asli</span>
              <strong>
                {movie.original_language
                  ? movie.original_language.toUpperCase()
                  : '-'}
              </strong>
            </div>

            <div className="detail-fact-card">
              <span className="detail-fact-label">Durasi</span>
              <strong>{runtimeLabel || 'Tidak tersedia'}</strong>
            </div>

            {productionCountries && (
              <div className="detail-fact-card detail-fact-wide">
                <span className="detail-fact-label">Negara Produksi</span>
                <strong>{productionCountries}</strong>
              </div>
            )}
          </div>
        </section>

        {/* Extension point untuk fitur Recommendations (FR-08 / Developer 4) */}
        <section
          className="detail-recommendations-slot"
          id="recommendations"
          data-movie-id={movie.id}
        >
          <div className="section-heading">
            <div>
              <span className="section-label">DISCOVERY</span>
              <h2>Rekomendasi Film</h2>
              <p>
                Bagian ini siap diintegrasikan dengan daftar rekomendasi film
                terkait.
              </p>
            </div>
            <a href="#/search" className="view-all">
              Cari Film Lain <span>→</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default MovieDetail

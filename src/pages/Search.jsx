import { useEffect, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import MovieList from '../components/MovieList'
import { searchMovies } from '../services/tmdb'

const QUICK_SUGGESTIONS = [
  'Inception',
  'Interstellar',
  'Spider-Man',
  'Parasite',
]

function SearchResults({ query, page, onPageChange, onReset, onRetry }) {
  const [movies, setMovies] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    searchMovies(query, page, { signal: controller.signal })
      .then((data) => {
        setMovies(data.results || [])
        setTotalResults(data.total_results || 0)
        setTotalPages(Math.min(data.total_pages || 1, 500))
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Gagal memuat hasil pencarian film.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [query, page])

  if (loading) {
    return <Loading message={`Mencari film "${query}"...`} />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />
  }

  if (!movies.length) {
    return (
      <div className="empty-state-box">
        <span className="section-label">TIDAK DITEMUKAN</span>
        <h3>Tidak ada hasil untuk &ldquo;{query}&rdquo;</h3>
        <p>
          Coba periksa ejaan judul atau gunakan kata kunci lain yang lebih
          umum.
        </p>
        <button type="button" className="button-secondary" onClick={onReset}>
          Reset Pencarian
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="search-summary">
        <p>
          Menampilkan <strong>{movies.length}</strong> dari{' '}
          <strong>{totalResults.toLocaleString('id-ID')}</strong> hasil untuk{' '}
          <span>&ldquo;{query}&rdquo;</span>
        </p>
      </div>

      <MovieList movies={movies} />

      {totalPages > 1 && (
        <nav className="pagination" aria-label="Navigasi Halaman Pencarian">
          <button
            type="button"
            className="button-secondary pagination-btn"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            ← Sebelumnya
          </button>

          <span className="pagination-info">
            Halaman <strong>{page}</strong> dari <strong>{totalPages}</strong>
          </span>

          <button
            type="button"
            className="button-secondary pagination-btn"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            Berikutnya →
          </button>
        </nav>
      )}
    </>
  )
}

function Search({ query = '', page = 1, onSearch }) {
  const [inputValue, setInputValue] = useState(query)
  const [validationError, setValidationError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  const trimmedActiveQuery = query.trim()

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = inputValue.trim()

    if (!trimmed) {
      setValidationError(
        'Masukkan judul film terlebih dahulu untuk memulai pencarian.',
      )
      return
    }

    setValidationError('')
    onSearch(trimmed, 1)
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
    if (validationError) {
      setValidationError('')
    }
  }

  const handleClear = () => {
    setInputValue('')
    setValidationError('')
    if (trimmedActiveQuery) {
      onSearch('', 1)
    }
  }

  const handlePageChange = (nextPage) => {
    onSearch(trimmedActiveQuery, nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="main-content search-page">
      <section className="search-header">
        <span className="section-label">SEARCH MOVIES</span>
        <h1>Temukan Film Favoritmu</h1>
        <p>
          Cari judul film dari katalog TMDB dan lihat informasi detailnya.
        </p>

        <form className="search-form" onSubmit={handleSubmit} noValidate>
          <div className="search-input-wrap">
            <span className="search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Cari judul film, misalnya: Inception, Interstellar..."
              aria-label="Cari judul film"
              value={inputValue}
              onChange={handleInputChange}
            />
            {inputValue && (
              <button
                type="button"
                className="search-clear"
                aria-label="Bersihkan kata kunci"
                onClick={handleClear}
              >
                ×
              </button>
            )}
          </div>

          <button type="submit" className="button-primary search-submit">
            Cari <span>→</span>
          </button>
        </form>

        {validationError && (
          <p className="search-validation" role="alert">
            {validationError}
          </p>
        )}
      </section>

      <section className="search-results-section">
        {trimmedActiveQuery ? (
          <SearchResults
            key={`${trimmedActiveQuery}-${page}-${retryCount}`}
            query={trimmedActiveQuery}
            page={page}
            onPageChange={handlePageChange}
            onReset={handleClear}
            onRetry={() => setRetryCount((count) => count + 1)}
          />
        ) : (
          <div className="search-idle-box">
            <span className="section-label">MULAI MENJELAJAH</span>
            <h2>Ketik judul film pada kolom pencarian di atas</h2>
            <p>
              Atau coba salah satu pencarian cepat berikut untuk langsung
              melihat hasil katalog:
            </p>
            <div className="suggestion-chips">
              {QUICK_SUGGESTIONS.map((title) => (
                <button
                  key={title}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => {
                    setInputValue(title)
                    setValidationError('')
                    onSearch(title, 1)
                  }}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default Search

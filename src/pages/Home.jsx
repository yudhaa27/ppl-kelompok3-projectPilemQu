import { useEffect, useRef, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import MovieList from '../components/MovieList'
import {
  discoverMovies,
  getGenres,
  getImageUrl,
  getPopularMovies,
} from '../services/tmdb'

const YEAR_OPTIONS = [null, 2026, 2025, 2024, 2023, 2022]

function Home() {
  const [featuredMovies, setFeaturedMovies] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [popularMovies, setPopularMovies] = useState([])
  const [discoverList, setDiscoverList] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const genreScrollRef = useRef(null)
  const yearScrollRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()

    Promise.all([
      getGenres({ signal: controller.signal }),
      getPopularMovies(1, { signal: controller.signal }),
    ])
      .then(([genreData, popularData]) => {
        setGenres(genreData.genres || [])
        const popularResults = popularData.results || []
        setFeaturedMovies(popularResults.slice(0, 4))
        setPopularMovies(popularResults.slice(4, 8))
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Gagal memuat film.')
        }
      })

    return () => controller.abort()
  }, [retryCount])

  useEffect(() => {
    const controller = new AbortController()

    discoverMovies(
      {
        genreId: selectedGenre?.id,
        year: selectedYear,
        page,
      },
      { signal: controller.signal },
    )
      .then((data) => {
        const results = data.results || []
        setTotalPages(Math.min(data.total_pages || 1, 500))

        if (page === 1) {
          setDiscoverList(results.slice(0, 4))
        } else {
          setDiscoverList((prev) => {
            const existingIds = new Set(prev.map((m) => m.id))
            const nextItems = results.filter((m) => !existingIds.has(m.id))
            return [...prev, ...nextItems]
          })
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Gagal memuat daftar film.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
          setLoadingMore(false)
        }
      })

    return () => controller.abort()
  }, [selectedGenre, selectedYear, page, retryCount])

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setRetryCount((count) => count + 1)
  }

  const handleSelectGenre = (genre) => {
    if ((genre?.id ?? null) === (selectedGenre?.id ?? null)) return
    setLoading(true)
    setError('')
    setPage(1)
    setSelectedGenre(genre)
  }

  const handleSelectYear = (year) => {
    if (year === selectedYear) return
    setLoading(true)
    setError('')
    setPage(1)
    setSelectedYear(year)
  }

  const handleShowMore = () => {
    if (loadingMore || page >= totalPages) return
    setLoadingMore(true)
    setPage((prev) => prev + 1)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const trimmed = searchQuery.trim()
    if (!trimmed) {
      window.location.hash = '#/search'
      return
    }
    window.location.hash = `#/search?q=${encodeURIComponent(trimmed)}`
  }

  const scrollRow = (ref, direction) => {
    if (!ref.current) return
    ref.current.scrollBy({ left: direction * 200, behavior: 'smooth' })
  }

  const featuredMovie = featuredMovies[activeSlide] || featuredMovies[0]
  const featuredBackdrop = getImageUrl(
    featuredMovie?.backdrop_path,
    'original',
  )

  return (
    <>
      {featuredMovie ? (
        <section
          className={`hero ${featuredBackdrop ? '' : 'hero-fallback'}`}
          style={
            featuredBackdrop
              ? {
                  backgroundImage: `linear-gradient(90deg, #101114 0%, rgba(16,17,20,0.88) 38%, rgba(16,17,20,0.22) 100%), linear-gradient(0deg, #101114 0%, transparent 40%), url('${featuredBackdrop}')`,
                }
              : undefined
          }
        >
          <div className="hero-content">
            <span className="hero-badge">FEATURED MOVIE</span>

            <h1 className="hero-title-italic">{featuredMovie.title}</h1>

            <div className="hero-meta">
              <span>{featuredMovie.release_date?.slice(0, 4) || 'Unknown'}</span>
              <span>Popular</span>
              <span className="rating">
                ★ {featuredMovie.vote_average?.toFixed(1) || 'N/A'}
              </span>
            </div>

            <p className="hero-description">
              {featuredMovie.overview ||
                'Discover this movie and explore more cinematic stories.'}
            </p>

            <div className="hero-buttons">
              <a
                href={`#/movie/${featuredMovie.id}`}
                className="button-primary"
              >
                ▶ Movie Details
              </a>

              <a href="#/top-rated" className="button-secondary">
                Top Rated
              </a>
            </div>
          </div>

          {featuredMovies.length > 1 && (
            <div className="hero-dots" role="tablist" aria-label="Featured slides">
              {featuredMovies.map((movie, index) => (
                <button
                  key={movie.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeSlide}
                  aria-label={`Tampilkan ${movie.title}`}
                  className={`hero-dot ${index === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="hero hero-fallback">
          <div className="hero-content">
            <span className="hero-badge">PILEMQU MOVIE DISCOVERY</span>
            <h1 className="hero-title-italic">Discover Cinema</h1>
            <p className="hero-description">
              Explore movies, find new stories and discover your next favorite.
            </p>
            <div className="hero-buttons">
              <a href="#/search" className="button-primary">
                Cari Film →
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="filter-strip" aria-label="Filter Genre dan Tahun">
        <div className="filter-strip-grid">
          <div className="filter-group">
            <span className="filter-strip-label">CHOOSE GENRE :</span>
            <div className="filter-controls">
              <button
                type="button"
                className="filter-scroll-btn"
                onClick={() => scrollRow(genreScrollRef, -1)}
                aria-label="Geser genre ke kiri"
              >
                ←
              </button>

              <div className="filter-strip-list" ref={genreScrollRef}>
                <button
                  type="button"
                  className={`filter-tab ${selectedGenre === null ? 'active' : ''}`}
                  onClick={() => handleSelectGenre(null)}
                >
                  All
                </button>
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    className={`filter-tab ${
                      selectedGenre?.id === genre.id ? 'active' : ''
                    }`}
                    onClick={() => handleSelectGenre(genre)}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="filter-scroll-btn"
                onClick={() => scrollRow(genreScrollRef, 1)}
                aria-label="Geser genre ke kanan"
              >
                →
              </button>
            </div>
          </div>

          <span className="filter-divider" aria-hidden="true"></span>

          <div className="filter-group">
            <span className="filter-strip-label">AVAILABLE YEAR :</span>
            <div className="filter-controls">
              <button
                type="button"
                className="filter-scroll-btn"
                onClick={() => scrollRow(yearScrollRef, -1)}
                aria-label="Geser tahun ke kiri"
              >
                ←
              </button>

              <div className="filter-strip-list" ref={yearScrollRef}>
                {YEAR_OPTIONS.map((year) => (
                  <button
                    key={year ?? 'all'}
                    type="button"
                    className={`filter-tab ${selectedYear === year ? 'active' : ''}`}
                    onClick={() => handleSelectYear(year)}
                  >
                    {year ?? 'All'}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="filter-scroll-btn"
                onClick={() => scrollRow(yearScrollRef, 1)}
                aria-label="Geser tahun ke kanan"
              >
                →
              </button>
            </div>
          </div>

          <a href="#/genres" className="button-primary filter-explore-cta">
            Explore
          </a>
        </div>
      </section>

      <main className="main-content">
        <form
          className="catalog-search-form"
          onSubmit={handleSearchSubmit}
          role="search"
        >
          <input
            type="search"
            className="catalog-search-input"
            placeholder="Search by movie title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search by movie title"
          />
          <button
            type="submit"
            className="catalog-search-btn"
            aria-label="Cari film"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>

        <section className="popular-section" id="discover">
          <div className="section-heading">
            <h2>
              {selectedGenre || selectedYear
                ? `Discover ${selectedGenre ? selectedGenre.name : 'Movies'}${selectedYear ? ` (${selectedYear})` : ''}`
                : 'Discover Movies'}
            </h2>

            <a href="#/genres" className="view-all">
              View All <span>→</span>
            </a>
          </div>

          {loading && <Loading message="Discovering movies..." />}

          {error && <ErrorMessage message={error} onRetry={handleRetry} />}

          {!loading && !error && (
            <>
              <MovieList
                movies={discoverList}
                emptyMessage="Tidak ada film untuk filter yang dipilih."
              />

              {page < totalPages && (
                <div className="grid-footer-bar">
                  <span className="grid-divider" aria-hidden="true"></span>
                  <button
                    type="button"
                    className="button-primary grid-show-more"
                    onClick={handleShowMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? 'Loading...' : 'Show More'}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {!loading && !error && popularMovies.length > 0 && (
          <section className="popular-section" id="popular">
            <div className="section-heading">
              <h2>Popular Movies</h2>

              <a href="#/top-rated" className="view-all">
                View All <span>→</span>
              </a>
            </div>

            <MovieList
              movies={popularMovies}
              emptyMessage="No popular movies available."
            />
          </section>
        )}
      </main>
    </>
  )
}

export default Home

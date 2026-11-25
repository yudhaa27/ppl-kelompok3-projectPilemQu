import { useEffect, useState } from 'react'
import MovieList from './components/MovieList'
import Navbar from './components/Navbar'
import NowPlaying from './pages/NowPlaying'
import Upcoming from './pages/Upcoming'
import { getImageUrl, getPopularMovies } from './services/tmdb'
import './App.css'

function resolvePageFromHash(hash) {
  if (hash === '#now-playing') return 'now-playing'
  if (hash === '#upcoming') return 'upcoming'
  return 'home'
}

function formatFullDate(dateString) {
  if (!dateString) return 'Tanggal rilis belum tersedia'
  const parsed = new Date(`${dateString}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return dateString

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}

function App() {
  const [activePage, setActivePage] = useState(() =>
    resolvePageFromHash(window.location.hash),
  )
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(() => activePage === 'home')
  const [error, setError] = useState('')
  const [homeReloadToken, setHomeReloadToken] = useState(0)
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(resolvePageFromHash(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (activePage !== 'home') return

    let ignore = false

    getPopularMovies()
      .then((data) => {
        if (ignore) return
        setMovies(data.results || [])
      })
      .catch((err) => {
        if (ignore) return
        setError(err.message || 'Gagal memuat film.')
      })
      .finally(() => {
        if (ignore) return
        setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [activePage, homeReloadToken])

  useEffect(() => {
    if (!selectedMovie) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedMovie(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedMovie])

  const navigateTo = (pageId) => {
    const targetHash = pageId === 'home' ? '#home' : `#${pageId}`
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash
    }
    if (pageId === 'home' && movies.length === 0 && !error) {
      setLoading(true)
    }
    setActivePage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRetryHome = () => {
    setLoading(true)
    setError('')
    setHomeReloadToken((prev) => prev + 1)
  }

  const featuredMovie = movies[0]
  const displayedMovies = movies.slice(1, 13)
  const featuredBackdrop = getImageUrl(featuredMovie?.backdrop_path, 'original')
  const modalImage =
    getImageUrl(selectedMovie?.backdrop_path, 'w780') ||
    getImageUrl(selectedMovie?.poster_path, 'w500')

  return (
    <div className="app">
      <Navbar activePage={activePage} onNavigate={navigateTo} />

      {activePage === 'now-playing' && (
        <NowPlaying onSelectMovie={setSelectedMovie} />
      )}

      {activePage === 'upcoming' && (
        <Upcoming onSelectMovie={setSelectedMovie} />
      )}

      {activePage === 'home' && (
        <>
          {featuredMovie ? (
            <section
              className="hero"
              style={{
                backgroundImage: `linear-gradient(90deg, #111318 0%, rgba(17,19,24,0.94) 35%, rgba(17,19,24,0.35) 100%), linear-gradient(0deg, #111318 0%, transparent 40%), url('${featuredBackdrop}')`,
              }}
            >
              <div className="hero-content">
                <span className="hero-label">
                  <span className="gold-dot"></span>
                  POPULAR MOVIE
                </span>

                <h1>{featuredMovie.title}</h1>

                <div className="hero-meta">
                  <span className="rating">
                    ★ {featuredMovie.vote_average?.toFixed(1)}
                  </span>

                  <span>
                    {featuredMovie.release_date?.slice(0, 4) || 'Unknown'}
                  </span>

                  <span>Movie</span>
                </div>

                <p className="hero-description">
                  {featuredMovie.overview ||
                    'Discover this movie and explore more cinematic stories.'}
                </p>

                <div className="hero-buttons">
                  <a href="#popular" className="button-primary">
                    Explore Movies <span>→</span>
                  </a>

                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => navigateTo('now-playing')}
                  >
                    Now Playing
                  </button>
                </div>
              </div>

              <div className="hero-side-label">
                YOUR MOVIE DISCOVERY PLATFORM
              </div>
            </section>
          ) : (
            <section className="hero hero-fallback">
              <div className="hero-content">
                <span className="hero-label">PILEMQU MOVIE DISCOVERY</span>
                <h1>Discover your next favorite movie.</h1>
                <p className="hero-description">
                  Explore movies, find new stories and discover your next favorite.
                </p>
              </div>
            </section>
          )}

          <main className="main-content">
            <section className="popular-section" id="popular">
              <div className="section-heading">
                <div>
                  <span className="section-label">DISCOVER</span>
                  <h2>Popular Movies</h2>
                  <p>Explore movies everyone is talking about.</p>
                </div>

                <button
                  type="button"
                  className="view-all link-button"
                  onClick={() => navigateTo('now-playing')}
                >
                  Now Playing <span>→</span>
                </button>
              </div>

              <MovieList
                movies={displayedMovies}
                loading={loading}
                error={error}
                onRetry={handleRetryHome}
                onSelectMovie={setSelectedMovie}
              />
            </section>

            <section className="discovery-banner" id="genres">
              <div>
                <span className="section-label">YOUR NEXT STORY</span>
                <h2>Every movie has a story. Find yours.</h2>
                <p>
                  Discover movies currently in theaters or coming soon to cinemas.
                </p>
              </div>

              <button
                type="button"
                className="button-primary"
                onClick={() => navigateTo('upcoming')}
              >
                Lihat Upcoming <span>→</span>
              </button>
            </section>
          </main>
        </>
      )}

      <footer className="footer">
        <a
          href="#home"
          className="logo"
          onClick={(event) => {
            event.preventDefault()
            navigateTo('home')
          }}
        >
          Pilem<span>Qu.</span>
        </a>

        <p>Your destination to discover movies.</p>

        <small>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </small>

        <small>© 2026 PilemQu. All rights reserved.</small>
      </footer>

      {selectedMovie && (
        <div
          className="movie-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="movie-modal-title"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="movie-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="movie-modal-close"
              aria-label="Tutup detail film"
              onClick={() => setSelectedMovie(null)}
            >
              ×
            </button>

            {modalImage && (
              <div className="movie-modal-banner">
                <img src={modalImage} alt={selectedMovie.title} />
              </div>
            )}

            <div className="movie-modal-body">
              <span className="section-label">MOVIE PREVIEW</span>
              <h2 id="movie-modal-title">{selectedMovie.title}</h2>

              <div className="hero-meta">
                <span className="rating">
                  {selectedMovie.vote_average > 0
                    ? `★ ${selectedMovie.vote_average.toFixed(1)}`
                    : 'TBA'}
                </span>
                <span>{formatFullDate(selectedMovie.release_date)}</span>
              </div>

              <p className="movie-modal-overview">
                {selectedMovie.overview ||
                  'Sinopsis film belum tersedia pada bahasa yang dipilih.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

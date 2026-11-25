
import { useEffect, useState } from 'react'
import { getPopularMovies } from './services/tmdb'
import Genre from './pages/Genre'
import './App.css'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getPopularMovies()
      .then((data) => {
        setMovies(data.results || [])
      })
      .catch((err) => {
        setError(err.message || 'Gagal memuat film.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const featuredMovie = movies[0]

  const displayedMovies = movies.slice(1, 13)

  return (
    <div className="app">
      <header className="navbar">
        <a href="#" className="logo">
          Pilem<span>Qu.</span>
        </a>

        <nav className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#popular">Movies</a>
          <a href="#genres">Genres</a>
          <a href="#upcoming">Upcoming</a>
        </nav>

        <a href="#popular" className="nav-search">
          <span>⌕</span> Explore
        </a>
      </header>

      {featuredMovie ? (
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(90deg, #111318 0%, rgba(17,19,24,0.94) 35%, rgba(17,19,24,0.35) 100%), linear-gradient(0deg, #111318 0%, transparent 40%), url('${IMAGE_BASE}original${featuredMovie.backdrop_path}')`,
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

              <a href="#popular" className="button-secondary">
                Discover More
              </a>
            </div>
          </div>

          <div className="hero-side-label">
            YOUR MOVIE DISCOVERY PLATFORM
          </div>
        </section>
      ) : (
        <section className="hero hero-fallback">
          <div className="hero-content">
            <span className="hero-label">PILE MQU MOVIE DISCOVERY</span>
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

            <a href="#popular" className="view-all">
              View all <span>→</span>
            </a>
          </div>

          {loading && (
            <div className="status-message">
              <div className="loader"></div>
              <p>Discovering movies...</p>
            </div>
          )}

          {error && (
            <div className="status-message error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && displayedMovies.length === 0 && (
            <div className="status-message">
              <p>No movies available.</p>
            </div>
          )}

          {!loading && !error && displayedMovies.length > 0 && (
            <div className="movie-grid">
              {displayedMovies.map((movie) => (
                <article className="movie-card" key={movie.id}>
                  <div className="movie-poster">
                    {movie.poster_path ? (
                      <img
                        src={`${IMAGE_BASE}w500${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="poster-placeholder">
                        No Poster Available
                      </div>
                    )}

                    <div className="poster-overlay">
                      <a href="#popular" className="movie-explore">
                        Explore Movie <span>↗</span>
                      </a>
                    </div>

                    <div className="movie-rating">
                      ★ {movie.vote_average?.toFixed(1)}
                    </div>
                  </div>

                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <div className="movie-meta">
                      <span>
                        {movie.release_date?.slice(0, 4) || 'Unknown'}
                      </span>
                      <span className="meta-dot">•</span>
                      <span>Movie</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <Genre />
      </main>

      <footer className="footer" id="upcoming">
        <a href="#" className="logo">
          Pilem<span>Qu.</span>
        </a>

        <p>
          Your destination to discover movies.
        </p>

        <small>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </small>

        <small>© 2026 PilemQu. All rights reserved.</small>
      </footer>
    </div>
  )
}

export default App

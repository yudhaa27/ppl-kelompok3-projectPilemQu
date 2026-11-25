import { useEffect, useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import MovieList from '../components/MovieList'
import { getImageUrl, getPopularMovies } from '../services/tmdb'

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    getPopularMovies(1, { signal: controller.signal })
      .then((data) => {
        setMovies(data.results || [])
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Gagal memuat film.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [retryCount])

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setRetryCount((count) => count + 1)
  }

  const featuredMovie = movies[0]
  const displayedMovies = movies.slice(1, 13)
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
                  backgroundImage: `linear-gradient(90deg, #111318 0%, rgba(17,19,24,0.94) 35%, rgba(17,19,24,0.35) 100%), linear-gradient(0deg, #111318 0%, transparent 40%), url('${featuredBackdrop}')`,
                }
              : undefined
          }
        >
          <div className="hero-content">
            <span className="hero-label">
              <span className="gold-dot"></span>
              POPULAR MOVIE
            </span>

            <h1>{featuredMovie.title}</h1>

            <div className="hero-meta">
              <span className="rating">
                ★ {featuredMovie.vote_average?.toFixed(1) || 'N/A'}
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
              <a
                href={`#/movie/${featuredMovie.id}`}
                className="button-primary"
              >
                Lihat Detail <span>→</span>
              </a>

              <a href="#/now-playing" className="button-secondary">
                Now Playing
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
            <span className="hero-label">PILEMQU MOVIE DISCOVERY</span>
            <h1>Discover your next favorite movie.</h1>
            <p className="hero-description">
              Explore movies, find new stories and discover your next favorite.
            </p>
            <div className="hero-buttons">
              <a href="#/search" className="button-primary">
                Cari Film <span>→</span>
              </a>
            </div>
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

            <a href="#/now-playing" className="view-all">
              Now Playing <span>→</span>
            </a>
          </div>

          {loading && <Loading message="Discovering movies..." />}

          {error && <ErrorMessage message={error} onRetry={handleRetry} />}

          {!loading && !error && (
            <MovieList
              movies={displayedMovies}
              emptyMessage="No movies available."
            />
          )}
        </section>

        <section className="discovery-banner" id="genres">
          <div>
            <span className="section-label">YOUR NEXT STORY</span>
            <h2>Every movie has a story. Find yours.</h2>
            <p>
              Discover movies currently in theaters, coming soon, or search your
              favorite titles.
            </p>
          </div>

          <a href="#/upcoming" className="button-primary">
            Lihat Upcoming <span>→</span>
          </a>
        </section>
      </main>
    </>
  )
}

export default Home

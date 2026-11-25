import { useState, useEffect, useCallback, useRef } from 'react'
import {
  getGenres,
  getMoviesByGenre,
  getMovieRecommendations,
  getImageUrl,
} from '../services/tmdb'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'

export default function Genre() {
  // State Genre
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [loadingGenres, setLoadingGenres] = useState(true)
  const [genreError, setGenreError] = useState('')

  // State Film berdasarkan Genre
  const [movies, setMovies] = useState([])
  const [loadingMovies, setLoadingMovies] = useState(false)
  const [moviesError, setMoviesError] = useState('')

  // State Rekomendasi Film
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loadingRecs, setLoadingRecs] = useState(false)
  const [recsError, setRecsError] = useState('')

  const recsSectionRef = useRef(null)

  // 1. Ambil daftar genre saat pertama kali dimuat
  const fetchGenreList = useCallback(async () => {
    setLoadingGenres(true)
    setGenreError('')
    try {
      const data = await getGenres()
      const list = data.genres || []
      setGenres(list)
      if (list.length > 0) {
        setSelectedGenre(list[0])
      }
    } catch (err) {
      setGenreError(err.message || 'Gagal memuat daftar genre.')
    } finally {
      setLoadingGenres(false)
    }
  }, [])

  useEffect(() => {
    fetchGenreList()
  }, [fetchGenreList])

  // 2. Ambil film berdasarkan genre yang dipilih
  const fetchMoviesForGenre = useCallback(async (genreId) => {
    if (!genreId) return
    setLoadingMovies(true)
    setMoviesError('')
    try {
      const data = await getMoviesByGenre(genreId)
      const results = data.results || []
      setMovies(results)

      // Otomatis jadikan film pertama sebagai sumber rekomendasi jika ada
      if (results.length > 0) {
        setSelectedMovie(results[0])
      } else {
        setSelectedMovie(null)
        setRecommendations([])
      }
    } catch (err) {
      setMoviesError(err.message || 'Gagal memuat film untuk genre ini.')
    } finally {
      setLoadingMovies(false)
    }
  }, [])

  useEffect(() => {
    if (selectedGenre) {
      fetchMoviesForGenre(selectedGenre.id)
    }
  }, [selectedGenre, fetchMoviesForGenre])

  // 3. Ambil rekomendasi film berdasarkan selectedMovie
  const fetchRecommendationsForMovie = useCallback(async (movie) => {
    if (!movie?.id) return
    setLoadingRecs(true)
    setRecsError('')
    try {
      const data = await getMovieRecommendations(movie.id)
      setRecommendations(data.results || [])
    } catch (err) {
      setRecsError(err.message || 'Gagal memuat rekomendasi film.')
    } finally {
      setLoadingRecs(false)
    }
  }, [])

  useEffect(() => {
    if (selectedMovie) {
      fetchRecommendationsForMovie(selectedMovie)
    }
  }, [selectedMovie, fetchRecommendationsForMovie])

  // Handler saat user memilih film untuk melihat rekomendasi
  const handleSelectMovieForRecs = (movie, shouldScroll = false) => {
    setSelectedMovie(movie)
    if (shouldScroll && recsSectionRef.current) {
      recsSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="genre-page-container" id="genres">
      {/* Header Genre */}
      <div className="section-heading">
        <div>
          <span className="section-label">JELAJAHI KATALOG</span>
          <h2>Eksplorasi Genre</h2>
          <p>
            Pilih genre favorit Anda untuk menemukan film terbaik dan rekomendasi
            terkait.
          </p>
        </div>
      </div>

      {/* Loading & Error Daftar Genre */}
      {loadingGenres && <Loading message="Memuat daftar genre..." />}
      {genreError && (
        <ErrorMessage message={genreError} onRetry={fetchGenreList} />
      )}

      {/* Daftar Genre Chips/Buttons */}
      {!loadingGenres && !genreError && genres.length > 0 && (
        <div className="genre-chips-container" role="tablist">
          {genres.map((genre) => {
            const isActive = selectedGenre?.id === genre.id
            return (
              <button
                key={genre.id}
                type="button"
                className={`genre-chip ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Konten Film Berdasarkan Genre */}
      <div className="genre-content-section">
        {selectedGenre && (
          <div className="genre-results-header">
            <h3>
              Film Genre: <span>{selectedGenre.name}</span>
            </h3>
            {movies.length > 0 && (
              <span className="results-count">
                Menampilkan {movies.length} film terpopuler
              </span>
            )}
          </div>
        )}

        {loadingMovies && (
          <Loading message={`Memuat film genre ${selectedGenre?.name || ''}...`} />
        )}

        {moviesError && (
          <ErrorMessage
            message={moviesError}
            onRetry={() => fetchMoviesForGenre(selectedGenre?.id)}
          />
        )}

        {/* Empty State */}
        {!loadingMovies && !moviesError && movies.length === 0 && (
          <div className="status-message">
            <p>Tidak ada film ditemukan untuk genre ini.</p>
          </div>
        )}

        {/* Movie Grid */}
        {!loadingMovies && !moviesError && movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => {
              const isSelected = selectedMovie?.id === movie.id
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isSelected={isSelected}
                  actionLabel="Rekomendasi"
                  onSelect={(m) => handleSelectMovieForRecs(m, true)}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Section Rekomendasi (FR-08) */}
      <div className="recommendations-section" ref={recsSectionRef} id="recommendations">
        <div className="section-heading">
          <div>
            <span className="section-label">DISCOVERY KHUSUS</span>
            <h2>Rekomendasi Film</h2>
            {selectedMovie ? (
              <p>
                Rekomendasi pilihan berdasarkan: <strong>{selectedMovie.title}</strong>
              </p>
            ) : (
              <p>Pilih salah satu film di atas untuk melihat rekomendasi serupa.</p>
            )}
          </div>
        </div>

        {/* Banner Film Sumber Rekomendasi */}
        {selectedMovie && (
          <div className="rec-source-card">
            {selectedMovie.poster_path && (
              <img
                src={getImageUrl(selectedMovie.poster_path, 'w200')}
                alt={selectedMovie.title}
                className="rec-source-poster"
              />
            )}
            <div className="rec-source-info">
              <span className="rec-source-tag">FILM SUMBER REKOMENDASI</span>
              <h3>{selectedMovie.title}</h3>
              <div className="rec-source-meta">
                <span>★ {selectedMovie.vote_average?.toFixed(1) || '-'}</span>
                <span>•</span>
                <span>{selectedMovie.release_date?.slice(0, 4) || 'Unknown'}</span>
              </div>
              <p className="rec-source-overview">
                {selectedMovie.overview || 'Tidak ada deskripsi singkat.'}
              </p>
            </div>
          </div>
        )}

        {/* Loading & Error Rekomendasi */}
        {loadingRecs && <Loading message="Mencari film rekomendasi yang serupa..." />}

        {recsError && (
          <ErrorMessage
            message={recsError}
            onRetry={() => fetchRecommendationsForMovie(selectedMovie)}
          />
        )}

        {/* Empty State Rekomendasi */}
        {!loadingRecs && !recsError && selectedMovie && recommendations.length === 0 && (
          <div className="status-message">
            <p>Belum ada rekomendasi film yang tersedia untuk film ini.</p>
          </div>
        )}

        {/* Grid Rekomendasi */}
        {!loadingRecs && !recsError && recommendations.length > 0 && (
          <div className="movie-grid">
            {recommendations.slice(0, 8).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                actionLabel="Jadikan Acuan"
                onSelect={(m) => handleSelectMovieForRecs(m, true)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

import MovieCatalog from '../components/MovieCatalog'
import { getNowPlayingMovies } from '../services/tmdb'

/**
 * Displays movies currently playing in theaters from TMDB.
 */
function NowPlaying({ onSelectMovie }) {
  return (
    <MovieCatalog
      key="now-playing"
      label="IN THEATERS"
      title="Now Playing Movies"
      description="Jelajahi film-film terbaru yang sedang tayang di bioskop saat ini."
      fetcher={getNowPlayingMovies}
      loadingMessage="Memuat film yang sedang tayang..."
      emptyMessage="Belum ada film yang sedang tayang saat ini."
      onSelectMovie={onSelectMovie}
    />
  )
}

export default NowPlaying

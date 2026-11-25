import MovieCatalog from '../components/MovieCatalog'
import { getUpcomingMovies } from '../services/tmdb'

/**
 * Displays upcoming movies scheduled for release from TMDB.
 */
function Upcoming({ onSelectMovie }) {
  return (
    <MovieCatalog
      key="upcoming"
      label="COMING SOON"
      title="Upcoming Movies"
      description="Temukan film-film yang akan segera tayang lengkap dengan jadwal rilisnya."
      fetcher={getUpcomingMovies}
      loadingMessage="Memuat daftar film yang akan datang..."
      emptyMessage="Belum ada film yang akan datang untuk ditampilkan."
      showFullDate
      onSelectMovie={onSelectMovie}
    />
  )
}

export default Upcoming

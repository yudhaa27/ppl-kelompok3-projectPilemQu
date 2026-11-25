import MovieCatalog from '../components/MovieCatalog'
import { getTopRatedMovies } from '../services/tmdb'

/**
 * Displays top-rated movies from TMDB using the shared MovieCatalog layout.
 */
function TopRated({ onSelectMovie }) {
  return (
    <MovieCatalog
      key="top-rated"
      label="HIGHEST RATED"
      title="Top Rated Movies"
      description="Daftar film dengan rating tertinggi pilihan penonton dari TMDB."
      fetcher={getTopRatedMovies}
      loadingMessage="Memuat film rating tertinggi..."
      emptyMessage="Belum ada data film rating tertinggi."
      onSelectMovie={onSelectMovie}
    />
  )
}

export default TopRated

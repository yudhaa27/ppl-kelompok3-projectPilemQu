
export const IMAGE_BASE = 'https://image.tmdb.org/t/p/'

export function getImageUrl(path, size = 'w500') {
  if (!path) return null
  return `${IMAGE_BASE}${size}${path}`
}

const BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

async function fetchFromTMDB(endpoint) {
  if (!API_KEY) {
    throw new Error('TMDB API Key belum dikonfigurasi. Pastikan VITE_TMDB_API_KEY ada di file .env')
  }

  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=id-ID`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status}`)
  }

  return response.json()
}

// Popular movies
export function getPopularMovies(page = 1) {
  return fetchFromTMDB(`/movie/popular?page=${page}`)
}

// FR-07: Genre list
export function getGenres() {
  return fetchFromTMDB('/genre/movie/list')
}

// FR-07: Discover movies by genre
export function getMoviesByGenre(genreId, page = 1) {
  return fetchFromTMDB(`/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`)
}

// FR-08: Movie recommendations based on movie ID
export function getMovieRecommendations(movieId, page = 1) {
  return fetchFromTMDB(`/movie/${movieId}/recommendations?page=${page}`)
}

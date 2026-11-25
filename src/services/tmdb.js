const BASE_URL = 'https://api.themoviedb.org/3'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
export const IMAGE_BASE = IMAGE_BASE_URL
export const TMDB_IMAGE_BASE = IMAGE_BASE_URL

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

/**
 * Fetches JSON data from a TMDB v3 endpoint using the configured API key.
 * @param {string} endpoint - Relative TMDB endpoint path (e.g. '/movie/popular?page=1').
 * @param {object} [options] - Optional fetch options (e.g. AbortController signal).
 * @returns {Promise<object>} Parsed JSON response from TMDB.
 */
async function fetchFromTMDB(endpoint, options = {}) {
  if (!API_KEY) {
    throw new Error('TMDB API Key belum dikonfigurasi. Pastikan VITE_TMDB_API_KEY ada di file .env')
  }

  const separator = endpoint.includes('?') ? '&' : '?'
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=id-ID`

  const response = await fetch(url, { signal: options.signal })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Data film tidak ditemukan di TMDB.')
    }
    throw new Error(`TMDB API Error: ${response.status}`)
  }

  return response.json()
}

/**
 * Builds a full TMDB image URL for a given path and size.
 * @param {string | null | undefined} path - Poster or backdrop path from TMDB.
 * @param {string} [size='w500'] - TMDB image width preset.
 * @returns {string | null} Full image URL or null when path is unavailable.
 */
export function getImageUrl(path, size = 'w500') {
  if (!path) return null
  return `${IMAGE_BASE_URL}${size}${path}`
}

export function getPopularMovies(page = 1, options = {}) {
  return fetchFromTMDB(`/movie/popular?page=${page}`, options)
}

export function getNowPlayingMovies(page = 1, options = {}) {
  return fetchFromTMDB(`/movie/now_playing?page=${page}`, options)
}

export function getUpcomingMovies(page = 1, options = {}) {
  return fetchFromTMDB(`/movie/upcoming?page=${page}`, options)
}

export function getTopRatedMovies(page = 1, options = {}) {
  return fetchFromTMDB(`/movie/top_rated?page=${page}`, options)
}

export function searchMovies(query, page = 1, options = {}) {
  const trimmedQuery = typeof query === 'string' ? query.trim() : ''
  if (!trimmedQuery) {
    return Promise.reject(new Error('Kata kunci pencarian tidak boleh kosong.'))
  }

  const safePage = Number.isInteger(page) && page > 0 ? page : 1
  return fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(trimmedQuery)}&page=${safePage}&include_adult=false`,
    options,
  )
}

export function getMovieDetail(movieId, options = {}) {
  if (!movieId) {
    return Promise.reject(new Error('ID film tidak valid.'))
  }

  return fetchFromTMDB(`/movie/${encodeURIComponent(movieId)}`, options)
}

// FR-07: Genre list
export function getGenres(options = {}) {
  return fetchFromTMDB('/genre/movie/list', options)
}

// FR-07: Discover movies by genre
export function getMoviesByGenre(genreId, page = 1, options = {}) {
  return fetchFromTMDB(
    `/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
    options,
  )
}

// FR-08: Movie recommendations based on movie ID
export function getMovieRecommendations(movieId, page = 1, options = {}) {
  return fetchFromTMDB(
    `/movie/${encodeURIComponent(movieId)}/recommendations?page=${page}`,
    options,
  )
}

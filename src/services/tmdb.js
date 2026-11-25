const BASE_URL = 'https://api.themoviedb.org/3'

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

/**
 * Fetches JSON data from a TMDB v3 endpoint using the configured API key.
 * @param {string} endpoint - Relative TMDB endpoint path (e.g. '/movie/popular?page=1').
 * @returns {Promise<object>} Parsed JSON response from TMDB.
 */
async function fetchFromTMDB(endpoint) {
  if (!API_KEY) {
    throw new Error('TMDB API Key belum dikonfigurasi.')
  }

  const separator = endpoint.includes('?') ? '&' : '?'
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=id-ID`

  const response = await fetch(url)

  if (!response.ok) {
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
  return `${TMDB_IMAGE_BASE}${size}${path}`
}

export function getPopularMovies(page = 1) {
  return fetchFromTMDB(`/movie/popular?page=${page}`)
}

export function getNowPlayingMovies(page = 1) {
  return fetchFromTMDB(`/movie/now_playing?page=${page}`)
}

export function getUpcomingMovies(page = 1) {
  return fetchFromTMDB(`/movie/upcoming?page=${page}`)
}

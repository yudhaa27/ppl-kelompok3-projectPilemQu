const BASE_URL = 'https://api.themoviedb.org/3'

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export function getImageUrl(path, size = 'w500') {
  if (!path) return null
  return `${IMAGE_BASE_URL}${size}${path}`
}

async function fetchFromTMDB(endpoint, options = {}) {
  if (!API_KEY) {
    throw new Error('TMDB API Key belum dikonfigurasi.')
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

export function getPopularMovies(options = {}) {
  return fetchFromTMDB('/movie/popular?page=1', options)
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

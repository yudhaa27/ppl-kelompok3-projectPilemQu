
const BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

async function fetchFromTMDB(endpoint) {
  if (!API_KEY) {
    throw new Error('TMDB API Key belum dikonfigurasi.')
  }

  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=id-ID`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status}`)
  }

  return response.json()
}

export function getPopularMovies() {
  return fetchFromTMDB('/movie/popular?page=1')
}

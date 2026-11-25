import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'
import './App.css'

function parseHashRoute(hash) {
  const cleaned = (hash || '').replace(/^#/, '')

  if (cleaned.startsWith('/search')) {
    const [, queryString = ''] = cleaned.split('?')
    const params = new URLSearchParams(queryString)
    const query = params.get('q') || ''
    const parsedPage = Number.parseInt(params.get('page') || '1', 10)
    const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage

    return { name: 'search', query, page, sectionId: '' }
  }

  const movieMatch = cleaned.match(/^\/movie\/([^/?]+)/)
  if (movieMatch) {
    return { name: 'detail', movieId: movieMatch[1], sectionId: '' }
  }

  const sectionMatch = cleaned.match(/^\/#(.+)$/)
  return {
    name: 'home',
    sectionId: sectionMatch ? sectionMatch[1] : '',
  }
}

function buildSearchHash(query, page = 1) {
  const trimmed = query.trim()
  if (!trimmed) return '#/search'
  const params = new URLSearchParams({ q: trimmed })
  if (page > 1) {
    params.set('page', String(page))
  }
  return `#/search?${params.toString()}`
}

function App() {
  const [route, setRoute] = useState(() => parseHashRoute(window.location.hash))

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = parseHashRoute(window.location.hash)
      setRoute(nextRoute)

      if (nextRoute.sectionId) {
        requestAnimationFrame(() => {
          document
            .getElementById(nextRoute.sectionId)
            ?.scrollIntoView({ behavior: 'smooth' })
        })
      } else {
        window.scrollTo({ top: 0 })
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleSearchNavigate = (query, page = 1) => {
    window.location.hash = buildSearchHash(query, page)
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }
    window.location.hash = '#/'
  }

  return (
    <div className="app">
      <Navbar currentRoute={route.name} />

      {route.name === 'search' && (
        <Search
          key={route.query}
          query={route.query}
          page={route.page}
          onSearch={handleSearchNavigate}
        />
      )}

      {route.name === 'detail' && (
        <MovieDetail
          key={route.movieId}
          movieId={route.movieId}
          onBack={handleBack}
        />
      )}

      {route.name === 'home' && <Home />}

      <footer className="footer" id="upcoming">
        <a href="#/" className="logo">
          Pilem<span>Qu.</span>
        </a>

        <p>Your destination to discover movies.</p>

        <small>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </small>

        <small>© 2026 PilemQu. All rights reserved.</small>
      </footer>
    </div>
  )
}

export default App

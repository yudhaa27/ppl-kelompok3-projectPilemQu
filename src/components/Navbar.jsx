function Navbar({ currentRoute = 'home' }) {
  return (
    <header className="navbar">
      <a href="#/" className="logo">
        Pilem<span>Qu.</span>
      </a>

      <nav className="nav-links" aria-label="Navigasi Utama">
        <a href="#/" className={currentRoute === 'home' ? 'active' : ''}>
          Home
        </a>
        <a href="#/#popular">Movies</a>
        <a href="#/#genres">Genres</a>
        <a href="#/#upcoming">Upcoming</a>
        <a
          href="#/search"
          className={currentRoute === 'search' ? 'active' : ''}
        >
          Search
        </a>
      </nav>

      <a
        href="#/search"
        className={`nav-search ${currentRoute === 'search' ? 'active' : ''}`}
      >
        <span>⌕</span> Search
      </a>
    </header>
  )
}

export default Navbar

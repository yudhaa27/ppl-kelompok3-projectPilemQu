const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#/' },
  { id: 'now-playing', label: 'Now Playing', href: '#/now-playing' },
  { id: 'upcoming', label: 'Upcoming', href: '#/upcoming' },
  { id: 'top-rated', label: 'Top Rated', href: '#/top-rated' },
  { id: 'genres', label: 'Genre', href: '#/genres' },
]

/**
 * Top navigation bar shared across PilemQu pages.
 */
function Navbar({ activePage = 'home', currentRoute, onNavigate }) {
  const activeKey = activePage || currentRoute || 'home'

  const handleNavClick = (event, pageId) => {
    if (!onNavigate) return
    event.preventDefault()
    onNavigate(pageId)
  }

  return (
    <header className="navbar">
      <a
        href="#/"
        className="logo"
        onClick={(event) => handleNavClick(event, 'home')}
      >
        <span className="logo-badge" aria-hidden="true">
          ◉
        </span>
        PILEM<span>QU</span>
      </a>

      <nav className="nav-links" aria-label="Navigasi Utama">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={activeKey === item.id ? 'active' : ''}
            onClick={(event) => handleNavClick(event, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        href="#/search"
        className={`nav-search-icon ${activeKey === 'search' ? 'active' : ''}`}
        aria-label="Cari Film"
        onClick={(event) => handleNavClick(event, 'search')}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </a>
    </header>
  )
}

export default Navbar

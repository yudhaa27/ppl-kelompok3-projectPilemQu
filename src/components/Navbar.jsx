const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#/' },
  { id: 'now-playing', label: 'Now Playing', href: '#/now-playing' },
  { id: 'upcoming', label: 'Upcoming', href: '#/upcoming' },
  { id: 'search', label: 'Search', href: '#/search' },
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
        Pilem<span>Qu.</span>
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
        className={`nav-search ${activeKey === 'search' ? 'active' : ''}`}
        onClick={(event) => handleNavClick(event, 'search')}
      >
        <span>⌕</span> Search
      </a>
    </header>
  )
}

export default Navbar

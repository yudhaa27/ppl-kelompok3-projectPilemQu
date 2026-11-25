const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'now-playing', label: 'Now Playing', href: '#now-playing' },
  { id: 'upcoming', label: 'Upcoming', href: '#upcoming' },
]

/**
 * Top navigation bar shared across PilemQu pages.
 */
function Navbar({ activePage, onNavigate }) {
  const handleNavClick = (event, pageId) => {
    if (!onNavigate) return
    event.preventDefault()
    onNavigate(pageId)
  }

  return (
    <header className="navbar">
      <a
        href="#home"
        className="logo"
        onClick={(event) => handleNavClick(event, 'home')}
      >
        Pilem<span>Qu.</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={activePage === item.id ? 'active' : ''}
            onClick={(event) => handleNavClick(event, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        href="#now-playing"
        className="nav-search"
        onClick={(event) => handleNavClick(event, 'now-playing')}
      >
        <span>⌕</span> Explore
      </a>
    </header>
  )
}

export default Navbar

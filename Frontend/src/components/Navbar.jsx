import { Link, useLocation } from "react-router"
import { useAuth } from "../features/auth/hooks/useAuth"
import { useState, useEffect } from "react"
import "../style/navbar.scss"

const Navbar = () => {

  const { user, handleLogout } = useAuth()

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()

  /* close menu when route changes */
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  /* scroll transparency effect */
  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

      <h2 className="logo">
  Interview<span>Forge</span>
</h2>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <Link to="/">Home</Link>

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}

      </div>

    </nav>
  )
}

export default Navbar
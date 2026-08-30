import './index.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const HeaderComponent = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <header className="header-container">
      <Link to="/" className="logo-link">
        <img
          src="https://res.cloudinary.com/d2qhbz7t/image/upload/v1787667798/BookHub_logo.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>

      <nav className="nav-container">
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link
              to="/"
              className={
                location.pathname === '/' ? 'active-nav-item' : 'nav-item'
              }
            >
              Home
            </Link>
          </li>

          <li className="nav-list-item">
            <Link
              to="/shelf"
              className={
                location.pathname === '/shelf' ? 'active-nav-item' : 'nav-item'
              }
            >
              Bookshelves
            </Link>
          </li>

          <li className="nav-list-item">
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default HeaderComponent

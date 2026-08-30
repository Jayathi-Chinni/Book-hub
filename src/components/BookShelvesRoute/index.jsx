import './index.css'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import HeaderComponent from '../HeaderComponent'
import Footer from '../Footer'
import NoBooksComponent from '../NoBooksComponent'

const BookShelvesRoute = () => {
  const [books, setBooks] = useState([])
  const [activeShelf, setActiveShelf] = useState('ALL')
  const [searchInput, setSearchInput] = useState('')
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const navigate = useNavigate()

  const shelves = [
    {
      id: 'ALL',
      label: 'All',
    },
    {
      id: 'READ',
      label: 'Read',
    },
    {
      id: 'CURRENTLY_READING',
      label: 'Currently Reading',
    },
    {
      id: 'WANT_TO_READ',
      label: 'Want to Read',
    },
  ]

  const getBooks = async () => {
    setIsLoading(true)
    setHasError(false)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(
        `https://apis.ccbp.in/book-hub/books?shelf=${activeShelf}&search=${searchText}`,
        options,
      )

      const data = await response.json()

      if (response.ok) {
        setBooks(data.books)
      } else {
        setHasError(true)
      }
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getBooks()
  }, [activeShelf, searchText])

  const onClickShelf = shelfId => {
    setActiveShelf(shelfId)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onSubmitSearch = event => {
    event.preventDefault()

    setSearchText(searchInput)
  }

  const onClickBook = id => {
    navigate(`/books/${id}`)
  }

  const getPageHeading = () => {
    if (activeShelf === 'ALL') {
      return 'All Books'
    }

    if (activeShelf === 'READ') {
      return 'Read Books'
    }

    if (activeShelf === 'CURRENTLY_READING') {
      return 'Currently Reading Books'
    }

    return 'Want to Read Books'
  }

  return (
    <div className="bookshelves-container">
      <HeaderComponent />

      <main className="bookshelves-content">

        <aside className="bookshelves-sidebar">
          <h1 className="bookshelves-heading">Bookshelves</h1>

          <ul className="shelves-list">
            {shelves.map(eachShelf => (
              <li key={eachShelf.id} className="shelf-item">
                <button
                  type="button"
                  className={`shelf-button ${
                    activeShelf === eachShelf.id ? 'active-shelf' : ''
                  }`}
                  onClick={() => onClickShelf(eachShelf.id)}
                >
                  {eachShelf.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="books-section">
          <div className="books-section-header">
            <h1 className="books-section-title">{getPageHeading()}</h1>

            <form className="search-container" onSubmit={onSubmitSearch}>
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={onChangeSearchInput}
                className="search-input"
              />

              <button
                type="submit"
                data-testid="searchButton"
                className="search-button"
              >
                <svg
                  className="search-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className="mobile-shelves-container">
            {shelves.map(eachShelf => (
              <button
                type="button"
                key={eachShelf.id}
                className={`mobile-shelf-button ${
                  activeShelf === eachShelf.id ? 'mobile-active-shelf' : ''
                }`}
                onClick={() => onClickShelf(eachShelf.id)}
              >
                {eachShelf.label}
              </button>
            ))}
          </div>

          {isLoading && (
            <div className="loading-container" data-testid="loader">
              <div className="loader"></div>
            </div>
          )}

          {!isLoading && hasError && (
            <div className="failure-container">
              <img
                src="https://res.cloudinary.com/d2qhbz7t/image/upload/v1787686406/somethingwentwrong_image.png"
                alt="failure view"
                className="failure-image"
              />

              <p className="failure-description">
                Something went wrong. Please try again
              </p>

              <button
                type="button"
                className="try-again-button"
                onClick={getBooks}
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !hasError && books.length > 0 && (
            <ul className="bookshelves-books-list">
              {books.map(eachBook => (
                <li
                  className="book-card"
                  key={eachBook.id}
                  onClick={() => onClickBook(eachBook.id)}
                >
                  <img
                    src={eachBook.cover_pic}
                    alt={eachBook.title}
                    className="book-cover-image"
                  />

                  <div className="book-info">
                    <h2 className="book-title">{eachBook.title}</h2>

                    <p className="book-author">{eachBook.author_name}</p>

                    <p className="book-rating">
                      Avg Rating
                      <span className="star">★</span>
                      {eachBook.rating}
                    </p>

                    <p className="book-status">
                      Status:
                      <span className="status-value">
                        {eachBook.read_status}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && !hasError && books.length === 0 && (
            <NoBooksComponent searchText={searchText} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default BookShelvesRoute

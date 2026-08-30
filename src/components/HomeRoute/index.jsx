import './index.css'
import HeaderComponent from '../HeaderComponent'
import TopRatedBookItem from '../TopRatedBookItem'
import Footer from '../Footer'
import SomethingWentWrongComponent from '../SomethingWentWrongComponent'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const HomeRoute = () => {
  const [topRatedBooks, setTopRatedBooks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const navigate = useNavigate()

  const getTopRatedBooks = async () => {
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
        'https://apis.ccbp.in/book-hub/top-rated-books',
        options,
      )

      const data = await response.json()

      if (response.ok) {
        setTopRatedBooks(data.books)
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
    getTopRatedBooks()
  }, [])

  const visibleBooks = topRatedBooks.slice(currentIndex, currentIndex + 3)

  const onClickPrevious = () => {
    if (topRatedBooks.length === 0) {
      return
    }

    if (currentIndex === 0) {
      setCurrentIndex(Math.max(topRatedBooks.length - 3, 0))
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const onClickNext = () => {
    if (topRatedBooks.length === 0) {
      return
    }

    if (currentIndex >= topRatedBooks.length - 3) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const onClickBook = id => {
    navigate(`/books/${id}`)
  }

  return (
    <div className="home-container">
      <HeaderComponent />

      <main className="home-content">
        <section className="hero-section">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>

          <p className="home-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>

          <button
            type="button"
            className="find-books-button mobile-find-books-button"
            onClick={() => navigate('/shelf')}
          >
            Find Books
          </button>
        </section>

        <section className="top-rated-section">
          <div className="top-rated-header">
            <h2 className="top-rated-heading">Top Rated Books</h2>

            <button
              type="button"
              className="find-books-button desktop-find-books-button"
              onClick={() => navigate('/shelf')}
            >
              Find Books
            </button>
          </div>

          <div className="top-rated-books-container">
            <button
              type="button"
              className="arrow-button left-arrow"
              onClick={onClickPrevious}
              aria-label="Previous books"
            >
              <img
                src="https://res.cloudinary.com/d2qhbz7t/image/upload/v1787896067/arrow_image.png"
                alt=""
                className="arrow-image"
              />
            </button>

            {isLoading && (
              <div className="loading-container" data-testid="loader">
                <div className="loader"></div>
              </div>
            )}

            {!isLoading && hasError && (
              <SomethingWentWrongComponent onClickTryAgain={getTopRatedBooks} />
            )}

            {!isLoading && !hasError && (
              <ul className="home-books-list">
                {visibleBooks.map(eachBook => (
                  <li
                    key={eachBook.id}
                    onClick={() => onClickBook(eachBook.id)}
                  >
                    <TopRatedBookItem book={eachBook} />
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              className="arrow-button right-arrow"
              onClick={onClickNext}
              aria-label="Next books"
            >
              <img
                src="https://res.cloudinary.com/d2qhbz7t/image/upload/v1787896067/arrow_image.png"
                alt=""
                className="arrow-image"
              />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomeRoute

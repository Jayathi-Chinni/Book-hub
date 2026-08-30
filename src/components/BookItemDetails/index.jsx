import './index.css'
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import HeaderComponent from '../HeaderComponent'
import Footer from '../Footer'

const BookItemDetails = () => {
  const {id} = useParams()

  const [bookDetails, setBookDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getBookDetails = async () => {
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
        `https://apis.ccbp.in/book-hub/books/${id}`,
        options,
      )

      const data = await response.json()

      if (response.ok) {
        setBookDetails(data.book_details)
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
    getBookDetails()
  }, [id])

  // Loading state
  if (isLoading) {
    return (
      <div className="book-details-loading-container">
        <div className="loader" data-testid="loader"></div>
      </div>
    )
  }

  // Failure state
  if (hasError) {
    return (
      <div className="book-details-page">
        <HeaderComponent />

        <main className="book-details-failure-container">
          <img
            src="https://res.cloudinary.com/d2qhbz7t/image/upload/v1787686406/somethingwentwrong_image.png"
            alt="failure view"
            className="book-details-failure-image"
          />

          <p className="book-details-failure-description">
            Something went wrong, Please try again.
          </p>

          <button
            type="button"
            className="book-details-try-again-button"
            onClick={getBookDetails}
          >
            Try Again
          </button>
        </main>

        <Footer />
      </div>
    )
  }

  // Success state
  return (
    <div className="book-details-page">
      <HeaderComponent />

      <main className="book-details-content">

        {/* Home link - aligned to the left */}
        <Link to="/" className="book-details-home-link">
          Home
        </Link>

        {/* Main book details card */}
        <div className="book-details-card">

          {/* Book image */}
          <div className="book-details-image-container">
            <img
              src={bookDetails.cover_pic}
              alt={bookDetails.title}
              className="book-details-image"
            />
          </div>

          {/* All book information */}
          <div className="book-details-info">

            <h1 className="book-details-title">
              {bookDetails.title}
            </h1>

            <p className="book-details-author">
              {bookDetails.author_name}
            </p>

            <p className="book-details-rating">
              Avg Rating
              <span className="star">★</span>
              {bookDetails.rating}
            </p>

            <p className="book-details-status">
              Status:
              <span className="status-value">
                {bookDetails.read_status}
              </span>
            </p>

            {/* About Author */}
            <section className="about-author-section">
              <h2 className="book-details-section-heading">
                About Author
              </h2>

              <p className="about-author-description">
                {bookDetails.about_author}
              </p>
            </section>

            {/* About Book */}
            <section className="about-book-section">
              <h2 className="book-details-section-heading">
                About Book
              </h2>

              <p className="book-details-description">
                {bookDetails.about_book}
              </p>
            </section>

            

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BookItemDetails
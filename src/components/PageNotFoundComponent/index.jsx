import './index.css'
import {Link} from 'react-router-dom'

const PageNotFoundComponent = () => {
  return (
    <div className="page-not-found-container">
      <main className="page-not-found-content">
        <img
          src="https://res.cloudinary.com/d2qhbz7t/image/upload/v1787686406/somethingwentwrong_image.png"
          alt="page not found"
          className="page-not-found-image"
        />

        <h1 className="page-not-found-heading">Page Not Found</h1>

        <p className="page-not-found-description">
          we are sorry, the page you requested could not be found
        </p>

        <Link to="/">
          <button type="button" className="page-not-found-button">
            Go Back to Home
          </button>
        </Link>
      </main>
    </div>
  )
}

export default PageNotFoundComponent

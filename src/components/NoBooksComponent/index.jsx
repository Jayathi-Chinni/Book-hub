import './index.css'

const NoBooksComponent = props => {
  const {searchText} = props

  return (
    <div className="no-books-container">
      <img
        src="https://res.cloudinary.com/d2qhbz7t/image/upload/v1787686406/somethingwentwrong_image.png"
        alt="no books"
        className="no-books-image"
      />

      <p className="no-books-description">
        Your search for {searchText} did not find any matches.
      </p>
    </div>
  )
}

export default NoBooksComponent

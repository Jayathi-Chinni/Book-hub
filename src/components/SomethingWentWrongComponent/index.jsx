import './index.css'

const SomethingWentWrongComponent = props => {
  const {onClickTryAgain} = props

  return (
    <div className="something-went-wrong-container">
      <img
        src="https://res.cloudinary.com/d2qhbz7t/image/upload/v1787686406/somethingwentwrong_image.png"
        alt="failure view"
        className="something-went-wrong-image"
      />

      <p className="something-went-wrong-description">
        Something went wrong, Please try again.
      </p>

      <button
        type="button"
        className="try-again-button"
        onClick={onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )
}

export default SomethingWentWrongComponent

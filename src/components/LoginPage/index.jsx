import './index.css'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken) {
      navigate('/', {replace: true})
    }
  }, [navigate])

  const handleLogin = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch('https://apis.ccbp.in/login', options)

      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {
          expires: 30,
        })

        setErrorMessage('')

        navigate('/', {replace: true})
      } else {
        setErrorMessage(data.error_msg)
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again')
    }
  }

  return (
    <div className="login-container">
      <div className="banner-image-container">
        <img
          src="https://res.cloudinary.com/d2qhbz7t/image/upload/v1787667179/loginpage_image.png"
          alt="website login"
          className="banner-image"
        />
      </div>

      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/d2qhbz7t/image/upload/v1787667798/BookHub_logo.png"
          alt="login website logo"
          className="bookhub-logo"
        />

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">USERNAME</label>

            <input
              type="text"
              id="username"
              value={username}
              onChange={event => setUsername(event.target.value)}
              placeholder="Username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">PASSWORD</label>

            <input
              type="password"
              id="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Password"
            />
          </div>

          {errorMessage !== '' && (
            <p className="error-message">{errorMessage}</p>
          )}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

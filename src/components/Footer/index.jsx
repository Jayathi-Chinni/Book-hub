import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="social-icons-container">
        <FaGoogle className="social-icon" />
        <FaTwitter className="social-icon" />
        <FaInstagram className="social-icon" />
        <FaYoutube className="social-icon" />
      </div>

      <p className="contact-us">Contact us</p>
    </footer>
  )
}

export default Footer

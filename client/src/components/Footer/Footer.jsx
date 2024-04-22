import "./Footer.css"
import logo from "../../Assets/logo.png"
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="footer" id="resources">
        <div className="container">
          <div className="logo">
            <Link to="#">
              <img src={logo} className="footerMainLogo" alt="" />
            </Link>
          </div>

          {/* Quick Links  */}

          <div className="quick-links">
            <div className="links-group">
              <span>Quick Links</span>
              <div>
                <Link to="/about" className='footerLinks'>Guidelines</Link>
                <Link to="#" className='footerLinks'>What's New</Link>
              </div>
            </div>
            <div className="links-group">
              <span>Pages</span>
              <div>
                <Link to="/" className='footerLinks'>Home</Link>
                <Link to="/about" className='footerLinks'>About</Link>
                <Link to="#" className='footerLinks'>Updates</Link>
              </div>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="social-media">
            <a href="#" rel='noopener noreferrer'>
              <img className='footerSocialImg'
                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-facebook.svg"
                alt="Facebook Logo"
              />
            </a>
            <a href="#" rel='noopener noreferrer'>
              <img className='footerSocialImg'
                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-twitter.svg"
                alt="Twitter Logo"
              />
            </a>
            <a href="#" rel='noopener noreferrer'>
              <img className='footerSocialImg'
                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-pinterest.svg"
                alt="Pinterest Logo"
              />
            </a>
            <a href="#" rel='noopener noreferrer'>
              <img className='footerSocialImg'
                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-instagram.svg"
                alt="Instagram Logo"
              />
            </a>
          </div>
        </div>
        
        <div className="attribution">
          Copyright © 2024
          <span className="outer-link"> Figr - Keshav </span>
        </div>
      </footer>
    </div>
  )
}

export default Footer
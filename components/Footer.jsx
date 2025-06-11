import { FaInstagram, FaFacebookF, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css'
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">Black<span>Ink</span>Masters</h3>
          <p className="footer-about">
            Transformando sua pele em arte desde 2012. Comprometidos com excelência 
            artística e os mais altos padrões de segurança e higiene.
          </p>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Links Rápidos</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/artists">Artistas</a></li>
            <li><a href="/gallery">Galeria</a></li>
            <li><a href="/studio">Nosso Estúdio</a></li>
            <li><a href="/booking">Agendamento</a></li>
            <li><a href="/aftercare">Cuidados</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contato</h4>
          <ul className="contact-info">
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>Rua das Agulhas, 123 - São Paulo/SP</span>
            </li>
            <li>
              <FaPhone className="contact-icon" />
              <span>(11) 9876-5432</span>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <span>contato@blackinkmasters.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Black Ink Masters. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
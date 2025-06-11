import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../../styles/InteractiveHeader.css';

const InteractiveHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasWhiteBackground, setHasWhiteBackground] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Verifica se a navbar está sobre fundo branco
      const elements = document.elementsFromPoint(window.innerWidth/2, 10);
      const isOnWhiteBg = elements.some(el => 
        window.getComputedStyle(el).backgroundColor.includes('255, 255, 255') ||
        window.getComputedStyle(el).backgroundColor === 'white'
      );
      setHasWhiteBackground(isOnWhiteBg);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    // Verificação inicial ao carregar a página
    const elements = document.elementsFromPoint(window.innerWidth/2, 10);
    const isOnWhiteBg = elements.some(el => 
      window.getComputedStyle(el).backgroundColor.includes('255, 255, 255') ||
      window.getComputedStyle(el).backgroundColor === 'white'
    );
    setHasWhiteBackground(isOnWhiteBg);
  }, [location]);

  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/artists', name: 'Artistas' },
    { path: '/gallery', name: 'Galeria' },
    { path: '/studio', name: 'Estúdio' },
    { path: '/booking', name: 'Agendamento' },
    { path: '/aftercare', name: 'Cuidados' },
    { path: '/cart', name: 'Cart' },
     { path: '/store', name: 'Store' },
          { path: '/login', name: 'LoginPages' },
          { path: '/avatar', name: 'Avatar' }
  ];

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${hasWhiteBackground ? 'on-white-bg' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          BLACK<span>TIGER</span>
        </Link>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            {navItems.map((item) => (
              <motion.li 
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.name}
                  <span className="nav-indicator"></span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default InteractiveHeader;
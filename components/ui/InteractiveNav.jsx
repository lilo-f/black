import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/InteractiveNav.css'
const InteractiveNav = () => {
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/artists', name: 'Artistas' },
    { path: '/gallery', name: 'Galeria' },
    { path: '/studio', name: 'Estúdio' },
    { path: '/booking', name: 'Agendamento' },
        { path: '/avatar', name: 'Avatar' }
  ];

  return (
    <nav className="interactive-nav">
      <ul>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={activeLink === item.path ? 'active' : ''}
            >
              {item.name}
              <span className="nav-indicator"></span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default InteractiveNav;
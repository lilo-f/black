import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../styles/ArtistSelection.css'
const ArtistSelection = ({ artists, onSelect }) => {
  return (
    <div className="artist-selection">
      <div className="artists-grid">
        {artists.map((artist) => (
          <motion.div
            key={artist.id}
            className="artist-card"
            whileHover={{ scale: 1.03 }}
            onClick={() => onSelect(artist)}
          >
            <img 
              src={artist.profileImage} 
              alt={artist.name}
              className="artist-image"
            />
            <div className="artist-info">
              <h3>{artist.name}</h3>
              <p className="specialty">{artist.specialty}</p>
              <button className="select-button">
                Selecionar Artista
              </button>
              <Link 
                to={`/artists/${artist.id}`}
                className="portfolio-link"
                onClick={(e) => e.stopPropagation()}
              >
                Ver Portfólio
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArtistSelection;
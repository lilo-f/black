import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { artists } from '../../data/artists';
import '../../styles/FeaturedArtists.css';

const FeaturedArtists = () => {
  const featured = artists.slice(0, 3);

  return (
    <section className="black-tiger-artists">
      <div className="container">
        <motion.div 
          className="title-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="title-decorator">//</span> Nossos Artistas <span className="title-decorator">//</span>
          </h2>
        </motion.div>
        
        <div className="artists-grid">
          {featured.map((artist) => (
            <motion.div
              key={artist.id}
              className="artist-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -15, boxShadow: '0 15px 30px rgba(255, 107, 0, 0.2)' }}
            >
              <Link to={`/artists/${artist.id}`} className="card-link">
                <div className="artist-image-container">
                  <img 
                    src={artist.profileImage} 
                    alt={artist.name}
                    className="artist-image"
                  />
                  <div className="artist-overlay">
                    <div className="specialty-badge">{artist.specialty}</div>
                  </div>
                </div>
                <div className="artist-info">
                  <h3>{artist.name}</h3>
                  <div className="artist-meta">
                    <span className="experience">{artist.experience} anos de experiência</span>
                    <span className="view-profile">Ver portfólio →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="button-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/artists" className="view-all-button">
            Explorar Todos os Artistas
            <span className="button-icon">⌲</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
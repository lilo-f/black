import { motion } from 'framer-motion';
import ArtistCard from '../components/artist/ArtistCard';
import { artists } from '../data/artists';
import '../styles/Artists.css'

const Artists = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="artists-page"
    >
      <div className="page-header">
        <h1>Nossos Artistas</h1>
        <p>Conheça os talentosos profissionais que transformam sua pele em arte</p>
      </div>
      
      <div className="artists-grid">
        {artists.map((artist) => (
          <ArtistCard 
            key={artist.id}
            artist={artist}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Artists;
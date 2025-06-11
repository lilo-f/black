import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
// import '../../styles/ArtistHeader.css'
const ArtistHeader = ({ artist, onStoryClick }) => {
  return (
    <motion.div 
      className="artist-header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="artist-cover" style={{ backgroundImage: `url(${artist.coverImage})` }}></div>
      
      <div className="artist-info-container">
        <div className="artist-profile">
          <div className="profile-image-container" onClick={onStoryClick}>
            <img 
              src={artist.profileImage} 
              alt={artist.name}
              className="profile-image"
            />
            <div className="story-ring"></div>
          </div>
          
          <div className="artist-meta">
            <h1>{artist.name}</h1>
            <p className="specialty">{artist.specialty}</p>
            <p className="experience">{artist.experience} de experiência</p>
            
            <div className="social-links">
              <a href={`https://instagram.com/${artist.social.instagram}`} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href={`https://facebook.com/${artist.social.facebook}`} target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href={`https://twitter.com/${artist.social.twitter}`} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        
        <div className="artist-bio">
          <p>{artist.bio}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistHeader;
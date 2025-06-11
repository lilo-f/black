import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArtistHeader from '../components/artist/ArtistHeader';
import ArtistGallery from '../components/artist/ArtistGallery';
import ArtistStats from '../components/artist/ArtistStats';
import BookingWidget from '../components/booking/BookingWidget';
import ReviewsSection from '../components/artist/ReviewsSection';
import '../styles/ArtistProfile.css'

const ArtistProfile = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [activeTab, setActiveTab] = useState('gallery');

  useEffect(() => {
    // Simulação de busca sem API
    import('../data/artists').then(module => {
      const foundArtist = module.artists.find(a => a.id === parseInt(id));
      setArtist(foundArtist);
    });
  }, [id]);

  if (!artist) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="artist-profile">
      <ArtistHeader artist={artist} />
      
      <div className="artist-tabs">
        <button onClick={() => setActiveTab('gallery')} className={activeTab === 'gallery' ? 'active' : ''}>
          Portfólio
        </button>
        <button onClick={() => setActiveTab('booking')} className={activeTab === 'booking' ? 'active' : ''}>
          Agendar
        </button>
        <button onClick={() => setActiveTab('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>
          Avaliações ({artist.reviews.length})
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArtistGallery portfolio={artist.portfolio} />
          </motion.div>
        )}

        {activeTab === 'booking' && (
          <motion.div
            key="booking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BookingWidget 
              artistId={artist.id} 
              availability={artist.availability} 
            />
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div
            key="reviews"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewsSection reviews={artist.reviews} />
          </motion.div>
        )}
      </AnimatePresence>

      <ArtistStats stats={artist.stats} />
    </div>
  );
};

export default ArtistProfile;
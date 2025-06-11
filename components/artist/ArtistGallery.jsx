import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryFilter from '../gallery/GalleryFilter';
import Lightbox from '../gallery/Lightbox';
import '../../styles/ArtistGallery.css'
const ArtistGallery = ({ portfolio }) => {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const categories = ['all', ...new Set(portfolio.map(item => item.category))];
  
  const filteredPortfolio = filter === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.category === filter);

  return (
    <div className="artist-gallery">
      <GalleryFilter 
        categories={categories}
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      
      <div className="masonry-grid">
        <AnimatePresence>
          {filteredPortfolio.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="gallery-item"
              onClick={() => setSelectedImage(item)}
            >
              <img 
                src={item.image} 
                alt={item.title}
                loading="lazy"
              />
              <div className="item-overlay">
                <h4>{item.title}</h4>
                <p>{item.year}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {selectedImage && (
          <Lightbox 
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtistGallery;
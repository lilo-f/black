import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../styles/Lightbox.css'
const Lightbox = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="lightbox-content"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
          
          <div className="lightbox-image-container">
            <img 
              src={image.image} 
              alt={image.title}
              className="lightbox-image"
            />
            
            <div className="lightbox-navigation">
              <button className="nav-button prev-button">
                <FaChevronLeft />
              </button>
              <button className="nav-button next-button">
                <FaChevronRight />
              </button>
            </div>
          </div>
          
          <div className="lightbox-info">
            <h3>{image.title}</h3>
            <p>{image.description || 'Sem descrição'}</p>
            <div className="image-meta">
              <span>Técnica: {image.category}</span>
              <span>Ano: {image.year}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
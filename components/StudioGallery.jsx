import '../styles/StudioGallery1.css'
import { motion } from 'framer-motion';

const studioImages = [
  {
    id: 1,
    src: "/images/studio/studio1.jpg",
    caption: "Sala de trabalho principal"
  },
  {
    id: 2,
    src: "/images/studio/studio2.jpg",
    caption: "Área de espera dos clientes"
  },
  // Adicione mais imagens conforme necessário
];

const StudioGallery = () => {
  return (
    <div className="studio-gallery">
      <h3 className="gallery-title">Nosso Espaço</h3>
      <div className="gallery-grid">
        {studioImages.map((image) => (
          <motion.div 
            key={image.id}
            className="gallery-item"
            whileHover={{ scale: 1.03 }}
          >
            <img 
              src={image.src} 
              alt={image.caption}
              loading="lazy"
            />
            <p className="image-caption">{image.caption}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudioGallery;
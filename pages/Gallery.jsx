import { useState } from 'react';
import GalleryFilter from '../components/gallery/GalleryFilter';
import MasonryGrid from '../components/gallery/MasonryGrid';
import Lightbox from '../components/gallery/Lightbox';
import { tattooGallery } from '../data/gallery';
import '../styles/Gallery.css'

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredGallery = filter === 'all' 
    ? tattooGallery 
    : tattooGallery.filter(item => item.category === filter);

  return (
    <div className="gallery-page">
      <div className="page-header">
        <h1>Galeria de Tatuagens</h1>
        <p>Explore nosso portfólio de trabalhos realizados</p>
      </div>
      
      <GalleryFilter 
        categories={['all', ...new Set(tattooGallery.map(item => item.category))]}
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      
      <MasonryGrid 
        items={filteredGallery}
        onItemClick={setSelectedImage}
      />
      
      {selectedImage && (
        <Lightbox 
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Gallery;
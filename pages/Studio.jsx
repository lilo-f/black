import { useState } from 'react';
import StudioGallery from '../components/StudioGallery';
import StudioAmenities from '../components/studio/StudioAmenities';
import StudioSafety from '../components/studio/StudioSafety';
import '../styles/Studio.css'
const Studio = () => {
  const [activeTab, setActiveTab] = useState('gallery');

  return (
    <div className="studio-page">
      <div className="page-header">
        <h1>Nosso Estúdio</h1>
        <p>Um ambiente premium projetado para sua comodidade e segurança</p>
      </div>
      
      <div className="studio-tabs">
        <button
          className={activeTab === 'gallery' ? 'active' : ''}
          onClick={() => setActiveTab('gallery')}
        >
          Galeria
        </button>
        <button
          className={activeTab === 'amenities' ? 'active' : ''}
          onClick={() => setActiveTab('amenities')}
        >
          Comodidades
        </button>
        <button
          className={activeTab === 'safety' ? 'active' : ''}
          onClick={() => setActiveTab('safety')}
        >
          Segurança
        </button>
      </div>
      
      <div className="studio-content">
        {activeTab === 'gallery' && <StudioGallery />}
        {activeTab === 'amenities' && <StudioAmenities />}
        {activeTab === 'safety' && <StudioSafety />}
      </div>
    </div>
  );
};

export default Studio;
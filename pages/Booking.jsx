import { useState } from 'react';
import BookingSteps from '../components/booking/BookingSteps';
import ArtistSelection from '../components/booking/ArtistSelection';
import { artists } from '../data/artists';
import '../styles/Booking.css'
const Booking = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  return (
    <div className="booking-page">
      <div className="page-header">
        <h1>Agende Sua Tatuagem</h1>
        <p>Escolha um artista e reserve seu horário</p>
      </div>
      
      {!selectedArtist ? (
        <ArtistSelection 
          artists={artists}
          onSelect={setSelectedArtist}
        />
      ) : (
        <div className="booking-process">
          <button 
            className="back-button"
            onClick={() => setSelectedArtist(null)}
          >
            ‹ Voltar para artistas
          </button>
          
          <h2>Agendamento com {selectedArtist.name}</h2>
          <BookingSteps artist={selectedArtist} />
        </div>
      )}
    </div>
  );
};

export default Booking;
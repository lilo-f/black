import { useState } from 'react';
import BookingCalendar from './BookingCalendar';
import BookingForm from './BookingForm';
import BookingConfirmation from './BookingConfirmation';
import '../../styles/BookingSteps.css'
const BookingSteps = ({ artist }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: null,
    time: null,
    size: '',
    placement: '',
    description: '',
    referenceImages: []
  });

  const handleDateSelect = (date, time) => {
    setBookingData(prev => ({ ...prev, date, time }));
    setStep(2);
  };

  const handleFormSubmit = (formData) => {
    setBookingData(prev => ({ ...prev, ...formData }));
    setStep(3);
  };

  const handleConfirm = () => {
    // Simular envio de dados
    console.log("Dados do agendamento:", {
      artist: artist.id,
      ...bookingData
    });
    alert("Agendamento simulado com sucesso!");
  };

  return (
    <div className="booking-steps">
      <div className="step-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <span>1</span>
          <p>Data e Hora</p>
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <span>2</span>
          <p>Detalhes</p>
        </div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <span>3</span>
          <p>Confirmação</p>
        </div>
      </div>
      
      <div className="step-content">
        {step === 1 && (
          <BookingCalendar 
            availability={artist.availability}
            onSelect={handleDateSelect}
          />
        )}
        
        {step === 2 && (
          <BookingForm 
            initialData={bookingData}
            onSubmit={handleFormSubmit}
            onBack={() => setStep(1)}
          />
        )}
        
        {step === 3 && (
          <BookingConfirmation 
            artist={artist}
            bookingData={bookingData}
            onConfirm={handleConfirm}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </div>
  );
};

export default BookingSteps;
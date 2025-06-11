import { useState } from 'react';
import { motion } from 'framer-motion';
import BookingCalendar from './BookingCalendar';
import BookingForm from './BookingForm';
import BookingConfirmation from './BookingConfirmation';
// import '../../styles/BookingWidget.css'
const BookingWidget = ({ artistId, availability }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingData, setBookingData] = useState({
    size: '',
    placement: '',
    description: '',
    referenceImages: []
  });

  const handleDateSelect = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep(2);
  };

  const handleFormSubmit = (data) => {
    setBookingData(data);
    setStep(3);
  };

  const handleBookingConfirm = () => {
    // Simular envio sem API
    const fullBooking = {
      artistId,
      date: selectedDate,
      time: selectedTime,
      ...bookingData
    };
    console.log("Agendamento simulado:", fullBooking);
    alert("Agendamento simulado com sucesso! Em um sistema real, isso seria enviado para o servidor.");
  };

  return (
    <div className="booking-widget">
      <div className="booking-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Data</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Detalhes</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Confirmar</div>
      </div>
      
      <div className="step-content">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <BookingCalendar 
                availability={availability}
                onSelect={handleDateSelect}
              />
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <BookingForm 
                initialData={bookingData}
                onSubmit={handleFormSubmit}
                onBack={() => setStep(1)}
              />
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <BookingConfirmation 
                artistId={artistId}
                date={selectedDate}
                time={selectedTime}
                bookingData={bookingData}
                onConfirm={handleBookingConfirm}
                onBack={() => setStep(2)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingWidget;
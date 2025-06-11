import { useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import '../../styles/BookingCalendar.css'
const BookingCalendar = ({ availability, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Gera os próximos 14 dias
  const nextTwoWeeks = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i);
    const dayOfWeek = format(date, 'EEEE', { locale: ptBR });
    
    return {
      date,
      dayOfWeek: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
      day: format(date, 'd'),
      month: format(date, 'MMM', { locale: ptBR }),
      available: availability[format(date, 'EEEE').toLowerCase()]?.length > 0,
      times: availability[format(date, 'EEEE').toLowerCase()] || []
    };
  }).filter(day => day.available);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onSelect(selectedDate, time);
  };

  return (
    <div className="booking-calendar">
      <h3>Selecione uma data disponível</h3>
      
      <div className="calendar-days">
        {nextTwoWeeks.map((day) => (
          <div
            key={day.date.toString()}
            className={`calendar-day ${selectedDate && isSameDay(day.date, selectedDate) ? 'selected' : ''}`}
            onClick={() => handleDateSelect(day.date)}
          >
            <span className="day-name">{day.dayOfWeek.substring(0, 3)}</span>
            <span className="day-number">{day.day}</span>
            <span className="month">{day.month}</span>
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="time-slots">
          <h4>Horários disponíveis:</h4>
          <div className="times-grid">
            {nextTwoWeeks
              .find(day => isSameDay(day.date, selectedDate))
              ?.times.map((time) => (
                <button
                  key={time}
                  className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
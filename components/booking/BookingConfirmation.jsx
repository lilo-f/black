import '../../styles/BookingConfirmation.css'
const BookingConfirmation = ({ artist, bookingData, onConfirm, onBack }) => {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };
  
    return (
      <div className="booking-confirmation">
        <h3>Revise seu agendamento</h3>
        
        <div className="confirmation-details">
          <div className="detail-row">
            <span className="detail-label">Artista:</span>
            <span className="detail-value">{artist.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Data:</span>
            <span className="detail-value">{formatDate(bookingData.date)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Horário:</span>
            <span className="detail-value">{bookingData.time}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Tamanho:</span>
            <span className="detail-value">{bookingData.size || 'Não especificado'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Local no corpo:</span>
            <span className="detail-value">{bookingData.placement || 'Não especificado'}</span>
          </div>
        </div>
        
        <div className="reference-images">
          <h4>Imagens de Referência:</h4>
          {bookingData.referenceImages.length > 0 ? (
            <div className="images-grid">
              {bookingData.referenceImages.map((img, index) => (
                <div key={index} className="image-preview">
                  <img 
                    src={URL.createObjectURL(img)} 
                    alt={`Referência ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhuma imagem enviada</p>
          )}
        </div>
        
        <div className="confirmation-actions">
          <button className="back-button" onClick={onBack}>
            Voltar
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirmar Agendamento
          </button>
        </div>
      </div>
    );
  };
  
  export default BookingConfirmation;
import '../../styles/StudioAmenities.css'
const StudioAmenities = () => {
    const amenities = [
      "Wi-Fi de alta velocidade",
      "Área de espera confortável",
      "Estacionamento privativo"
    ];
  
    return (
      <div className="studio-amenities">
        <h2>Nossas Comodidades</h2>
        <ul>
          {amenities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default StudioAmenities;
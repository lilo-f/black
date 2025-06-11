import '../styles/StudioAmanities.css'
const amenities = [
    {
      title: "Comodidades",
      items: [
        "Wi-Fi de alta velocidade",
        "Área de espera confortável",
        "Café e água gratuitos",
        "Estacionamento privativo"
      ]
    },
    {
      title: "Serviços",
      items: [
        "Consultoria gratuita",
        "Design personalizado",
        "Cuidados pós-tatuagem",
        "Sessões de retoque"
      ]
    }
  ];
  
  const StudioAmenities = () => {
    return (
      <div className="amenities-section">
        <h3>Nossas Comodidades e Serviços</h3>
        <div className="amenities-grid">
          {amenities.map((category, index) => (
            <div key={index} className="amenity-category">
              <h4>{category.title}</h4>
              <ul>
                {category.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default StudioAmenities;
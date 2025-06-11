const StudioSafety = () => {
    const safetyItems = [
      "Equipamentos esterilizados",
      "Certificado de biossegurança",
      "Material descartável"
    ];
  
    return (
      <div className="studio-safety">
        <h2>Padrões de Segurança</h2>
        <ul>
          {safetyItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default StudioSafety;
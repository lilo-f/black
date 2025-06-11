import '../styles/StudioSafety.css'
const safetyProtocols = [
    "Equipamentos esterilizados e descartáveis",
    "Controle rigoroso de higiene",
    "Profissionais certificados em biossegurança",
    "Sistema de exaustão de ar",
    "Limpeza entre cada sessão",
    "Material individual para cada cliente"
  ];
  
  const StudioSafety = () => {
    return (
      <div className="safety-section">
        <h3>Padrões de Segurança</h3>
        <div className="safety-badge">
          <span>Certificado em Biossegurança</span>
        </div>
        <ul className="safety-list">
          {safetyProtocols.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default StudioSafety;
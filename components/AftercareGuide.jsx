import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../styles/AftercareGuide.css'
const AftercareGuide = () => {
  const [activeDay, setActiveDay] = useState(1);

  const careInstructions = [
    {
      day: 1,
      title: "Primeiras 24 horas",
      steps: [
        "Mantenha o curativo por 2-4 horas",
        "Lave suavemente com água morna e sabão neutro",
        "Seque dando leves batidinhas com papel toalha",
        "Aplique uma fina camada de pomada recomendada"
      ]
    },
    // Dias 2-7...
    {
      day: 7,
      title: "Primeira Semana",
      steps: [
        "Continue lavando 2-3 vezes ao dia",
        "Aplique hidratante específico para tatuagens",
        "Evite coçar ou arrancar cascas",
        "Não exponha ao sol ou mergulhe em piscinas/praias"
      ]
    },
    // Dias 8-30...
  ];

  return (
    <div className="aftercare-guide">
      <h2>Guia de Cuidados Pós-Tatuagem</h2>
      
      <div className="timeline">
        {careInstructions.map((day) => (
          <div 
            key={day.day}
            className={`timeline-day ${activeDay === day.day ? 'active' : ''}`}
          >
            <div 
              className="timeline-header"
              onClick={() => setActiveDay(day.day === activeDay ? null : day.day)}
            >
              <h3>{day.title}</h3>
              {activeDay === day.day ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            
            {activeDay === day.day && (
              <ul className="timeline-steps">
                {day.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      
      <div className="aftercare-tips">
        <h3>Dicas Importantes:</h3>
        <ul>
          <li>Não arranque cascas - isso pode remover tinta e causar falhas</li>
          <li>Evite exercícios intensos nos primeiros 3 dias</li>
          <li>Use protetor solar após a cicatrização completa</li>
          <li>Hidrate a pele diariamente</li>
        </ul>
      </div>
    </div>
  );
};

export default AftercareGuide;
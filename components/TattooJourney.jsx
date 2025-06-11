import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/TattooJourney.css';
const TattooJourney = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Consulta Inicial",
      description: "Discuta sua ideia com nosso artista e crie um conceito único para sua tatuagem.",
      image: "/images/journey/consultation.jpg"
    },
    {
      title: "Design Personalizado",
      description: "Nosso artista cria um design exclusivo baseado em sua ideia. Você pode solicitar ajustes.",
      image: "/images/journey/design.jpg"
    },
    // +3 steps...
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  return (
    <section className="tattoo-journey">
      <h2>Sua Jornada na Black Ink Masters</h2>
      
      <div className="journey-container">
        <button className="nav-button prev-button" onClick={prevStep}>
          ‹
        </button>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="journey-step"
          >
            <div className="step-image">
              <img src={steps[currentStep].image} alt={steps[currentStep].title} />
            </div>
            <div className="step-content">
              <h3>{steps[currentStep].title}</h3>
              <p>{steps[currentStep].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <button className="nav-button next-button" onClick={nextStep}>
          ›
        </button>
      </div>
      
      <div className="step-indicators">
        {steps.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentStep ? 'active' : ''}`}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default TattooJourney;
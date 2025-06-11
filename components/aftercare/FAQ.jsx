// import '../style/FAQ.css'; // Importe o CSS do componente
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import '../../styles/FAQ.css'
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "Quanto tempo leva para uma tatuagem cicatrizar?",
      answer: "O tempo de cicatrização varia de 2 a 4 semanas para a cicatrização superficial, mas pode levar até 2 meses para cicatrização completa das camadas mais profundas da pele."
    },
    // +7 perguntas...
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {faqItems.map((item, index) => (
        <div 
          key={index}
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
        >
          <div 
            className="faq-question"
            onClick={() => toggleFAQ(index)}
          >
            <h3>{item.question}</h3>
            {activeIndex === index ? <FaMinus /> : <FaPlus />}
          </div>
          
          {activeIndex === index && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
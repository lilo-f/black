import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPizzaSlice, FaSpinner } from 'react-icons/fa';
import { GiTiger } from 'react-icons/gi';
import '../styles/PromoModal.css';

const PromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [prize, setPrize] = useState(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  const pizzaSlices = [
    { id: 1, name: "10% OFF", coupon: "TIGER10", color: "#FF6B6B", textColor: "#FFF" },
    { id: 2, name: "TATTOO GRÁTIS", coupon: "TIGERFREE", color: "#4ECDC4", textColor: "#FFF" },
    { id: 3, name: "DESIGN VIP", coupon: "TIGERVIP", color: "#FFD166", textColor: "#333" },
    { id: 4, name: "15% OFF", coupon: "TIGER15", color: "#06D6A0", textColor: "#FFF" },
    { id: 5, name: "KIT PREMIUM", coupon: "TIGERKIT", color: "#118AB2", textColor: "#FFF" },
    { id: 6, name: "CONSULTA", coupon: "TIGERCON", color: "#A05195", textColor: "#FFF" },
    { id: 7, name: "20% OFF", coupon: "TIGER20", color: "#FFA630", textColor: "#FFF" },
    { id: 8, name: "BRINDE", coupon: "TIGERGIFT", color: "#7B2CBF", textColor: "#FFF" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const spinPizza = () => {
    if (!formData.name || !formData.email || isSpinning) return;

    setIsSpinning(true);
    setHasSpun(false);

    const selectedSliceIndex = Math.floor(Math.random() * pizzaSlices.length);
    const selectedPrize = pizzaSlices[selectedSliceIndex];
    const spins = 5;
    const sliceAngle = 360 / pizzaSlices.length;
    const targetRotation = 360 * spins + (sliceAngle * selectedSliceIndex);
    
    setRotation(prev => prev + targetRotation);

    setTimeout(() => {
      setPrize(selectedPrize);
      setIsSpinning(false);
      setHasSpun(true);
      triggerConfetti();
    }, 5000);
  };

  const triggerConfetti = () => {
    const confettiCount = 150;
    const container = document.createElement('div');
    container.className = 'confetti-container';
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = pizzaSlices[Math.floor(Math.random() * pizzaSlices.length)].color;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(confetti);
    }
    
    if (wheelRef.current) {
      wheelRef.current.appendChild(container);
      setTimeout(() => container.remove(), 5000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="pizza-modal-overlay">
          <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="pizza-modal-container"
          >
            <div className="modal-header">
              <div className="header-content">
                <FaPizzaSlice className="pizza-icon" />
                <h2>PIZZA ROULETTE <span>BLACK TIGER</span></h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="pizza-wheel-container" ref={wheelRef}>
                <div 
                  className={`pizza-wheel ${isSpinning ? 'spinning' : ''}`}
                  style={{ 
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning 
                      ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
                      : 'none'
                  }}
                >
                  {pizzaSlices.map((slice, index) => {
                    const angle = (360 / pizzaSlices.length) * index;
                    return (
                      <div 
                        key={slice.id}
                        className="pizza-slice"
                        style={{
                          transform: `rotate(${angle}deg)`,
                          '--slice-color': slice.color,
                          '--text-color': slice.textColor,
                          '--slice-angle': `${360 / pizzaSlices.length}deg`
                        }}
                      >
                        <div className="slice-content">
                          <div className="slice-text">{slice.name}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pizza-center">
                    <GiTiger className="tiger-icon" />
                  </div>
                </div>
                <div className="pizza-cutter"></div>
              </div>

              <motion.button
                onClick={spinPizza}
                disabled={!formData.name || !formData.email || isSpinning}
                className="spin-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSpinning ? (
                  <>
                    <FaSpinner className="spinner" />
                    <span>ASSANDO SUA PIZZA...</span>
                  </>
                ) : (
                  <span>GIRAR PIZZA</span>
                )}
              </motion.button>

              <div className="form-section">
                {!hasSpun ? (
                  <div className="form-container">
                    <h3>ESCOLHA SUA FATIA DA SORTE</h3>
                    <div className="input-group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Seu nome"
                        className="form-input"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Seu melhor e-mail"
                        className="form-input"
                      />
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="result-container"
                  >
                    <div className="result-card">
                      <div className="card-glow" style={{ backgroundColor: prize.color }} />
                      <FaPizzaSlice className="pizza-icon" style={{ color: prize.color }} />
                      <div className="result-content">
                        <h4>PARABÉNS!</h4>
                        <p className="prize-name">Você ganhou: {prize.name}</p>
                        <div className="coupon-box">
                          <span>SEU CUPOM:</span>
                          <div className="coupon-code">{prize.coupon}</div>
                        </div>
                        <button className="copy-btn">COPIAR CUPOM</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <p>Promoção válida até {new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString('pt-BR')}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoModal;
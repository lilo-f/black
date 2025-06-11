import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/StudioShowcase.css';
const StudioShowcase = () => {
  const studioFeatures = [
    {
      title: "Ambiente Premium",
      description: "Nosso estúdio foi projetado para seu conforto e segurança",
      image: "/public/img/skt.png"
    },
    {
      title: "Equipamentos de Primeira",
      description: "Utilizamos apenas materiais da mais alta qualidade",
      image: "/public/img/skt.png"
    },
    {
      title: "Certificado de Segurança",
      description: "Seguimos os mais rigorosos protocolos de biossegurança",
      image: "/public/img/skt.png"
    }
  ];

  return (
    <section className="studio-showcase">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="showcase-header"
      >
        <h2>Conheça Nosso Estúdio</h2>
        <p>Um ambiente exclusivo para criar arte na pele com conforto e segurança</p>
      </motion.div>

      <div className="features-grid">
        {studioFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="feature-image-container">
              <img 
                src={feature.image} 
                alt={feature.title}
                loading="lazy"
              />
            </div>
            <div className="feature-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="showcase-footer"
      >
        <Link to="/studio" className="cta-button">
          Visite Virtualmente Nosso Estúdio
        </Link>
      </motion.div>
    </section>
  );
};

export default StudioShowcase;
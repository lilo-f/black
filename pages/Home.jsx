import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturedArtists from '../components/artist/FeaturedArtists';
import StudioShowcase from '../components/StudioShowcase';
import TattooJourney from '../components/TattooJourney';
import InstagramFeed from '../components/InstagramFeed';
import PromoModal from '../components/PromoModal';  // Corrigido o nome da importação
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <PromoModal />  {/* Adicionando o modal de promoção */}
      
      <div className="black-tiger-marquee">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: '-100%' }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
          className="marquee-container"
        >
          <div className="marquee-content">
            BLACK TIGER TATTOO <span className="orange-bullet">•</span> Arte Permanente <span className="orange-bullet">•</span> Tatuagem Customizada <span className="orange-bullet">•</span> Estúdio Profissional <span className="orange-bullet">•</span> 
            BLACK TIGER TATTOO <span className="orange-bullet">•</span> Consulta Gratuita <span className="orange-bullet">•</span> Tattoo Artist <span className="orange-bullet">•</span> Since 2010 <span className="orange-bullet"></span>
          </div>
          <div className="marquee-content">
            BLACK TIGER TATTOO <span className="orange-bullet">•</span> Arte Permanente <span className="orange-bullet">•</span> Tatuagem Customizada <span className="orange-bullet">•</span> Estúdio Profissional <span className="orange-bullet">•</span> 
            BLACK TIGER TATTOO <span className="orange-bullet">•</span> Consulta Gratuita <span className="orange-bullet">•</span> Tattoo Artist <span className="orange-bullet">•</span> Since 2010 <span className="orange-bullet"></span>
          </div>
        </motion.div>
      </div>
      
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="section featured-artists"
      >
        <div className="container">
          <FeaturedArtists />
        </div>
      </motion.section>
      
      <StudioShowcase />
      
      <TattooJourney />
      
      <InstagramFeed />
    </div>
  );
};

export default Home;
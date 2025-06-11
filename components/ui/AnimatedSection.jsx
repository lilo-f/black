import { motion } from 'framer-motion';
import '../../styles/AnimatedSelection.css'
const AnimatedSection = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`animated-section ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
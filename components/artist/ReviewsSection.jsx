import { motion } from 'framer-motion';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../../styles/ReviewsSection.css'
const ReviewsSection = ({ reviews = [] }) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => {
      const starValue = i + 1;
      if (rating >= starValue) {
        return <FaStar key={i} className="star filled" />;
      } else if (rating >= starValue - 0.5) {
        return <FaStarHalfAlt key={i} className="star half-filled" />;
      }
      return <FaRegStar key={i} className="star" />;
    });
  };

  return (
    <div className="reviews-container">
      <h3 className="section-title">Avaliações dos Clientes</h3>
      
      {reviews.length === 0 ? (
        <p className="no-reviews">Nenhuma avaliação disponível ainda.</p>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="review-header">
                <img 
                  src={review.clientPhoto || '/images/clients/default.jpg'} 
                  alt={review.client}
                  className="client-avatar"
                />
                <div>
                  <h4>{review.client}</h4>
                  <div className="rating">
                    {renderStars(review.rating)}
                    <span className="rating-value">{review.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <p className="review-text">{review.comment}</p>
              <span className="review-date">{review.date}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
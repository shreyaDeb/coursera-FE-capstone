// TestimonialCard.jsx
import { CiStar } from "react-icons/ci";
import '../styles.css';

const TestimonialCard = ({ name, rating, text, avatar }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-avatar">
        <div className="testimonial-avatar-inner">
          {avatar}
        </div>
      </div>
      <div className="testimonial-content">
        <h4 className="testimonial-name">{name}</h4>
        <p className="testimonial-text">{text}</p>
        <div className="testimonial-rating">
          {[...Array(5)].map((_, i) => (
            <CiStar
              key={i}
              className={`star-icon ${i < rating ? 'star-filled' : 'star-empty'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
import { useRef } from 'react';
import SpecialCard from './card';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import '../styles.css';
import sushi from '../images/sushiset.png'
import biriyani from '../images/biriyani.png'
import mousakka from '../images/mousakka.png'
import salad from '../images/salad.png'
import shrimpTempura from '../images/shrimp.png'
import { useNavigate } from 'react-router-dom';

const Specials = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const specials = [
    {
      image: sushi,
      title: "Sushi Set",
      price: "$18.50",
      description: "An assortment of fresh nigiri and maki rolls featuring tuna, salmon, and avocado, served with soy sauce, wasabi, and pickled ginger.",
      serves: "Serves 1-2"
    },
    {
      image: mousakka,
      title: "Moussaka",
      price: "$10.75",
      description: "A hearty Greek casserole of layered eggplant, minced lamb, and creamy béchamel sauce, baked to golden perfection.",
      serves: "Serves 1"
    },
    {
      image: biriyani,
      title: "Chicken Biriyani",
      price: "$23.00",
      description: "Fragrant basmati rice layered with spiced chicken, caramelized onions, and fresh herbs, served with raita on the side.",
      serves: "Serves 1-2"
    },
    {
      image: salad,
      title: "Greek Salad",
      price: "$8.50",
      description: "Fresh cucumber, tomato, olives, feta cheese, and red onion drizzled with olive oil and herbs. A refreshing start to your meal.",
      serves: "Serves 1"
    },
    {
      image: shrimpTempura,
      title: "Shrimp Tempura",
      price: "$15.25",
      description: "Crispy battered shrimp served with a sweet and savory dipping sauce. Perfect as an appetizer or a light meal.",
      serves: "Serves 1-2"
    }
  ];

  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = container.firstChild.offsetWidth + 16; // includes gap
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="specials-section">
      <div className="specials-container">
        <div className="specials-header">
          <h2 className="specials-title">Specials</h2>
          <button className="menu-button" onClick={() => navigate("/menu")}>Online Menu</button>
        </div>
        <div className="specials-carousel">
          <div className="specials-grid" ref={carouselRef}>
            {specials.map((special, index) => (
              <SpecialCard key={index} {...special} />
            ))}
          </div>
          <button className="carousel-button carousel-button-left" onClick={() => scroll("left")}>
            <FaChevronLeft style={{ width: '1.5rem', height: '1.5rem' }} />
          </button>
          <button className="carousel-button carousel-button-right" onClick={() => scroll("right")}>
            <FaChevronRight style={{ width: '1.5rem', height: '1.5rem' }} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Specials;

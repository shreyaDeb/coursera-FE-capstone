import { useNavigate } from "react-router-dom";
import '../styles.css';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">LITTLE LEMON</h1>
                <p className="hero-subtitle">CHICAGO</p>
                <p className="hero-description">
                    Little Lemon is a charming neighborhood bistro that serves simple food and classic
                    cocktails in a lively but casual environment. The restaurant features a locally-sourced
                    menu with daily specials.
                </p>
                <button className="hero-button" onClick={() => navigate("/booking")}>Book Now</button>
            </div>
        </section>
    );
};

export default Hero;

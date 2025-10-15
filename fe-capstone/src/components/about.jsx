import '../styles.css'
const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-grid">
          <div>
            <h2 className="about-title">LITTLE LEMON</h2>
            <p className="about-subtitle">CHICAGO</p>
            <p className="about-text">
              Little Lemon is a charming neighborhood bistro that serves simple food and classic
              cocktails in a lively but casual environment. The restaurant features a locally-sourced menu
              with daily specials.
            </p>
            <p className="about-text">
              From freshly baked focaccia and hand-tossed pastas to signature lemon-infused desserts,
              every dish at Little Lemon celebrates freshness and flavor. The cozy, sunlit dining room and
              warm yellow accents create an inviting atmosphere perfect for family dinners, casual get-
              togethers, or date nights.
            </p>
            <p className="about-text">
              The bar features classic cocktails with a creative spin, alongside a curated wine list and craft
              beers from nearby breweries. With friendly service, weekend live music, and an ever-
              changing list of daily specials, Little Lemon is more than just a restaurant — it's a
              community favorite that brings people together over good food and great company.
            </p>
          </div>
          <div className="about-image">
            <div className="about-image-inner">
              🍋
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

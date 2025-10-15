import '../styles.css';

const SpecialCard = ({ image, title, price, description, serves }) => {
    return (
        <div className="special-card">
            {typeof image === 'string' && (image.includes('/') || image.startsWith('http')) ? (
                <img src={image} alt={title} className="special-card-image" />
            ) : (
                <div className="special-card-emoji">{image}</div>
            )}

            <div className="special-card-title-price">
                <h3 className="special-card-title">{title}</h3>
                <span className="special-card-price">{price}</span>
            </div>

            <p className="special-card-description">{description}</p>
            <p className="special-card-serves">{serves}</p>
        </div>
    );
};

export default SpecialCard;

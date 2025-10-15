import { CiMapPin, CiMail } from "react-icons/ci";
import { MdPhoneEnabled } from "react-icons/md";
import '../styles.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-logo-wrapper">
                        <div className="footer-logo-box">
                            <span>🍋</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="footer-section-title">Navigation</h3>
                        <ul className="footer-list">
                            <li className="footer-list-item"><a href="#home" className="footer-link">Home</a></li>
                            <li className="footer-list-item"><a href="#about" className="footer-link">About</a></li>
                            <li className="footer-list-item"><a href="#menu" className="footer-link">Menu</a></li>
                            <li className="footer-list-item"><a href="#reserve" className="footer-link">Reserve</a></li>
                            <li className="footer-list-item"><a href="#order" className="footer-link">Order</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="footer-section-title">Contacts</h3>
                        <ul className="footer-list">
                            <li className="contact-item">
                                <CiMapPin className="contact-icon" />
                                <span>Somewhere in Chicago,<br />12345, USA</span>
                            </li>
                            <li className="contact-item">
                                <CiMail className="contact-icon" />
                                <span>littleLemon@example.com</span>
                            </li>
                            <li className="contact-item">
                                <MdPhoneEnabled className="contact-icon" />
                                <span>+1 (123) 456-7890</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="footer-section-title">Socials</h3>
                        <div>
                            <p className="social-text">Facebook</p>
                            <p className="social-text">Instagram</p>
                            <p className="social-text">Twitter/X</p>
                        </div>
                        <h3 className="footer-download-title">Download</h3>
                        <div>
                            <p className="download-text">Android</p>
                            <p className="download-text">iOS</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
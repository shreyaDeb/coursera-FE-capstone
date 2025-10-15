import { FaUser, FaShoppingCart } from "react-icons/fa";
import '../styles.css';
import logo from '../images/Logo.png'

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-wrapper">
                    <div className="logo-icon">
                        <img src={logo}></img>
                    </div>
                </div>
                <nav className="nav">
                    <a href="/" className="nav-link">Home</a>
                    <a href="#about" className="nav-link">About</a>
                    <a href="/menu" className="nav-link">Menu</a>
                    <a href="/booking" className="nav-link">Reserve</a>
                    <a href="/order" className="nav-link">Order</a>
                    <button className="nav-button"><FaShoppingCart /></button>
                    <button className="nav-button"><FaUser /></button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
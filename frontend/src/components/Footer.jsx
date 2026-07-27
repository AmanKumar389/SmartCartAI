import { Link } from "react-router-dom";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaGithub,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section">
                    <h2>🛒 SmartCart AI</h2>
                    <p>Your AI Powered Shopping Assistant</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/orders">Orders</Link>
                    <Link to="/login">Login</Link>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>

                    <p>📧 supportAman@gmail.com</p>
                    <p>📞 +91 9470789733</p>
                    <p>📍 Greater Noida, India</p>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>

                    <div className="social-icons">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedin /></a>
                        <a href="#"><FaGithub /></a>
                    </div>
                </div>

            </div>

            <hr />

            <p className="copyright">
                © 2026 SmartCart AI | All Rights Reserved.
            </p>
        </footer>
    );
}

export default Footer;
import { Link } from "react-router-dom";
import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Linkedin
} from "lucide-react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/*Logo and Description*/}
                    <div className="footer-section">
                        <h2 className="footer-logo">TRAVELO</h2>
                        <p className="footer-text">
                            Discovering the Middle Kingdom, one journey at a time.
                        </p>
                        <div className="social-icons">
                            <link rel="stylesheet" href="https://www.facebook.com/" /><Facebook size={20} />
                            <link rel="stylesheet" href="https://www.twitter.com/" /><Twitter size={20} />
                            <link rel="stylesheet" href="https://www.instagram.com/" /><Instagram size={20} />
                            <link rel="stylesheet" href="https://www.linkedin.com/" /><Linkedin size={20} />
                        </div>
                    </div>

                    {/*Quick Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/destinations">Destinations</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/*Contact Info*/}
                    <div className="footer-section">
                        <h3 className="footer-title">Contact Info</h3>
                        <div className="footer-contact-list">
                            <div className="footer-contact-item">
                                <MapPin size={18} className="footer-icon" />
                                <span className="content-left">Turkey, Istanbul</span>
                            </div>
                            <div className="footer-contact-item ">
                                <Phone size={18} className="footer-icon" />
                                <span className="content-left">+90 555 555 5555</span>
                            </div>
                            <div className="footer-contact-item">
                                <Mail size={18} className="footer-icon" />
                                <span className="content-left" >info@travelo.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Travelo, Inc. All rights reserved. Designed by Abi's Team.</p>
                </div>
            </div>
        </footer>
    );
}

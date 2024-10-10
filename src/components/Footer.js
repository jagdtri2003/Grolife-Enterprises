import React from 'react';
import '../style/footer.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: <a style={{textDecoration:'none',color:'inherit'}} href="mailto:grolife.2020@gmail.com">grolife.2020@gmail.com</a> </p>
                    <p>Phone:<a style={{textDecoration:'none',color:'inherit'}} href="tel:+919315884084"> +91 9315884084</a> </p>
                    <p>Address: New Delhi, Delhi 110002</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href='#'>FAQ</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://wa.me/9315884084?text=Hello%2C%20I%20would%20like%20more%20information" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Shop Timing</h4>
                    <p>Everyday: 9:00 AM - 6:00 PM</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} 
                   <span className='footer-name'><a style={{textDecoration:'none',color:'inherit'}} href="mailto:jagdtri2003@gmail.com"> Jagdamba Tripathi</a></span>. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <>
    <style>{`
      .footer-tulika {
        background: linear-gradient(135deg, #2c3e50, #34495e);
        color: #fff;
        margin-top: auto;
      }
      
      .footer-brand {
        font-size: 1.5rem;
        font-weight: 700;
        color: #d4af37;
        margin-bottom: 1rem;
      }
      
      .footer-link {
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        transition: color 0.3s ease;
      }
      
      .footer-link:hover {
        color: #d4af37;
      }
      
      .social-icon {
        width: 40px;
        height: 40px;
        background: rgba(212, 175, 55, 0.2);
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.5rem;
        transition: all 0.3s ease;
        color: #d4af37;
        text-decoration: none;
      }
      
      .social-icon:hover {
        background: #d4af37;
        color: #fff;
        transform: translateY(-2px);
      }
    `}</style>

    <footer className="footer-tulika py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="footer-brand">Tulika Arts Gallery</div>
            <p className="text-muted mb-4">
              Discover exceptional artworks from talented artists worldwide.
              Your gateway to contemporary and traditional art collections.
            </p>
            <div className="d-flex">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="text-uppercase mb-3" style={{ color: '#d4af37' }}>Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="footer-link">Home</Link></li>
              <li className="mb-2"><Link to="/gallery" className="footer-link">Gallery</Link></li>
              <li className="mb-2"><Link to="/about" className="footer-link">About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="text-uppercase mb-3" style={{ color: '#d4af37' }}>Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><span className="footer-link">Contemporary Art</span></li>
              <li className="mb-2"><span className="footer-link">Traditional Paintings</span></li>
              <li className="mb-2"><span className="footer-link">Sculptures</span></li>
              <li className="mb-2"><span className="footer-link">Mixed Media</span></li>
            </ul>
          </div>

          <div className="col-lg-3 mb-4">
            <h6 className="text-uppercase mb-3" style={{ color: '#d4af37' }}>Contact Info</h6>
            <div className="text-muted">
              <p className="mb-2">
                <i className="fas fa-map-marker-alt me-2" style={{ color: '#d4af37' }}></i>
                123 Art Street, Gallery District
              </p>
              <p className="mb-2">
                <i className="fas fa-phone me-2" style={{ color: '#d4af37' }}></i>
                +91 9822686764
              </p>
              <p className="mb-2">
                <i className="fas fa-envelope me-2" style={{ color: '#d4af37' }}></i>
                info@tulikaarts.com
              </p>
            </div>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }} />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-muted">
              © 2025 Tulika Arts Gallery. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <span className="text-muted">Made with </span>
            <span style={{ color: '#d4af37' }}>♥</span>
            <span className="text-muted"> for art lovers</span>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;

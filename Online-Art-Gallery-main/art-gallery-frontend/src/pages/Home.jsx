import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { getArtworkImage } from "../utils/artwork";

import k9 from "../images/k9.jpg";
import k3 from "../images/k3.jpg";
import k8 from "../images/k8.jpg";
import k1 from "../images/k1.jpeg";
import k5 from "../images/k5.jpg";
import k15 from "../images/k15.jpg";
import k16 from "../images/k16.jpg";
import k19 from "../images/k19.jpg";
import k20 from "../images/k20.jpg";
import k17 from "../images/k17.jpg";

const Home = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    api.get("/artworks").then(res => {
      setFeaturedArtworks(res.data.slice(0, 6));
    }).catch(() => {});
  }, []);

  const heroSlides = [
    { img: k3, title: "Tulika Arts Gallery", subtitle: "Discover Exceptional Art", desc: "Curated collection of contemporary and traditional artworks" },
    { img: k9, title: "Featured Artists", subtitle: "Renowned & Emerging", desc: "Showcasing talent from established and upcoming artists" },
    { img: k20, title: "Art Collections", subtitle: "Paintings • Sculptures • Mixed Media", desc: "Diverse range of artistic expressions and mediums" }
  ];

  const featuredArtists = [
    { name: "Amit Bhar", specialty: "Contemporary Paintings", image: k16 },
    { name: "Anjolie Ela Menon", specialty: "Abstract Art", image: k5 },
    { name: "Thota Vaikuntam", specialty: "Traditional Art", image: k15 },
    { name: "Seema Kohli", specialty: "Mixed Media", image: k8 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div 
          className="hero-background" 
          style={{ backgroundImage: `url(${heroSlides[currentSlide].img})` }}
        />
        <div className="hero-content fade-in-up">
          <h1 className="display-title mb-4 text-warning">{heroSlides[currentSlide].title}</h1>
          <h3 className="mb-3" style={{color: '#ffffffff'}}>{heroSlides[currentSlide].subtitle}</h3>
          <p className="lead mb-4">{heroSlides[currentSlide].desc}</p>
          <Link to="/gallery" className="btn btn-primary-custom me-3">Explore Gallery</Link>
          <Link to="/about" className="btn btn-secondary-custom">Learn More</Link>
        </div>
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm mx-1 ${index === currentSlide ? 'btn-warning' : 'btn-outline-light'}`}
              style={{width: '12px', height: '12px', borderRadius: '50%', padding: 0}}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="container py-5">
        <div className="text-center mb-5 fade-in-up">
          <h2 className="section-title">Welcome to Tulika Arts Gallery</h2>
          <p className="lead text-muted mx-auto" style={{maxWidth: '600px'}}>
            Experience the finest collection of contemporary and traditional artworks. 
            Our gallery showcases exceptional pieces from renowned and emerging artists.
          </p>
        </div>

        {/* Features */}
        <div className="row g-4 mb-5">
          {[
            { icon: '🎨', title: 'Curated Collection', desc: 'Handpicked artworks from talented artists worldwide' },
            { icon: '🏆', title: 'Quality Assured', desc: 'Authentic pieces with certificates of authenticity' },
            { icon: '🚚', title: 'Secure Delivery', desc: 'Professional packaging and worldwide shipping' }
          ].map((feature, index) => (
            <div key={index} className={`col-md-4 fade-in-up fade-in-up-delay-${index + 1}`}>
              <div className="text-center p-4 h-100 bg-white rounded shadow-sm">
                <div className="fs-1 mb-3">{feature.icon}</div>
                <h5 className="mb-3">{feature.title}</h5>
                <p className="text-muted">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Artworks */}
      {featuredArtworks.length > 0 && (
        <div className="featured-section">
          <div className="container">
            <h2 className="section-title">Featured Artworks</h2>
            <div className="gallery-grid">
              {featuredArtworks.map((artwork, index) => {
                const imageSrc = getArtworkImage(artwork);
                return (
                  <div key={artwork.id} className={`art-card fade-in-up fade-in-up-delay-${index % 3 + 1}`}>
                    {imageSrc && (
                      <img src={imageSrc} alt={artwork.title} />
                    )}
                    <div className="p-4">
                      <h5 className="mb-2">{artwork.title}</h5>
                      <p className="text-muted mb-2">by {artwork.artist}</p>
                      <p className="small text-muted mb-3">{artwork.description?.substring(0, 100)}...</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-primary">₹{Number(artwork.price).toLocaleString()}</span>
                        <Link to={`/artwork/${artwork.id}`} className="btn btn-sm btn-outline-primary">View Details</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-4">
              <Link to="/gallery" className="btn btn-primary-custom">View All Artworks</Link>
            </div>
          </div>
        </div>
      )}

      {/* Featured Artists */}
      <div className="container py-5">
        <h2 className="section-title">Featured Artists</h2>
        <div className="row g-4">
          {featuredArtists.map((artist, index) => (
            <div key={index} className={`col-md-3 fade-in-up fade-in-up-delay-${index + 1}`}>
              <div className="artist-card">
                <img src={artist.image} alt={artist.name} />
                <div className="artist-info">
                  <h6 className="artist-name">{artist.name}</h6>
                  <p className="artist-specialty">{artist.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h3 className="mb-3">Start Your Art Collection Today</h3>
          <p className="lead text-muted mb-4">Discover unique pieces that speak to your soul</p>
          <Link to="/gallery" className="btn btn-primary-custom me-3">Browse Gallery</Link>
          <Link to="/contact" className="btn btn-secondary-custom">Get in Touch</Link>
        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import k3 from "../images/k3.jpg";
import k8 from "../images/k8.jpg";
import k15 from "../images/k15.jpg";

const About = () => {
  return (
    <>
     
      <div className="hero-section" style={{height: '60vh'}}>
        <div 
          className="hero-background" 
          style={{ backgroundImage: `url(${k3})` }}
        />
        <div className="hero-content">
          <h1 className="display-title mb-4 text-warning">About Tulika Arts Gallery</h1>
          <p className="lead">Celebrating art, artists, and the stories they tell</p>
        </div>
      </div>

     
      <div className="container py-5">
       
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 fade-in-up">
            <h2 className="section-title text-start">Our Story</h2>
            <p className="lead text-muted mb-4">
              Tulika Arts Gallery was founded with a vision to bridge the gap between 
              exceptional artists and art enthusiasts worldwide.
            </p>
            <p className="mb-4">
              Since our inception, we have been committed to showcasing diverse artistic 
              expressions, from contemporary masterpieces to traditional art forms. 
              Our gallery serves as a platform where creativity meets appreciation, 
              and where every piece tells a unique story.
            </p>
            <p>
              We believe that art has the power to transform spaces, inspire minds, 
              and connect hearts across cultures and generations.
            </p>
          </div>
          <div className="col-lg-6 fade-in-up fade-in-up-delay-1">
            <img src={k8} alt="Gallery Interior" className="img-fluid rounded shadow" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="row g-4 mb-5">
          <div className="col-md-6 fade-in-up">
            <div className="bg-white p-5 rounded shadow-sm h-100">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle" 
                     style={{width: '60px', height: '60px'}}>
                  <i className="fas fa-bullseye text-white"></i>
                </div>
              </div>
              <h4 className="text-center mb-3">Our Mission</h4>
              <p className="text-muted text-center">
                To provide a premier platform for artists to showcase their work 
                and for art lovers to discover, appreciate, and acquire exceptional 
                pieces that resonate with their aesthetic sensibilities.
              </p>
            </div>
          </div>
          <div className="col-md-6 fade-in-up fade-in-up-delay-1">
            <div className="bg-white p-5 rounded shadow-sm h-100">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-warning rounded-circle" 
                     style={{width: '60px', height: '60px'}}>
                  <i className="fas fa-eye text-white"></i>
                </div>
              </div>
              <h4 className="text-center mb-3">Our Vision</h4>
              <p className="text-muted text-center">
                To become the leading destination for art discovery and acquisition, 
                fostering a global community where artistic expression is celebrated, 
                preserved, and made accessible to all.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-5">
          <h2 className="section-title">Our Values</h2>
        </div>
        
        <div className="row g-4 mb-5">
          {[
            {
              icon: 'fas fa-certificate',
              title: 'Authenticity',
              description: 'Every artwork in our collection is carefully verified for authenticity and comes with proper documentation.'
            },
            {
              icon: 'fas fa-users',
              title: 'Community',
              description: 'We foster a vibrant community of artists, collectors, and art enthusiasts who share a passion for creativity.'
            },
            {
              icon: 'fas fa-star',
              title: 'Excellence',
              description: 'We maintain the highest standards in curation, presentation, and customer service.'
            },
            {
              icon: 'fas fa-handshake',
              title: 'Trust',
              description: 'We build lasting relationships based on transparency, reliability, and mutual respect.'
            }
          ].map((value, index) => (
            <div key={index} className={`col-md-3 fade-in-up fade-in-up-delay-${index + 1}`}>
              <div className="text-center p-4">
                <div className="mb-3">
                  <i className={`${value.icon} fa-2x`} style={{color: '#d4af37'}}></i>
                </div>
                <h5 className="mb-3">{value.title}</h5>
                <p className="text-muted small">{value.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Highlights */}
        <div className="featured-section">
          <div className="container">
            <h2 className="section-title">Why Choose Tulika Arts Gallery</h2>
            <div className="row g-4">
              <div className="col-lg-4 fade-in-up">
                <div className="text-center">
                  <img src={k15} alt="Curated Collection" className="img-fluid rounded mb-3" style={{height: '200px', objectFit: 'cover', width: '100%'}} />
                  <h5>Curated Collection</h5>
                  <p className="text-muted">Handpicked artworks from talented artists across various mediums and styles.</p>
                </div>
              </div>
              <div className="col-lg-4 fade-in-up fade-in-up-delay-1">
                <div className="text-center">
                  <div className="bg-light rounded d-flex align-items-center justify-content-center mb-3" style={{height: '200px'}}>
                    <i className="fas fa-shipping-fast fa-4x text-primary"></i>
                  </div>
                  <h5>Secure Shipping</h5>
                  <p className="text-muted">Professional packaging and insured delivery to ensure your artwork arrives safely.</p>
                </div>
              </div>
              <div className="col-lg-4 fade-in-up fade-in-up-delay-2">
                <div className="text-center">
                  <div className="bg-light rounded d-flex align-items-center justify-content-center mb-3" style={{height: '200px'}}>
                    <i className="fas fa-headset fa-4x text-warning"></i>
                  </div>
                  <h5>Expert Support</h5>
                  <p className="text-muted">Our team of art experts is here to guide you through your art acquisition journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-5">
          <h3 className="mb-4">Ready to Start Your Art Journey?</h3>
          <p className="lead text-muted mb-4">Explore our collection and discover the perfect piece for your space</p>
          <div>
            <a href="/gallery" className="btn btn-primary-custom me-3">Browse Gallery</a>
            <a href="/contact" className="btn btn-secondary-custom">Contact Us</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
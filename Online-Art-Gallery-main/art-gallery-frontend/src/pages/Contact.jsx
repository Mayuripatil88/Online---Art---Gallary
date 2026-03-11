import React, { useState } from "react";
import api from "../utils/api";
import k17 from "../images/k17.jpg";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post("/feedback", form);
      alert("Thank you for your feedback! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Could not connect to server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section" style={{ height: '50vh' }}>
        <div
          className="hero-background"
          style={{ backgroundImage: `url(${k17})` }}
        />
        <div className="hero-content">
          <h1 className="display-title mb-4 text-warning">Contact Us</h1>
          <p className="lead">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          {/* Contact Information */}
          <div className="col-lg-6 mb-5">
            <h2 className="section-title text-start">Get in Touch</h2>
            <p className="lead text-muted mb-4">
              Have questions about our artworks, need assistance with your order,
              or want to share feedback? We're here to help!
            </p>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '50px', height: '50px' }}>
                      <i className="fas fa-map-marker-alt text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Address</h6>
                    <p className="text-muted mb-0">
                      123 Art Street<br />
                      Gallery District<br />
                      Mumbai, India 400001
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-success rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '50px', height: '50px' }}>
                      <i className="fas fa-phone text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Phone</h6>
                    <p className="text-muted mb-0">
                      +91 9822686764<br />
                      +91 8623845795<br />
                      +91 9890926683
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-info rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '50px', height: '50px' }}>
                      <i className="fas fa-envelope text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Email</h6>
                    <p className="text-muted mb-0">
                      info@tulikaarts.com<br />
                      support@tulikaarts.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: '50px', height: '50px' }}>
                      <i className="fas fa-clock text-white"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-1">Hours</h6>
                    <p className="text-muted mb-0">
                      Mon - Sat: 10:00 AM - 8:00 PM<br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-4">
              <h6 className="mb-3">Follow Us</h6>
              <div className="d-flex gap-3">
                <a href="#" className="btn btn-outline-primary btn-sm rounded-circle" style={{ width: '40px', height: '40px' }}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="btn btn-outline-info btn-sm rounded-circle" style={{ width: '40px', height: '40px' }}>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="btn btn-outline-primary btn-sm rounded-circle" style={{ width: '40px', height: '40px' }}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="btn btn-outline-primary btn-sm rounded-circle" style={{ width: '40px', height: '40px' }}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="bg-white p-5 rounded shadow-sm">
              <h3 className="mb-4">Send us a Message</h3>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Message *</label>
                    <textarea
                      rows="5"
                      className="form-control"
                      placeholder="Tell us about your inquiry, feedback, or how we can help you..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary-custom w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h3 className="text-center mb-4">Visit Our Gallery</h3>
            <div className="bg-light rounded p-4 text-center">
              <i className="fas fa-map-marked-alt fa-3x text-primary mb-3"></i>
              <h5>Gallery Location</h5>
              <p className="text-muted">
                Located in the heart of the art district, our gallery is easily accessible
                by public transport and has ample parking facilities.
              </p>
              <button className="btn btn-outline-primary">
                <i className="fas fa-directions me-2"></i>
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
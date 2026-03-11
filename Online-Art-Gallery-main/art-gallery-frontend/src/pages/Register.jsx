import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import k5 from "../images/k5.jpg";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (!passwordRegex.test(form.password)) {
      setError("Password must be at least 6 characters and include letters and numbers");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await api.post("/users/register", form);
      alert("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="row g-0">
                {/* Left Side - Form */}
                <div className="col-md-6">
                  <div className="card-body p-5">
                    <div className="text-center mb-4">
                      <h2 className="fw-bold text-primary">Create Account</h2>
                      <p className="text-muted">Join Tulika Arts Gallery community</p>
                    </div>

                    {error && (
                      <div className="alert alert-danger" role="alert">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-user me-2"></i>
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter your full name"
                          value={form.name}
                          onChange={(e) => setForm({...form, name: e.target.value})}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-envelope me-2"></i>
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Enter your email"
                          value={form.email}
                          onChange={(e) => setForm({...form, email: e.target.value})}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-lock me-2"></i>
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Create a strong password"
                          value={form.password}
                          onChange={(e) => setForm({...form, password: e.target.value})}
                          required
                        />
                        <div className="form-text">
                          <small className="text-muted">
                            <i className="fas fa-info-circle me-1"></i>
                            At least 6 characters with letters and numbers
                          </small>
                        </div>
                      </div>

                      <div className="d-grid mb-3">
                        <button
                          type="submit"
                          className="btn btn-primary-custom btn-lg"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Creating Account...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-user-plus me-2"></i>
                              Create Account
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-center">
                        <p className="mb-0">
                          Already have an account?{' '}
                          <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                            Sign In
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
                
                {/* Right Side - Image */}
                <div className="col-md-6 d-none d-md-block">
                  <div className="position-relative h-100">
                    <img 
                      src={k5} 
                      alt="Art Gallery" 
                      className="img-fluid h-100 w-100 rounded-end"
                      style={{objectFit: 'cover'}}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                         style={{background: 'rgba(44, 62, 80, 0.7)'}}>
                      <div className="text-center text-white">
                        <h3 className="mb-3 text-warning">Join Our Community</h3>
                        <p className="lead">Discover and collect exceptional artworks</p>
                        <div className="mt-4">
                          <div className="d-flex justify-content-center gap-3">
                            <div className="text-center">
                              <i className="fas fa-palette fa-2x mb-2"></i>
                              <div className="small">Curated Art</div>
                            </div>
                            <div className="text-center">
                              <i className="fas fa-users fa-2x mb-2"></i>
                              <div className="small">Art Community</div>
                            </div>
                            <div className="text-center">
                              <i className="fas fa-shipping-fast fa-2x mb-2"></i>
                              <div className="small">Secure Delivery</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

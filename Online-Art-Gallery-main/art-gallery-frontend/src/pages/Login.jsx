import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import k1 from "../images/k1.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await api.post("/users/login", { email, password });

      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.role === "admin") {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin");
      } else {
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="row g-0">
              
                <div className="col-md-6 d-none d-md-block">
                  <div className="position-relative h-100">
                    <img
                      src={k1}
                      alt="Art Gallery"
                      className="img-fluid h-100 w-100 rounded-start"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                      style={{ background: 'rgba(44, 62, 80, 0.7)' }}>
                      <div className="text-center text-white">
                        <h3 className="mb-3 text-warning">Welcome Back</h3>
                        <p className="lead">Sign in to explore our art collection</p>
                      </div>
                    </div>
                  </div>
                </div>

           
                <div className="col-md-6">
                  <div className="card-body p-5">
                    <div className="text-center mb-4">
                      <h2 className="fw-bold text-primary">Sign In</h2>
                      <p className="text-muted">Access your Tulika Arts Gallery account</p>
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
                          <i className="fas fa-envelope me-2"></i>
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-lock me-2"></i>
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
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
                              Signing In...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-sign-in-alt me-2"></i>
                              Sign In
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-center">
                        <p className="mb-0">
                          Don't have an account?{' '}
                          <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                            Create Account
                          </Link>
                        </p>
                      </div>
                    </form>

                  
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

export default Login;

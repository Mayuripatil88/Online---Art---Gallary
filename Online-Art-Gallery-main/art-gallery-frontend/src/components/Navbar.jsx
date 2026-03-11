import React from "react";
import { Link, useNavigate } from "react-router-dom";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch (err) {
    console.warn("Failed to parse stored user", err);
    return {};
  }
};

const Navbar = () => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  const storedUser = getStoredUser();
  const displayName = storedUser?.name || (adminToken ? "Admin" : "");
  const isLoggedIn = Boolean(token || adminToken);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Custom Navbar Styles */}
      <style>{`
        .navbar-custom {
          background: #111;
          padding: 0.8rem 1.2rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35);
          letter-spacing: 0.3px;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-brand {
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: 0.6px;
          transition: all 0.3s ease;
        }
        .navbar-brand:hover {
          transform: scale(1.05);
          text-shadow: 0 0 12px rgba(255,193,7,0.5);
        }

        .nav-link {
          color: #ddd !important;
          font-weight: 500;
          margin: 0 0.4rem;
          position: relative;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background-color: #f8c146;
          transition: width 0.25s ease;
        }
        .nav-link:hover {
          color: #fff !important;
        }
        .nav-link:hover::after {
          width: 60%;
        }
        .nav-link.active::after {
          width: 60%;
        }

        .btn-light {
          font-weight: 600;
          color: #fff;
          background-color: #8b7355;
          border: none;
          transition: all 0.3s ease;
        }
        .btn-light:hover {
          background-color: #6d5a42;
          transform: translateY(-2px);
        }

        .btn-outline-light {
          font-weight: 600;
          border-color: #a0956b;
          color: #a0956b;
          transition: all 0.3s ease;
        }
        .btn-outline-light:hover {
          background-color: #a0956b;
          color: #fff;
          transform: translateY(-2px);
        }

        .btn-danger {
          font-weight: 600;
          background-color: #b85450;
          border-color: #b85450;
          transition: all 0.3s ease;
        }
        .btn-danger:hover {
          background-color: #9a453f;
          border-color: #9a453f;
          transform: translateY(-2px);
        }

        .user-email-pill {
          color: #f8c146;
          font-weight: 600;
          margin-right: 0.75rem;
          white-space: nowrap;
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            background: #111;
            padding: 1rem;
            border-radius: 0 0 12px 12px;
          }
          .nav-link::after { display: none; }
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-custom navbar-dark">
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand text-light ms-5" to="/">
            <span style={{ color: "#f8c146" }}>Tulika</span> Art Gallery
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="nav" className="collapse navbar-collapse">
            {/* Left side */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallery">Gallery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>


              {token && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact">Feedback</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-orders">My Orders</Link>
                  </li>
                </>
              )}

              {adminToken && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/manage-artworks">Manage Artworks</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/manage-orders">Manage Orders</Link>
                  </li>
                  {/*  New Manage Feedback Link */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/manage-feedback">Manage Feedback</Link>
                  </li>
                </>
              )}
            </ul>

            {/* Right side */}
            <ul className="navbar-nav ms-auto">
              {!isLoggedIn ? (
                <>
                  <li className="nav-item me-2">
                    <Link className="btn btn-light btn-sm" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-outline-light btn-sm me-5" to="/register">Sign Up</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item d-flex align-items-center">
                  {displayName && (
                    <span className="user-email-pill">
                      <i className="fas fa-user me-1"></i>
                      {displayName}
                    </span>
                  )}
                  <button className="btn btn-danger btn-sm ms-1 me-5" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

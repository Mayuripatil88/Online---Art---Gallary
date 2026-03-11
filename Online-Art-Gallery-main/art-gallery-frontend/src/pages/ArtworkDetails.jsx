import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { getArtworkImage } from "../utils/artwork";

const ArtworkDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [relatedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const artworkRes = await api.get(`/artworks/${id}`);
        setArtwork(artworkRes.data);
      } catch (error) {
        console.error("Failed to load artwork", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);

  const handleOrder = async () => {
    if (!token) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }
    
    setOrderLoading(true);
    try {
      // Get user info from localStorage
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        alert("User session expired. Please login again.");
        navigate("/login");
        return;
      }
      const user = JSON.parse(userStr);
      
      // Create order with user and artwork objects
      const response = await api.post("/orders", { 
        user: { id: user.id },
        artwork: { id: parseInt(id) },
        orderDate: new Date().toISOString().slice(0,10),
        status: "pending"
      });
      console.log("Order created:", response.data);
      alert("Order placed successfully! Check your orders for status updates.");
      navigate("/my-orders");
    } catch (error) {
      console.error("Order failed", error);
      alert(error.response?.data?.error || "Failed to place order. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="loading-spinner mx-auto mb-3"></div>
        <p>Loading artwork details...</p>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="container py-5 text-center">
        <h3>Artwork not found</h3>
        <Link to="/gallery" className="btn btn-primary-custom">Back to Gallery</Link>
      </div>
    );
  }

  const primaryImage = getArtworkImage(artwork);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/gallery">Gallery</Link></li>
              <li className="breadcrumb-item active">{artwork.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* Artwork Image */}
          <div className="col-lg-7">
            <div className="position-relative">
              {primaryImage ? (
                <img 
                  src={primaryImage} 
                  alt={artwork.title} 
                  className="img-fluid rounded shadow-lg w-100"
                  style={{maxHeight: '600px', objectFit: 'contain'}}
                />
              ) : (
                <div className="bg-light rounded d-flex align-items-center justify-content-center" 
                     style={{height: '400px'}}>
                  <i className="fas fa-image fa-4x text-muted"></i>
                </div>
              )}
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge bg-primary fs-6">{artwork.category}</span>
              </div>
            </div>
          </div>

          {/* Artwork Details */}
          <div className="col-lg-5">
            <div className="sticky-top" style={{top: '100px'}}>
              <h1 className="display-6 mb-3">{artwork.title}</h1>
              
              <div className="mb-4">
                <h5 className="text-muted mb-2">Artist</h5>
                <p className="h4 text-primary">{artwork.artist}</p>
              </div>

              <div className="mb-4">
                <h5 className="text-muted mb-2">Description</h5>
                <p className="lead">{artwork.description}</p>
              </div>

              <div className="mb-4">
                <h5 className="text-muted mb-2">Category</h5>
                <span className="badge bg-light text-dark fs-6">{artwork.category}</span>
              </div>

              <div className="mb-4">
                <h5 className="text-muted mb-2">Price</h5>
                <h2 className="text-success mb-0">₹{Number(artwork.price).toLocaleString()}</h2>
              </div>

              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary-custom btn-lg"
                  onClick={handleOrder}
                  disabled={orderLoading}
                >
                  {orderLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-shopping-cart me-2"></i>
                      Order Now
                    </>
                  )}
                </button>
                
                <div className="row g-2">
                  <div className="col-6">
                    <button className="btn btn-outline-secondary w-100">
                      <i className="fas fa-heart me-2"></i>
                      Save
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-outline-secondary w-100">
                      <i className="fas fa-share me-2"></i>
                      Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Artwork Info */}
              <div className="mt-4 p-4 bg-light rounded">
                <h6 className="mb-3">Artwork Information</h6>
                <div className="row g-3 small">
                  <div className="col-6">
                    <strong>Medium:</strong><br />
                    <span className="text-muted">{artwork.category}</span>
                  </div>
                  <div className="col-6">
                    <strong>Availability:</strong><br />
                    <span className="text-success">Available</span>
                  </div>
                  <div className="col-6">
                    <strong>Shipping:</strong><br />
                    <span className="text-muted">Worldwide</span>
                  </div>
                  <div className="col-6">
                    <strong>Authentication:</strong><br />
                    <span className="text-muted">Certificate included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-4">Related Artworks</h3>
            <div className="row g-4">
              {relatedArtworks.map((relatedArt) => {
                const relatedImage = getArtworkImage(relatedArt);
                return (
                  <div key={relatedArt.id} className="col-md-4">
                    <div className="art-card">
                      {relatedImage && (
                        <img src={relatedImage} alt={relatedArt.title} />
                      )}
                      <div className="p-4">
                        <h6 className="mb-2">{relatedArt.title}</h6>
                        <p className="text-muted mb-2">by {relatedArt.artist}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold text-primary">₹{Number(relatedArt.price).toLocaleString()}</span>
                          <Link 
                            to={`/artwork/${relatedArt.id}`} 
                            className="btn btn-sm btn-outline-primary"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ArtworkDetails;

import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { getArtworkImage } from "../utils/artwork";
import { useNavigate, useSearchParams } from "react-router-dom";

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    api.get("/artworks")
      .then(res => {
        setArtworks(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const artistParam = searchParams.get('artist');
    if (artistParam) {
      setSelectedArtist(artistParam);
    }
  }, [searchParams]);

  const categories = [...new Set(artworks.map(art => art.category).filter(Boolean))];
  const artists = [...new Set(artworks.map(art => art.artist).filter(Boolean))];

  const filteredArtworks = artworks
    .filter(art => {
      const matchesSearch = 
        art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.artist?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory ? art.category === selectedCategory : true;
      const matchesArtist = selectedArtist ? art.artist === selectedArtist : true;
      
      const matchesPrice = () => {
        if (!priceRange) return true;
        const price = Number(art.price);
        switch (priceRange) {
          case "under-10000": return price < 10000;
          case "10000-50000": return price >= 10000 && price <= 50000;
          case "50000-100000": return price >= 50000 && price <= 100000;
          case "above-100000": return price > 100000;
          default: return true;
        }
      };
      
      return matchesSearch && matchesCategory && matchesArtist && matchesPrice();
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return Number(a.price) - Number(b.price);
        case "price-high": return Number(b.price) - Number(a.price);
        case "title": return a.title.localeCompare(b.title);
        case "artist": return a.artist.localeCompare(b.artist);
        default: return b.id - a.id; // newest first
      }
    });

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="loading-spinner mx-auto mb-3"></div>
        <p>Loading artworks...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4 mb-3">Art Gallery</h1>
          <p className="lead text-muted">Discover exceptional artworks from talented artists</p>
        </div>
      </div>

      <div className="container py-5">
       
        <div className="row g-3 mb-5">
          <div className="col-md-4">
            <input 
              className="form-control" 
              placeholder="Search artworks or artists..."
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <select 
              className="form-select" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <select 
              className="form-select" 
              value={selectedArtist} 
              onChange={(e) => setSelectedArtist(e.target.value)}
            >
              <option value="">All Artists</option>
              {artists.map(artist => (
                <option key={artist} value={artist}>{artist}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <select 
              className="form-select" 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="under-10000">Under ₹10,000</option>
              <option value="10000-50000">₹10,000 - ₹50,000</option>
              <option value="50000-100000">₹50,000 - ₹1,00,000</option>
              <option value="above-100000">Above ₹1,00,000</option>
            </select>
          </div>
          <div className="col-md-2">
            <select 
              className="form-select" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Title A-Z</option>
              <option value="artist">Artist A-Z</option>
            </select>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12 text-end">
            <span className="text-muted">
              {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredArtworks.length > 0 ? (
          <div className="gallery-grid">
            {filteredArtworks.map((artwork, index) => {
              const imageSrc = getArtworkImage(artwork);
              return (
                <div key={artwork.id} className={`art-card fade-in-up fade-in-up-delay-${index % 0 + 0}`}>
                  {imageSrc && (
                    <div className="position-relative overflow-hidden">
                      <img src={imageSrc} alt={artwork.title} />
                      <div className="position-absolute top-0 end-0 m-3">
                        <span className="badge bg-primary">{artwork.category}</span>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <h5 className="mb-2">{artwork.title}</h5>
                    <p className="text-muted mb-2">by <strong>{artwork.artist}</strong></p>
                    <p className="small text-muted mb-3" style={{height: '40px', overflow: 'hidden'}}>
                      {artwork.description?.substring(0, 100)}{artwork.description?.length > 100 ? '...' : ''}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="h5 text-primary mb-0">₹{Number(artwork.price).toLocaleString()}</span>
                      </div>
                      <button 
                        className="btn btn-primary-custom btn-sm"
                        onClick={() => navigate(`/artwork/${artwork.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-4">
              <svg width="64" height="64" fill="#dee2e6" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h4 className="text-muted">No artworks found</h4>
            <p className="text-muted">Try adjusting your search criteria or browse all categories</p>
            <button 
              className="btn btn-primary-custom"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSelectedArtist("");
                setPriceRange("");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;

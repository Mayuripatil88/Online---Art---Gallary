import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { getArtworkImage } from "../utils/artwork";
import k1 from "../images/k1.jpeg";
import k5 from "../images/k5.jpg";
import k8 from "../images/k8.jpg";
import k15 from "../images/k15.jpg";
import k16 from "../images/k16.jpg";
import k17 from "../images/k17.jpg";
import k19 from "../images/k19.jpg";
import k20 from "../images/k20.jpg";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    api.get("/artworks").then(res => {
      const artworkData = res.data;
      setArtworks(artworkData);
      
      // Extract unique artists
      const uniqueArtists = [...new Set(artworkData.map(art => art.artist))];
      const artistsWithImages = uniqueArtists.map((artist, index) => ({
        name: artist,
        image: [k1, k5, k8, k15, k16, k17, k19, k20][index % 8],
        artworkCount: artworkData.filter(art => art.artist === artist).length,
        specialty: getArtistSpecialty(artist),
        bio: getArtistBio(artist)
      }));
      setArtists(artistsWithImages);
    }).catch(() => {});
  }, []);

  const getArtistSpecialty = (artist) => {
    const specialties = {
      'Amit Bhar': 'Contemporary Landscapes',
      'Anjolie Ela Menon': 'Abstract Expressionism',
      'Thota Vaikuntam': 'Traditional Indian Art',
      'Seema Kohli': 'Mixed Media & Spirituality',
      'Madan Pawar': 'Nostalgic Realism',
      'L N V Srinivas': 'Modern Sculpture',
      'Jaganath Paul': 'Nature & Wildlife',
      'Nishant Dange': 'Digital Art Pioneer'
    };
    return specialties[artist] || 'Contemporary Art';
  };

  const getArtistBio = (artist) => {
    const bios = {
      'Amit Bhar': 'Renowned for his mystical landscapes that capture the ethereal beauty of nature.',
      'Anjolie Ela Menon': 'A pioneer in contemporary abstract art with international recognition.',
      'Thota Vaikuntam': 'Master of traditional Indian art forms with modern interpretations.',
      'Seema Kohli': 'Explores spirituality through mixed media and contemporary techniques.',
      'Madan Pawar': 'Creates evocative pieces that capture memories and emotions.',
      'L N V Srinivas': 'Contemporary sculptor known for innovative use of light and space.',
      'Jaganath Paul': 'Celebrates the dynamic energy of the natural world.',
      'Nishant Dange': 'Bridges traditional art with cutting-edge digital technology.'
    };
    return bios[artist] || 'A talented contemporary artist with a unique vision.';
  };

  const getArtistArtworks = (artistName) => {
    return artworks.filter(art => art.artist === artistName).slice(0, 3);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section" style={{height: '50vh'}}>
        <div 
          className="hero-background" 
          style={{ backgroundImage: `url(${k8})` }}
        />
        <div className="hero-content">
          <h1 className="display-title mb-4">Our Artists</h1>
          <p className="lead">Meet the talented artists behind our exceptional collection</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Featured Artists */}
        <div className="text-center mb-5">
          <h2 className="section-title">Featured Artists</h2>
          <p className="lead text-muted mx-auto" style={{maxWidth: '600px'}}>
            Discover the creative minds behind our curated collection of exceptional artworks
          </p>
        </div>

        <div className="row g-4">
          {artists.map((artist, index) => (
            <div key={index} className={`col-lg-6 fade-in-up fade-in-up-delay-${index % 3 + 1}`}>
              <div className="card border-0 shadow-sm h-100">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="img-fluid h-100 w-100 rounded-start"
                      style={{objectFit: 'cover', minHeight: '200px'}}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h5 className="card-title mb-2">{artist.name}</h5>
                      <p className="text-primary mb-2">{artist.specialty}</p>
                      <p className="card-text text-muted mb-3">{artist.bio}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {artist.artworkCount} artwork{artist.artworkCount !== 1 ? 's' : ''}
                        </small>
                        <Link 
                          to={`/gallery?artist=${encodeURIComponent(artist.name)}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          View Works
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Artist Spotlight */}
        {artists.length > 0 && (
          <div className="mt-5">
            <h3 className="text-center mb-4">Artist Spotlight</h3>
            <div className="row">
              {artists.slice(0, 3).map((artist, index) => {
                const artistWorks = getArtistArtworks(artist.name);
                return (
                  <div key={index} className="col-lg-4 mb-4">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="text-center mb-3">
                          <img 
                            src={artist.image} 
                            alt={artist.name}
                            className="rounded-circle mb-3"
                            style={{width: '80px', height: '80px', objectFit: 'cover'}}
                          />
                          <h6 className="mb-1">{artist.name}</h6>
                          <small className="text-muted">{artist.specialty}</small>
                        </div>
                        
                        {artistWorks.length > 0 && (
                          <div>
                            <h6 className="mb-3">Recent Works</h6>
                            <div className="row g-2">
                              {artistWorks.map((artwork, artIndex) => (
                                <div key={artIndex} className="col-4">
                                  <Link to={`/artwork/${artwork.id}`}>
                                    <img 
                                      src={getArtworkImage(artwork)} 
                                      alt={artwork.title}
                                      className="img-fluid rounded"
                                      style={{height: '60px', objectFit: 'cover'}}
                                    />
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-5 py-5 bg-light rounded">
          <h3 className="mb-3">Discover More Artworks</h3>
          <p className="lead text-muted mb-4">
            Explore our complete collection and find the perfect piece for your space
          </p>
          <Link to="/gallery" className="btn btn-primary-custom">
            Browse Gallery
          </Link>
        </div>
      </div>
    </>
  );
};

export default Artists;
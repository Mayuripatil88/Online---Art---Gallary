import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Artists from "./pages/Artists";
import ArtworkDetails from "./pages/ArtworkDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import ManageArtworks from "./pages/ManageArtworks";
import ManageOrders from "./pages/ManageOrders";
import ManageFeedback from "./pages/ManageFeedback";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-vh-100" style={{ paddingBottom: 80 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artwork/:id" element={<ArtworkDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* USER ROUTES */}
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-artworks"
            element={
              <ProtectedRoute adminOnly>
                <ManageArtworks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-orders"
            element={
              <ProtectedRoute adminOnly>
                <ManageOrders />
              </ProtectedRoute>
            }
          />
          {/*  NEW ADMIN FEEDBACK PAGE */}
          <Route
            path="/manage-feedback"
            element={
              <ProtectedRoute adminOnly>
                <ManageFeedback />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

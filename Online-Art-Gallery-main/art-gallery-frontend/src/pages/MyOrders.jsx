import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          navigate("/login");
          return;
        }
        const user = JSON.parse(userStr);
        const res = await api.get(`/orders/user/${user.id}`);
        console.log("Orders loaded:", res.data);
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          console.error("Invalid orders response:", res.data);
          setOrders([]);
        }
      } catch (error) {
        console.error("Failed to load orders", error);
        console.error("Error details:", error.response?.data);
        alert("Failed to load orders. Please try again.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusLower = (status || "").toLowerCase();
    if (statusLower === "pending") return "bg-warning text-dark";
    if (statusLower === "approved") return "bg-info";
    if (statusLower === "shipped") return "bg-primary";
    if (statusLower === "delivered") return "bg-success";
    if (statusLower === "rejected") return "bg-danger";
    return "bg-secondary";
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Orders</h3>
      {orders.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
          <h5 className="text-muted">No orders yet</h5>
          <p className="text-muted">Start exploring our gallery and place your first order!</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Artwork</th>
                <th>Artist</th>
                <th>Price</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const artwork = o.artwork || {};
                return (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{artwork.title || "N/A"}</td>
                    <td>{artwork.artist || "N/A"}</td>
                    <td>₹{artwork.price ? Number(artwork.price).toLocaleString() : "N/A"}</td>
                    <td>{formatDate(o.orderDate || o.order_date || o.createdAt || o.created_at)}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(o.status)}`}>
                        {(o.status || "pending").toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

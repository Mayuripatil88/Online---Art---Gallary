import React, { useEffect, useState } from "react";
import api from "../utils/api";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    artworkId: "",
    status: "pending",
    orderDate: new Date().toISOString().slice(0, 10),
  });
  const [users, setUsers] = useState([]);
  const [artworks, setArtworks] = useState([]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/orders");
      console.log("Orders loaded:", res.data);
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to load orders", err);
      setError("Failed to load orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  const loadArtworks = async () => {
    try {
      const res = await api.get("/artworks");
      if (Array.isArray(res.data)) {
        setArtworks(res.data);
      }
    } catch (err) {
      console.error("Failed to load artworks", err);
    }
  };

  useEffect(() => {
    loadOrders();
    loadUsers();
    loadArtworks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }
    try {
      await api.delete(`/orders/${id}`);
      alert("Order deleted successfully!");
      loadOrders();
    } catch (error) {
      console.error("Failed to delete order", error);
      alert("Failed to delete order. Please try again.");
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      userId: order.user?.id || "",
      artworkId: order.artwork?.id || "",
      status: order.status || "pending",
      orderDate: order.orderDate || order.order_date || new Date().toISOString().slice(0, 10),
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingOrder(null);
    setShowForm(false);
    setFormData({
      userId: "",
      artworkId: "",
      status: "pending",
      orderDate: new Date().toISOString().slice(0, 10),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user: { id: parseInt(formData.userId) },
        artwork: { id: parseInt(formData.artworkId) },
        status: formData.status,
        orderDate: formData.orderDate,
      };

      if (editingOrder) {
        await api.put(`/orders/${editingOrder.id}`, payload);
        alert("Order updated successfully!");
      } else {
        await api.post("/orders", payload);
        alert("Order created successfully!");
      }
      handleCancel();
      loadOrders();
    } catch (error) {
      console.error("Failed to save order", error);
      alert(error.response?.data?.error || "Failed to save order. Please try again.");
    }
  };

  const setStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      loadOrders();
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update order status");
    }
  };

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Manage Orders</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <i className="fas fa-plus me-2"></i>Add New Order
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {showForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">{editingOrder ? "Edit Order" : "Create New Order"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Customer</label>
                  <select
                    className="form-select"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    required
                  >
                    <option value="">Select Customer</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Artwork</label>
                  <select
                    className="form-select"
                    value={formData.artworkId}
                    onChange={(e) => setFormData({ ...formData, artworkId: e.target.value })}
                    required
                  >
                    <option value="">Select Artwork</option>
                    {artworks.map((artwork) => (
                      <option key={artwork.id} value={artwork.id}>
                        {artwork.title} by {artwork.artist} - ₹{Number(artwork.price).toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Order Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.orderDate}
                    onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-success me-2">
                  {editingOrder ? "Update Order" : "Create Order"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Artwork</th>
              <th>Artist</th>
              <th>Price</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center text-muted py-4">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((o) => {
                const artwork = o.artwork || {};
                const user = o.user || {};
                return (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{user.name || "-"}</td>
                    <td>{user.email || "-"}</td>
                    <td>{artwork.title || "-"}</td>
                    <td>{artwork.artist || "-"}</td>
                    <td>₹{artwork.price ? Number(artwork.price).toLocaleString() : "-"}</td>
                    <td>{formatDate(o.orderDate || o.order_date || o.createdAt || o.created_at)}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(o.status)}`}>
                        {(o.status || "pending").toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <select
                          className="form-select form-select-sm"
                          style={{ width: "120px" }}
                          value={o.status || "pending"}
                          onChange={(e) => setStatus(o.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEdit(o)}
                          title="Edit Order"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(o.id)}
                          title="Delete Order"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;

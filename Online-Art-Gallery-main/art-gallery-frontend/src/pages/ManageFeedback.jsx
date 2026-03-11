import React, { useEffect, useState } from "react";
import api from "../utils/api";

const formatDateTime = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/feedback");
        setFeedbacks(response.data);
      } catch (err) {
        console.error("Error loading feedback:", err);
        const errorMsg = err.response?.data?.message || "Error loading feedback. Make sure you're logged in as admin.";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading feedback...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Customer Feedback</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((fb, i) => (
              <tr key={fb.id}>
                <td>{i + 1}</td>
                <td>{fb.name}</td>
                <td>{fb.email}</td>
                <td>{fb.message}</td>
                <td>{formatDateTime(fb.createdAt || fb.created_at || fb.created)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No feedback yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageFeedback;

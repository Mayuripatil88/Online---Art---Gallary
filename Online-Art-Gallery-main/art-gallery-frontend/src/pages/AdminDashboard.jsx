import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ artworks: 0, orders: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMetrics = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("/dashboard/metrics");
        setCounts({
          artworks: data.totalArtworks ?? 0,
          orders: data.totalOrders ?? 0,
          pending: data.pendingOrders ?? 0,
        });
      } catch (err) {
        console.error("Failed to load dashboard metrics", err);
        setError("Unable to load the latest stats. Please try again.");
        setCounts({ artworks: 0, orders: 0, pending: 0 });
      } finally {
        setLoading(false);
      }
    };
    loadMetrics();
  }, []);

  const completed = Math.max(counts.orders - counts.pending, 0);
  const completedPct = counts.orders ? Math.round((completed / counts.orders) * 100) : 0;
  const pendingPct = 100 - completedPct;
  console.log({ pendingPct });

  return (
    <>
      {/* component-scoped styles */}
      <style>{`
        .dash-hero {
          background: linear-gradient(135deg, #fff8e1 0%, #ffffff 60%);
          padding: 18px 0 8px;
          border-radius: 0 0 20px 20px;
          margin-bottom: 18px;
        }
        .dash-title {
          font-weight: 800;
          letter-spacing: .2px;
        }
        .stat-card {
          border: 0;
          border-radius: 1rem;
          background: #fff;
          box-shadow: 0 10px 24px rgba(0,0,0,.06);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .stat-card:hover { 
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0,0,0,.10);
        }
        .stat-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          display: grid; place-items: center;
          background: #212529; color: #fff;
        }
        .stat-icon.gold { background: #ffc107; color: #212529; }
        .muted { color: #6c757d; }
        .progress-pill {
          height: 12px; border-radius: 999px; overflow: hidden; background: #eee;
        }
        .progress-bar-complete {
          height: 100%; background: #198754; /* Bootstrap success */
          transition: width .6s ease;
        }
        .progress-bar-pending {
          height: 100%; background: #ffc107;
          transition: width .6s ease;
        }
        .quick-card {
          border: 0; border-radius: 1rem; background:#fff;
          box-shadow: 0 6px 16px rgba(0,0,0,.05);
        }
        .fade-in { opacity: 0; transform: translateY(8px); animation: fade .45s ease forwards; }
        .fade-in.d2 { animation-delay: .1s; }
        .fade-in.d3 { animation-delay: .2s; }
        @keyframes fade { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="dash-hero">
        <div className="container">
          <h3 className="dash-title mb-2">Admin Dashboard</h3>
          <p className="muted mb-0">Overview of your gallery performance at a glance.</p>
          {error && (
            <div className="alert alert-warning mt-3 mb-0 py-2">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className="row g-3">
          <div className="col-md-4 fade-in">
            <div className="stat-card p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="muted">Total Artworks</div>
                  <div className="display-6 fw-bold">{loading ? "…" : counts.artworks}</div>
                </div>
                <div className="stat-icon gold">
                  {/* palette icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-10 10 8 8 0 0 0 8 8h3a3 3 0 0 0 3-3c0-1.1.9-2 2-2h2a2 2 0 0 0 2-2A10 10 0 0 0 12 2Zm-4 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4 2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 fade-in d2">
            <div className="stat-card p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="muted">Total Orders</div>
                  <div className="display-6 fw-bold">{loading ? "…" : counts.orders}</div>
                </div>
                <div className="stat-icon">
                  {/* receipt icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 2h12a1 1 0 0 1 1 1v18l-3-2-3 2-3-2-3 2-3-2V3a1 1 0 0 1 1-1Zm2 5v2h8V7H8Zm0 4v2h8v-2H8Zm0 4v2h6v-2H8Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 fade-in d3">
            <div className="stat-card p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="muted">Pending Orders</div>
                  <div className="display-6 fw-bold">{loading ? "…" : counts.pending}</div>
                </div>
                <div className="stat-icon">
                  {/* clock icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5h-2v6l5 3 1-1.73-4-2.27V7Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="row mt-4 g-3">
          <div className="col-md-4 fade-in d3">
            <div className="quick-card p-4 d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1">Manage Artworks</h6>
                <div className="small text-muted">Add new pieces or edit existing listings.</div>
              </div>
              <Link to="/manage-artworks" className="btn btn-outline-dark">Artworks</Link>
            </div>
          </div>
          <div className="col-md-4 fade-in d3">
            <div className="quick-card p-4 d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1">Manage Orders</h6>
                <div className="small text-muted">Review, fulfill, or update order status.</div>
              </div>
              <Link to="/manage-orders" className="btn btn-outline-dark">Orders</Link>
            </div>
          </div>
          <div className="col-md-4 fade-in d3">
            <div className="quick-card p-4 d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1">Customer Feedback</h6>
                <div className="small text-muted">View and manage user feedback.</div>
              </div>
              <Link to="/manage-feedback" className="btn btn-outline-dark">Feedback</Link>
            </div>
          </div>
        </div>

        {/* Empty state hint */}
        {!loading && counts.orders === 0 && (
          <div className="text-center text-muted mt-5">
            No orders yet — once orders arrive, progress and stats will appear here.
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;

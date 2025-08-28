import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, Upload } from "lucide-react"; 
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

// Helper: get JWT from localStorage
const getToken = () => localStorage.getItem("skimly_token");

export default function Account() {
  const navigate = useNavigate();
  const [pdfs, setPdfs] = useState([]);
  const [showViewModal, setShowViewModal] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    AOS.init({ duration: 1000 });
    fetchPdfs();
  }, []);

  // Fetch PDFs with JWT header
  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/articles/list", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setPdfs(res.data.articles || []);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
      if (err.response?.status === 401) {
        // token expired or invalid
        localStorage.removeItem("skimly_token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Delete PDF with JWT header
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/delete/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setShowDeleteConfirm(null);
      fetchPdfs(); // refresh list
    } catch (err) {
      console.error("Error deleting PDF:", err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="account container py-5">
      {/* Header */}
      <h1 className="text-center mb-5 fw-bold" style={{ color: "var(--primary)" }}>
        My Account
      </h1>

      {/* Upload New PDF */}
      <div
        className="p-5 mb-5 text-center shadow"
        style={{
          background: "var(--gradient)",
          borderRadius: "18px",
          color: "white",
        }}
      >
        <h3 className="fw-semibold" data-aos="fade-down">
          Upload a New PDF
        </h3>
        <p data-aos="fade-up">Add a PDF and get instant AI summaries.</p>
        <div className="d-flex justify-content-center">
          <Link to="/upload">
            <button
              className="btn d-flex align-items-center justify-content-center gap-2 px-4 py-2 fw-medium shadow"
              style={{
                background: "white",
                color: "var(--primary)",
                borderRadius: "10px",
                border: "none",
              }}
            >
              <Upload size={18} /> Upload PDF
            </button>
          </Link>
        </div>
      </div>

      {/* Past Uploads */}
      <h4 className="fw-bold mb-4" style={{ color: "var(--secondary)" }}>
        My Uploads
      </h4>
      {loading && <p>Loading...</p>}

      <div className="row g-4">
        {pdfs.map((pdf) => (
          <div className="col-md-6" key={pdf.id}>
            <div
              className="card shadow-sm h-100"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(0,0,0,0.05)",
                background: "var(--light)",
              }}
            >
              <div className="card-body d-flex flex-column">
                <h5 className="fw-bold" style={{ color: "var(--primary)" }}>{pdf.title}</h5>
                <p className="text-muted small mb-2">
                  Uploaded: {new Date(pdf.created_at).toLocaleDateString()}
                </p>
                <p
                  className="flex-grow-1"
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--dark)",
                    maxHeight: "80px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {pdf.summary}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "30px",
                      background:
                        "linear-gradient(to top, var(--light), transparent)",
                    }}
                  />
                </p>

                <div className="d-flex justify-content-end gap-3 mt-2">
                  <button
                    className="btn btn-sm"
                    style={{
                      background: "var(--secondary)",
                      color: "white",
                      borderRadius: "8px",
                    }}
                    onClick={() => setShowViewModal(pdf)}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      background: "var(--accent1)",
                      color: "white",
                      borderRadius: "8px",
                    }}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      background: "#dc3545",
                      color: "white",
                      borderRadius: "8px",
                    }}
                    onClick={() => setShowDeleteConfirm(pdf)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {showViewModal && (
        <div className="modal fade show d-block" tabIndex="-1" onClick={() => setShowViewModal(null)}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-content p-4">
              <h5 className="fw-bold">{showViewModal.title}</h5>
              <p className="text-muted small">
                Uploaded: {new Date(showViewModal.created_at).toLocaleDateString()}
              </p>
              <p>{showViewModal.summary}</p>
              <div className="text-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowViewModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {showDeleteConfirm && (
        <div className="modal fade show d-block" tabIndex="-1" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal-dialog modal-sm modal-dialog-centered" onClick={(e)=>e.stopPropagation()}>
            <div className="modal-content p-4 text-center">
              <p>
                Are you sure you want to delete <strong>{showDeleteConfirm.title}</strong>?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(showDeleteConfirm.id)}
                >
                  Yes, Delete
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

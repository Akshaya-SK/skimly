import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import axios from "axios";

// Helper: get JWT from localStorage
const getToken = () => localStorage.getItem("skimly_token");

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF to upload");

    const formData = new FormData();
    formData.append("file", file);
    if (title) formData.append("title", title);

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/articles/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      alert("PDF uploaded successfully!");
      navigate("/account"); // redirect after successful upload
    } catch (err) {
      console.error("Upload error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("skimly_token");
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "Upload failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "16px" }}>
        <h2 className="text-center mb-4" style={{ color: "#2c647c", fontWeight: "600" }}>
          Upload PDF
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title (optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter PDF title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Select PDF</label>
            <input
              type="file"
              accept="application/pdf"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white d-flex align-items-center justify-content-center gap-2"
            style={{ background: "linear-gradient(90deg, #24747c, #2c647c)" }}
            disabled={loading}
          >
            <Upload size={18} /> {loading ? "Uploading..." : "Upload PDF"}
          </button>
        </form>
      </div>
    </div>
  );
}

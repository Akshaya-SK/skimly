import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Mock: check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  const handleProtectedNav = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            Skimly
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto fs-5">
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-3">
                <button
                  className="btn nav-link border-0 bg-transparent"
                  onClick={() => handleProtectedNav("/upload")}
                >
                  Upload
                </button>
              </li>
              <li className="nav-item mx-3">
                <button
                  className="btn nav-link border-0 bg-transparent"
                  onClick={() => handleProtectedNav("/history")}
                >
                  History
                </button>
              </li>
            </ul>
            <div>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="btn btn-outline-light mx-2">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-primary mx-2">
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link to="/account" className="btn btn-success mx-2">
                  My Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero d-flex align-items-center text-center text-white">
        <div className="container" data-aos="fade-up">
          <h1 className="display-2 fw-bold">Skimly</h1>
          <p className="lead mt-3 fs-4">
            Summarize your PDFs in seconds. Stay productive, stay focused.
          </p>
          <div className="mt-4">
            <button
              className="btn btn-primary btn-lg mx-2 shadow"
              onClick={() => handleProtectedNav("/upload")}
            >
              Upload PDF
            </button>
            {!isLoggedIn && (
              <Link
                to="/login"
                className="btn btn-outline-light btn-lg mx-2 shadow"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Why Skimly?</h2>
          <div className="row g-4">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100 shadow-lg border-0">
                <div className="card-body">
                  <h5 className="card-title fs-4">Fast Summaries</h5>
                  <p className="card-text">
                    Upload any PDF and get instant, AI-powered summaries that
                    save time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 shadow-lg border-0">
                <div className="card-body">
                  <h5 className="card-title fs-4">Save History</h5>
                  <p className="card-text">
                    Your past uploads are stored securely so you never lose
                    access.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div className="card h-100 shadow-lg border-0">
                <div className="card-body">
                  <h5 className="card-title fs-4">Secure Login</h5>
                  <p className="card-text">
                    Simple signup & login to keep your files private and safe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-5 fw-bold">How it Works</h2>
          <div className="row g-4">
            <div className="col-md-4" data-aos="zoom-in">
              <h3>Upload</h3>
              <p>Select your PDF document.</p>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="150">
              <h3>Skim</h3>
              <p>Our AI condenses the key points instantly.</p>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="300">
              <h3>Save</h3>
              <p>Access your summaries anytime from history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta text-center text-white">
        <div className="container" data-aos="fade-up">
          <h2 className="fw-bold">Ready to get started?</h2>
          <Link to="/signup" className="btn btn-light btn-lg mt-3 shadow">
            Create Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-3 bg-dark text-white text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} Skimly. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      if (res.data.token) {
        localStorage.setItem("skimly_token", res.data.token); // save JWT
        navigate("/account"); // redirect to account page
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "16px" }}>
        <h2 className="text-center mb-4" style={{ color: "#2c647c", fontWeight: "600" }}>Welcome Back</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn w-100 text-white" 
            style={{ background: "linear-gradient(90deg, #24747c, #2c647c)" }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account? <a href="/signup" style={{ color: "#24747c", textDecoration: "none" }}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

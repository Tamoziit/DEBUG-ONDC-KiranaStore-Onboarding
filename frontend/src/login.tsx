import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import loginBg from "../assets/loginbg.mp4"; // Import video from assets

const Login: React.FC = () => {
  const [mobileNo, setMobileNo] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNo, password }),
      });
      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Login successful!");
        // Redirect to another page or perform further actions
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 position-relative p-0">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="position-absolute top-0 left-0 w-100 h-100 object-cover"
        style={{ zIndex: -1 }}
      >
        <source src={loginBg} type="video/mp4" />
      </video>

      {/* Card Content */}
      <div className="card p-4 shadow-lg position-relative" style={{ width: "400px", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
        <h2 className="text-center text-dark mb-4">Login</h2>
        <form id="login-form" onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="loginMobile" className="form-label text-dark">
              Mobile Number
            </label>
            <input
              id="loginMobile"
              type="text"
              placeholder="Enter Mobile Number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
              className="form-control border-dark text-dark"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label text-dark">
              Password
            </label>
            <input
              id="loginPassword"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control border-dark text-dark"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
        </form>
        <p className="text-center text-dark mt-4">
          Don't have an account?{" "}
          <a href="signup" className="text-primary">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
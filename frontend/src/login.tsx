import React, { useState } from "react";
import "./login.css"; // Link to the CSS file

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
    <div className="container">
      <h1>Login</h1>
      <form id="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="loginMobile">Mobile Number</label>
          <input
            id="loginMobile"
            type="text"
            placeholder="Enter the Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input
            id="loginPassword"
            type="password"
            placeholder="Enter the Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="redirect">
        Don't have an account? <a href="signup.html">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;

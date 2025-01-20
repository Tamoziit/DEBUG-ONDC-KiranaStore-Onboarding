import React from "react";
import loginBg from "../assets/loginbg.mp4"; // Using the same background video as in login

const SignupForm: React.FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const mobileNo = (document.getElementById("mobileNo") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const aadharNo = (document.getElementById("aadharNo") as HTMLInputElement).value;
    const age = (document.getElementById("age") as HTMLInputElement).value;
    const gender = (document.getElementById("gender") as HTMLInputElement).value;

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobileNo, password, aadharNo, age, gender }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Signup Successful!");
        window.location.href = "login.html";
      } else {
        alert(result.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
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
      <div className="card p-4 shadow-lg position-relative" style={{ width: "500px", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
        <h2 className="text-center text-dark mb-4">Sign Up</h2>
        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              className="form-control border-dark text-dark"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobileNo" className="form-label text-dark">
              Mobile Number
            </label>
            <input
              id="mobileNo"
              type="text"
              placeholder="Enter your mobile number"
              required
              className="form-control border-dark text-dark"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-dark">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              required
              className="form-control border-dark text-dark"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="aadharNo" className="form-label text-dark">
              Aadhar Number
            </label>
            <input
              id="aadharNo"
              type="text"
              placeholder="Enter your Aadhar number"
              required
              className="form-control border-dark text-dark"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label text-dark">
              Age
            </label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              required
              className="form-control border-dark text-dark"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label text-dark">
              Gender
            </label>
            <input
              id="gender"
              type="text"
              placeholder="Enter your gender (e.g., Male/Female)"
              required
              className="form-control border-dark text-dark"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign Up
          </button>
        </form>
        <p className="text-center text-dark mt-4">
          Already a member?{" "}
          <a href="/" className="text-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;

import React from "react";
import "./signup.css"; // Ensure the path is correct relative to your file structure

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
    <form id="signup-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required />
      </div>
      <div>
        <label htmlFor="mobileNo">Mobile No:</label>
        <input type="text" id="mobileNo" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" required />
      </div>
      <div>
        <label htmlFor="aadharNo">Aadhar No:</label>
        <input type="text" id="aadharNo" required />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" required />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <input type="text" id="gender" required />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;

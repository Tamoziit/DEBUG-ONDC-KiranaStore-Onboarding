import { useState } from "react";
import { Link } from "react-router-dom";
import { SignupInputs } from "../../types";
import useSignup from "../../hooks/useSignup";

const SignupForm = () => {
  const [inputs, setInputs] = useState<SignupInputs>({
    name: "",
    mobileNo: "",
    password: "",
    age: null,
    gender: "",
    aadharNo: ""
  });
  const {loading, signup} = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-10"
      >
        <source src="/loginbg.mp4" type="video/mp4" />
      </video>

      {/* Card Content */}
      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-md z-20">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              className="w-full border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none p-2"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
            <input
              id="mobileNo"
              type="text"
              placeholder="Enter your mobile number"
              required
              className="w-full border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none p-2"
              value={inputs.mobileNo}
              onChange={(e) => setInputs({ ...inputs, mobileNo: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              required
              className="w-full border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none p-2"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Aadhar Number</label>
            <input
              id="aadharNo"
              type="text"
              placeholder="Enter your Aadhar number"
              required
              className="w-full border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none p-2"
              value={inputs.aadharNo}
              onChange={(e) => setInputs({ ...inputs, aadharNo: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Age</label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              required
              className="w-full border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none p-2"
              value={inputs.age!}
              onChange={(e) => setInputs({ ...inputs, age: Number(e.target.value) })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input
                  className="form-radio text-blue-600"
                  type="radio"
                  name="gender"
                  id="male"
                  value="M"
                  checked={inputs.gender === "M"}
                  onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                />
                <label className="text-gray-700" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="form-radio text-blue-600"
                  type="radio"
                  name="gender"
                  id="female"
                  value="F"
                  checked={inputs.gender === "F"}
                  onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                />
                <label className="text-gray-700" htmlFor="female">
                  Female
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="form-radio text-blue-600"
                  type="radio"
                  name="gender"
                  id="others"
                  value="O"
                  checked={inputs.gender === "O"}
                  onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                />
                <label className="text-gray-700" htmlFor="others">
                  Others
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:outline-none"
            disabled={loading}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Already a member?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
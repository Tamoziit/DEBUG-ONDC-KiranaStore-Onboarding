import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="w-full min-h-screen text-gray-800"
      style={{
        backgroundImage: "url('/loginbg.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-6">
        
        {/* Profile Card */}
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mb-12 transform hover:scale-105 transition duration-300 ease-in-out">
          <div className="flex flex-row justify-between mb-6">
           
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-green-600"
            />
            <div className="text-left ml-6">
              <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-gray-600 text-lg mb-4">johndoe@example.com</p>
              <p className="text-gray-500">Joined: January 2025</p>
            </div>
          </div>
        </div>

        
        <div className="flex gap-8">
          <div className="w-full max-w-sm bg-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold mb-4">Your Stores</h2>
              <p className="text-lg mb-6">View and manage your existing stores.</p>
              <Link
                to="/stores/my-stores"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow-md font-semibold hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Go to Your Stores
              </Link>
            </div>
          </div>
          <div className="w-full max-w-sm bg-green-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold mb-4">Register Your Store</h2>
              <p className="text-lg mb-6">Sign up and list your store with us.</p>
              <Link
                to="/warehouse/explore"
                className="px-6 py-3 bg-white text-green-600 rounded-lg shadow-md font-semibold hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

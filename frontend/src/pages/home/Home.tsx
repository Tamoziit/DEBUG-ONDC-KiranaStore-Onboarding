import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import useLogout from "../../hooks/useLogout";
import Navbar from "../../components/Navbar";

const Home = () => {
  const { authUser } = useAuthContext();
  const [profilePic, setProfilePic] = useState("");
  const { loading, logout } = useLogout();

  const getProfilePic = () => {
    const ProfilePic =
      authUser?.gender === "M"
        ? `https://avatar.iran.liara.run/public/boy?username=${authUser.name}`
        : `https://avatar.iran.liara.run/public/girl?username=${authUser?.name}`;

    setProfilePic(ProfilePic);
  }

  useEffect(() => {
    getProfilePic();
  }, []);

  return (
    <div
      className="w-full min-h-screen text-gray-800"
      style={{
        backgroundImage: "url('/loginbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-6">

        {/* Profile Card */}
        <div className="w-full max-w-md bg-white/40 backdrop-blur-2xl border border-white/20 rounded-lg shadow-lg py-6 px-12 mb-12 transform hover:scale-105 transition duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-6">
            <img
              src={profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-green-600"
            />
            <div className="text-left ml-6">
              <h2 className="text-2xl font-semibold text-gray-800">{authUser?.name}</h2>
              <p className="text-gray-600 text-lg">{authUser?.mobileNo}</p>
              <p className="text-gray-500">Age: {authUser?.age}</p>

              <button
                className="text-lg mt-4 text-gray-600 cursor-pointer border-none outline-none"
                disabled={loading}
                onClick={logout}
              >
                <MdLogout />
              </button>
            </div>
          </div>
        </div>


        <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full">
          <div className="w-[300px] lg:w-[400px] py-2 px-4 bg-blue-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
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
          <div className="w-[300px] lg:w-[400px] py-2 px-4 bg-green-600 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
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

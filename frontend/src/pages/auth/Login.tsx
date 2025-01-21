import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Spinner from "../../components/Spinner";


const Login: React.FC = () => {
  const [inputs, setInputs] = useState({
    mobileNo: "",
    password: "",
  });
  const { loading, login } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">

      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('/loginbg.jpg')`,
        }}
      ></div>


      <div className="relative bg-white bg-opacity-80 shadow-lg rounded-lg p-6 w-96 z-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="loginMobile" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              id="loginMobile"
              type="text"
              placeholder="Enter Mobile Number"
              value={inputs.mobileNo}
              onChange={(e) => setInputs({ ...inputs, mobileNo: e.target.value })}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="loginPassword"
              type="password"
              placeholder="Enter Password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            <div className="flex w-full items-center justify-center">
              {loading ? <Spinner size="small" /> : "Login"}
            </div>
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
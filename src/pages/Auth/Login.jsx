import { useState } from "react";
import { FiMail, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Cacmain from "../../components/Cacmain";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { AppRoutes } from "../../constant/constant";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Used for redirecting after successful login

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(AppRoutes.login, formData);
      // On successful login, store the token (can be stored in localStorage or state)
      localStorage.setItem("token", response.data.data.token);
      setError(null);
      navigate("/"); // Redirect to dashboard or the page you want
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-white ">
      <Navbar />

      <div className="text-center mt-28 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Welcome Back</h1>
        <p className="text-gray-600">Access your personal account by logging in</p>
      </div>

      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mb-10 px-4">
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 rounded-xl flex items-center justify-center bg-[#EBEBF8]">
          <div className="w-full max-w-md space-y-8">
            <h1 className="text-2xl font-semibold text-center">Login</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 bg-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 bg-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FiEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Display Errors */}
              {error && <div className="text-red-500 text-center">{error}</div>}

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>

              {/* Google Sign-In */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#f8f8ff] text-gray-500">or</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors">
                <FcGoogle className="w-5 h-5" />
                <span className="text-gray-600">Sign in with Google</span>
              </button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Register
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:block w-1/2 rounded-r-xl overflow-hidden">
          <Cacmain />
        </div>
      </div>
    </div>
  );
}

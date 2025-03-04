import { useState } from "react";
import { FiUser, FiMail, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Cacmain from "../../components/Cacmain.jsx";
import axios from "axios"; // Import Axios
import { AppRoutes } from "../../constant/constant";
import Cookies from "js-cookie";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(AppRoutes.register, formData);
      setSuccessMessage(response.data.message);
      setError(null);
      navigate("/login");
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      console.log("Google Token Received:", credential);
      if (!credential) {
        console.error("Google credential missing");
        return;
      }
      const res = await axios.post(AppRoutes.googleLogin, {
        tokenId: credential,
      });

      Cookies.set("authToken", res.data.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(res.data.user), { expires: 7 });

      navigate("/");
    } catch (err) {
      console.error("Google Sign-in Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="text-center mt-28 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Welcome Here</h1>
        <p className="text-gray-600">Create an account to make reservations</p>
      </div>
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mb-10 px-4">
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 rounded-l-xl flex items-center justify-center bg-[#EBEBF8]">
          <div className="w-full max-w-md space-y-8">
            <h1 className="text-2xl font-semibold text-center">Register</h1>

            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50">
              <GoogleOAuthProvider clientId="712623721571-vmm51tk8i724u840liej6pl34msv0k9j.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.error("Google Sign-in Failed")}
                />
              </GoogleOAuthProvider>
            </button>

            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative inline-block bg-white px-2 text-gray-500">
                or
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 relative">
                  <FiUser className="absolute inset-y-0 left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 relative">
                  <FiMail className="absolute inset-y-0 left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="CNIC"
                  className="block text-sm font-medium text-gray-700"
                >
                  CNIC
                </label>
                <div className="mt-1 relative">
                  <FiMail className="absolute inset-y-0 left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="CNIC"
                    name="CNIC"
                    type="CNIC"
                    value={formData.CNIC}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter your CNIC"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <FiLock className="absolute inset-y-0 left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <FiLock className="absolute inset-y-0 left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-center">{error}</div>}
              {successMessage && (
                <div className="text-green-500 text-center">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log In
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

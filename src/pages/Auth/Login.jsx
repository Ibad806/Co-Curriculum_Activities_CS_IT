import { useEffect, useState } from "react";
import { FiMail, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Cacmain from "../../components/Cacmain.jsx";
import Navbar from "../../components/Navbar.jsx";
import axios from "axios";
import { AppRoutes } from "../../constant/constant";
import Cookies from "js-cookie";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotification(null);

    try {
      const response = await axios.post(AppRoutes.login, formData);
      Cookies.set("authToken", response.data.data.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(response.data.data.user), { expires: 7 });
      if(response.data.data.user.role === "admin") {
        navigate("/adminpanel/home");
      }else if (response.data.data.user.role === "judge") {
        navigate("/judgespanel/home");
      }else if(response.data.data.user.role === "isParticipant") {
        navigate("/userpanel/home");
      } else {
        navigate("/");
      }
      
      setNotification("Login successful! Redirecting...");
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
      const res = await axios.post(AppRoutes.googleLogin, { tokenId: credential });

      Cookies.set("authToken", res.data.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(res.data.user), { expires: 7 });

      navigate("/");
    } catch (err) {
      console.error("Google Sign-in Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <Navbar /> */}
      <div className="text-center mt-28 mb-6">
        <h1 className="text-2xl font-semibold mb-1">Welcome Back</h1>
        <p className="text-gray-600">Access your personal account by logging in</p>
      </div>
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mb-10 px-4">
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 rounded-l-xl flex items-center justify-center bg-[#EBEBF8]">
          <div className="w-full max-w-md space-y-8">
            <h1 className="text-2xl font-semibold text-center">Login</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
                  <button type="button" className="absolute inset-y-0 right-3" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              {error && <div className="text-red-500 text-center">{error}</div>}
              {notification && <div className="text-green-500 text-center">{notification}</div>}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative inline-block bg-white px-2 text-gray-500">or</div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50">
              <GoogleOAuthProvider clientId="712623721571-vmm51tk8i724u840liej6pl34msv0k9j.apps.googleusercontent.com">
                <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.error("Google Sign-in Failed")} />
            </GoogleOAuthProvider>
              </button>
            </form>
            <p className="text-center text-sm text-gray-600">
              Don’t have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link>
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

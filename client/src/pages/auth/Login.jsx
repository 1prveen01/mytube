import React, { useState } from "react";
import axiosInstance from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post("/users/login", formData, {
        withCredentials: true,
      });

      login(res.data.data); 
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-950">
      
      <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
        Login
      </h1>

      {/* Form  */}
      <div className="w-full max-w-lg mt-8 bg-gray-900 p-6 rounded-xl shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
       
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm sm:text-md text-gray-300 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleChange}
              className="w-full border border-gray-700 bg-gray-800 rounded-lg p-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm sm:text-md text-gray-300 mb-1"
            >
              Password *
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={handleChange}
              className="w-full border border-gray-700 bg-gray-800 rounded-lg p-2.5 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

         
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2.5 text-white text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-center items-center mt-4 text-gray-400 text-sm">
          <p className="mr-1">Don’t have an account?</p>
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-500 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react'
import axiosInstance from '../../utils/axios.js'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [formData, setformData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
    profile: null,
    coverImage: null,
  })

  const [error, setError] = useState("")
  const [loading, setloading] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setformData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setformData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    setError("")

    const data = new FormData();
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("fullName", formData.fullName);
    data.append("password", formData.password);
    data.append("avatar", formData.profile);
    data.append("coverImage", formData.coverImage);

    try {
      const res = await axiosInstance.post("/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      alert("Signup successful")
      console.log(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed")
    } finally {
      setloading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6">
          Sign up
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-200 mb-1">
              Email*
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleChange}
              className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm text-gray-200 mb-1">
              Username*
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              onChange={handleChange}
              className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm text-gray-200 mb-1">
              Full Name*
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              onChange={handleChange}
              className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-200 mb-1">
              Password*
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              onChange={handleChange}
              className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* File Uploads */}
          <div>
            <label htmlFor="profile" className="block text-sm text-gray-200 mb-1">
              Profile*
            </label>
            <input
              type="file"
              name="profile"
              id="profile"
              required
              onChange={handleChange}
              className="block w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-sm text-gray-200 mb-1">
              Cover Image*
            </label>
            <input
              type="file"
              name="coverImage"
              id="coverImage"
              required
              onChange={handleChange}
              className="block w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-lg font-semibold text-white rounded-md bg-blue-600 hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        {/* Footer */}
        <div className="flex justify-center mt-4 text-sm text-gray-400">
          <p>Already have an account?</p>
          <Link
            to="/login"
            className="ml-1 text-blue-400 hover:text-blue-600 transition"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup

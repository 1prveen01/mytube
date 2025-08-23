import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserDetails } from "../../services/userService.js";
import { useAuth } from "../../context/AuthContext.jsx";

const UpdateUserDetails = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  // ✅ pre-fill with current user values
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending:", { fullName, email }); // debug
      const updatedUser = await updateUserDetails({ fullName, email });

      // ✅ update global user state
      setUser(updatedUser);

      setMessage("✅ Profile updated successfully!");
      console.log("Updated user:", updatedUser);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage(err.response?.data?.message || "❌ Update failed");
    }
  };

  const handleCancel = () => {
    navigate(-1); // go back
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-white">
          Update Profile
        </h2>

        {/* Full Name */}
        <div>
          <label className="block text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition"
          >
            Cancel
          </button>
        </div>

        {/* Message */}
        {message && (
          <p
            className={`text-center font-medium ${message.includes("✅") ? "text-green-400" : "text-red-400"
              }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateUserDetails;

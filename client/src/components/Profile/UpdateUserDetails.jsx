import React, { useState } from "react";
import { updateUserDetails } from "../../services/userService";


const UpdateProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserDetails({ fullName, email });
      setMessage("Profile updated");
      console.log("Updated user:", updatedUser);
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed ");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border p-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Update
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdateProfile;

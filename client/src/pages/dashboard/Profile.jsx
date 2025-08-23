import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Layout from "../../components/Layout.jsx";
import { useNavigate } from "react-router-dom";
import { deleteUserAccount } from "../../services/userService.js";
import {
  getSubscribedChannelsList,
  getUserChannelSubscribersList,
} from "../../services/subscribeService.js";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const [subCount, setSubCount] = useState(0); // my subscribers
  const [subscribedCount, setSubscribedCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;

    const fetchSubsData = async () => {
      try {
        
        const subsRes = await getUserChannelSubscribersList(user._id);
        setSubCount(subsRes?.totalSubscribers || 0);

        const subscribedRes = await getSubscribedChannelsList(user._id);
        setSubscribedCount(subscribedRes?.totalSubscribedChannel || 0);
      } catch (err) {
        console.error("Error fetching subscription data:", err);
      }
    };

    fetchSubsData();
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="text-white p-4">
        Please login to view your profile.
      </div>
    );
  }

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteUserAccount();
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete account.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center p-4 sm:p-8 min-h-[calc(100vh-4rem)] w-full">
        <div className="flex flex-col md:flex-row w-full max-w-4xl border-2 border-gray-900 rounded-md p-4 sm:p-6 md:p-8 bg-gray-800">
          {/* Profile Picture */}
          <div className="flex-shrink-0 h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] mx-auto md:mx-0">
            <img
              className="h-full w-full object-cover rounded-md"
              src={user.avatar}
              alt="profile"
            />
          </div>

          {/* Detail Section */}
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-between text-white w-full">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Welcome, {user.fullName}
            </h2>
            <h3 className="text-lg sm:text-xl text-gray-300">
              Channel Name: <span className="font-medium">{user.username}</span>
            </h3>
            <div className="mt-2 space-y-1 text-sm sm:text-base">
              <p>
                Subscribers: <span className="font-medium">{subCount}</span>
              </p>
              <p>
                Subscribed:{" "}
                <span className="font-medium">{subscribedCount}</span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={() => navigate("/updateUserDetails")}
                className="bg-gray-700 rounded-md px-4 py-2 text-white text-lg hover:bg-gray-600 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 rounded-md px-4 py-2 text-white text-lg hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

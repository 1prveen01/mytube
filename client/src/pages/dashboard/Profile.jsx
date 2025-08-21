import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx';
import axiosInstance from '../../utils/axios.js';
import Layout from '../../components/Layout.jsx';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [subscribers, setSubscribers] = useState(0);
  const [subscribed, setSubscribed] = useState(0);
  const [tweet, setTweet] = useState(0);

  useEffect(() => {
    if (!user?._id) return;

    // get number of subscribers
    axiosInstance
      .get(`/subscriptions/get-user-channel-subscribers/${user._id}`)
      .then((res) => setSubscribers(res.data.length))
      .catch((err) => console.log("Error in fetching subscribers: ", err));

    // get number of subscribed channels
    axiosInstance
      .get(`subscriptions/get-subscribed-channels/${user._id}`)
      .then((res) => setSubscribed(res.data.length))
      .catch((err) => console.log("Error in fetching subscribed channels: ", err));

    // get tweet count
    axiosInstance
      .get(`tweets/get-user-tweets/${user._id}`)
      .then((res) => setTweet(res.data.totalTweet))
      .catch((err) => console.log("Error in fetching total tweets count : ", err));
  }, [user]);

  if (!isAuthenticated) {
    return <div className="text-white p-4">Please login to view your profile.</div>;
  }

  return (
    <Layout>
      <div className="flex justify-center items-center p-4 sm:p-8 min-h-[calc(100vh-4rem)] w-full">
        <div className="flex flex-col md:flex-row w-full max-w-4xl border-2 border-gray-900 rounded-md p-4 sm:p-6 md:p-8 bg-gray-800">
          
          {/* Avatar Section */}
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
              <p>Subscribers: <span className="font-medium">{subscribers}</span></p>
              <p>Subscribed: <span className="font-medium">{subscribed}</span></p>
              <p>Tweets: <span className="font-medium">{tweet}</span></p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button className="bg-gray-700 rounded-md px-4 py-2 text-white text-lg hover:bg-gray-600 transition">
                Edit
              </button>
              <button className="bg-red-600 rounded-md px-4 py-2 text-white text-lg hover:bg-red-500 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile

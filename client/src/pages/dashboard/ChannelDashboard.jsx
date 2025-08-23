import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout.jsx";
import axiosInstance from "../../utils/axios.js";

const ChannelDashboard = () => {
  const { channelId } = useParams();
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null); // ✅ added channel state
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
       
        const res = await axiosInstance.get(
          `/videos/get-published-videos?userId=${channelId}`
        );

        const { videos , total } = res.data.data;

        setTotal(total);

        setVideos(videos || []);

       
        if (videos.length > 0) {
          setChannel(videos[0].owner);
        }
      } catch (err) {
        console.error("Error fetching channel data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [channelId]);

  const navigate = useNavigate()

  return (
    <Layout>
      <div className="p-6">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <>
            {/* ✅ Channel Info */}
            {channel && (
              <div className="flex items-center mb-6">
                <img
                  src={channel.avatar}
                  alt={channel.username}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold uppercase text-white">
                    {channel.fullName}
                  </h1>
                  <p className="text-gray-400">@{channel.username}</p>
                  <p className="text-white font-light"><span>Uploaded Videos: </span>{total}</p>
                </div>
              </div>
            )}

            <h2 className="text-xl font-semibold mb-6 text-white">
              Channel Videos
            </h2>

            {/* ✅ Videos Grid */}
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div
                  onClick={()=>navigate(`/video/${video._id}`)}
                    key={video._id}
                    className="bg-white cursor-pointer rounded-lg shadow p-4 hover:shadow-lg transition"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <h2 className="mt-2 font-semibold text-gray-900">
                      {video.title}
                    </h2>
                    <p className="font-normal text-gray-900">
                        {video.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No videos uploaded yet.</p>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ChannelDashboard;

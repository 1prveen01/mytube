import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSearchVideos } from "../../services/videoService";
import Layout from "../../components/Layout";

const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    const loadResults = async () => {
      if (searchQuery) {
        const data = await fetchSearchVideos(searchQuery);
        setVideos(data?.videos || []);
      }
    };
    loadResults();
  }, [searchQuery]);

  return (
    <Layout>


      <div className="px-4 py-6 max-w-[1440px] mx-auto">
        <h2 className="text-xl font-bold mb-6 text-white">
          Search results for "{searchQuery}"
        </h2>

        {videos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {videos.map((video) => (
              <div
                key={video._id}
                onClick={() => navigate(`/watch/${video._id}`)}
                className="cursor-pointer bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                {/* Thumbnail + Hover Preview */}
                <div className="relative aspect-video bg-black group">
                  {/* Default Thumbnail (poster image from video or fallback) */}
                  <img
                    src={video.thumbnail || "/default-thumbnail.jpg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:hidden"
                  />

                  {/* Video Preview (plays on hover) */}
                  <video
                    src={video.videoFile}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover hidden group-hover:block"
                  />
                </div>

                {/* Video Info */}
                <div className="p-3">
                  <h3 className="text-white font-semibold line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span>{video?.owner?.username || "Unknown Channel"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No videos found.</p>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;

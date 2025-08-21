import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlaylistById, removeVideoFromPlaylist } from "../../services/playlistService.js";

const PlaylistDetailsPage = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();

  // Fetch playlist
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylistById(playlistId);
        setPlaylist(data.playlist);
      } catch (error) {
        console.error("Error fetching playlist", error);
      }
    };
    fetchPlaylist();
  }, [playlistId]);

  if (!playlist) return <p className="text-white">Loading...</p>;

  const handleRemoveVideo = async (videoId) => {
    try {
      await removeVideoFromPlaylist(playlistId, videoId);

     
      setPlaylist((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v._id !== videoId),
      }));
    } catch (error) {
      console.error("Error in removing video from Playlist ", error);
    }
  };

  return (
    <div className="p-4 md:p-8 text-white">
      
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl uppercase font-bold">{playlist.name}</h1>
        <p className="text-gray-400 mt-1">{playlist.description}</p>
      </div>

      
      <h2 className="text-xl font-semibold mb-4">Videos</h2>
      {playlist.videos.length === 0 ? (
        <p className="text-gray-400">No videos in this playlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlist.videos.map((video) => (
            <div
              key={video._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/video/${video._id}`)}
            >
              
              <img
                src={
                  video.thumbnail
                    ? video.thumbnail.replace("http://", "https://")
                    : "https://via.placeholder.com/300x180?text=No+Thumbnail"
                }
                alt={video.title}
                className="w-full h-40 object-cover"
              />

              {/* Video detail */}
              <div className="p-2 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-medium truncate">{video.title}</h3>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {video.description || "No description"}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveVideo(video._id);
                  }}
                  className="mt-3 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetailsPage;

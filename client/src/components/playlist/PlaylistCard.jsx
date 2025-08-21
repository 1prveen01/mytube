import React, { useState } from "react";
import UpdatePlaylistForm from "./UpdatePlaylistForm";
import { useNavigate } from "react-router-dom";

const PlaylistCard = ({ playlist, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Get last video as cover
  const lastVideo =
    playlist.videos && playlist.videos.length > 0
      ? playlist.videos[playlist.videos.length - 1]
      : null;

  const coverImage = lastVideo?.thumbnail
    ? lastVideo.thumbnail
    : "https://images.pexels.com/photos/32552931/pexels-photo-32552931.jpeg";

  if (isEditing) {
    return (
      <UpdatePlaylistForm
        playlist={playlist}
        onSuccess={(updated) => {
          onUpdate(updated);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div
      onClick={() => navigate(`/playlist/${playlist._id}`)}
      className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xs xl:max-w-sm 
                 mx-auto bg-gray-900 rounded-2xl overflow-hidden 
                 shadow-md hover:shadow-xl transition duration-300 
                 cursor-pointer flex flex-col"
    >
      {/* Cover Image */}
      <figure className="w-full h-44 sm:h-52 md:h-56 lg:h-48 xl:h-52 overflow-hidden">
        <img
          src={coverImage}
          alt={playlist.name}
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </figure>

      {/* Playlist Info */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-lg sm:text-xl font-semibold text-white truncate">
          {playlist.name}
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-1 line-clamp-2">
          {playlist.description}
        </p>

        {/* Actions */}
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 text-sm sm:text-base transition"
          >
            Update
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(playlist._id);
            }}
            className="px-3 py-1 bg-red-600 text-white rounded-lg 
                       hover:bg-red-700 text-sm sm:text-base transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;

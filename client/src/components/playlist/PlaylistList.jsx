import React from "react";
import PlaylistCard from "./PlaylistCard";

const PlaylistList = ({ playlists, onEdit, onDelete, onView }) => {
  if (!playlists || playlists.length === 0) {
    return <p className="text-gray-500">No playlists available.</p>;
  }

  return (
    <div className="grid gap-4">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist._id}
          playlist={playlist}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default PlaylistList;

import React, { useState } from "react";
import { createPlaylist } from "../../services/playlistService";


const PlaylistForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createPlaylist({ name, description });
      onSuccess(data); // pass playlist back to parent
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl">
      <input
        type="text"
        placeholder="Playlist Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-lg p-2 w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded-lg p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800"
      >
        Create Playlist
      </button>
    </form>
  );
};

export default PlaylistForm;

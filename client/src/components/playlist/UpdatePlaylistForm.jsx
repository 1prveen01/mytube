import React, { useState } from "react";
import { updatePlaylist } from "../../services/playlistService.js";

const UpdatePlaylistForm = ({ playlist, onSuccess, onCancel }) => {
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updatePlaylist(playlist._id, { name, description });
      onSuccess(updated); // send updated playlist back to parent
    } catch (error) {
      console.error("Error updating playlist:", error);
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
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdatePlaylistForm;

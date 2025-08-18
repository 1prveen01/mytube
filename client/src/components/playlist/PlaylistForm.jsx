import React, { useState } from "react";

const PlaylistForm = ({ onSubmit, initialData = {}, buttonText = "Create" }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-xl shadow-md"
    >
      <input
        type="text"
        placeholder="Playlist Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-lg"
        required
      />
      <textarea
        placeholder="Playlist Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default PlaylistForm;

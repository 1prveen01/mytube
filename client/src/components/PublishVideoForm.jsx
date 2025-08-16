import React, { useState } from "react";
import { publishVideo } from "../services/videoService.js";


export default function PublishVideoForm({ onPublished }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publishVideo({ title, description, videoFile, thumbnail });
      alert("Video published successfully!");
      onPublished();
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnail(null);
    } catch (err) {
      console.error("Error publishing video", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border rounded-2xl p-4">
      <input
        type="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border  rounded-2xl p-2 w-full"
        required
      />
      <textarea
        placeholder="Video Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border  rounded-2xl p-2 w-full"
        required
      />
      <div className="flex flex-col space-y-4">
        <input
      className="border-white  border-1 px-2 py-1 rounded-2xl"
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
        required
      />
      <input
      className="border-white  border-1 px-2 py-1 rounded-2xl"
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files[0])}
        required
      />
      <button type="submit" className="bg-green-500  rounded-2xl text-white px-4 py-2">
        Publish
      </button>
      </div>
    </form>
  );
}

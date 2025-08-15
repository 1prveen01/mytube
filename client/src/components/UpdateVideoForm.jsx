import React, { useState } from "react";
import { updateVideo } from "../services/videoService.js";

const UpdateVideoForm = ({ video, onClose, onUpdated }) => {
    const [title, setTitle] = useState(video.title || "");
    const [description, setDescription] = useState(video.description || "");
    const [thumbnail, setThumbnail] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateVideo(video._id, { title, description, thumbnail });
            alert("Video updated successfully!");
            onUpdated(); // refresh list
            onClose();
        } catch (error) {
            console.error("Error updating video:", error);
            alert("Failed to update video");
        }
    };

    return (
        <div className="bg-gray-900 p-4 rounded-xl">
            <h2 className="text-white text-lg mb-3">Update Video</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Video Title"
                    className="w-full p-2 rounded mb-3"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full p-2 rounded mb-3"
                />
                <input
                    type="file"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    className="w-full mb-3"
                />
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-600 px-4 py-2 text-white rounded"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-600 px-4 py-2 text-white rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateVideoForm;

import React, { useState } from "react";
import { updateVideo } from "../../services/videoService.js";

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
        <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-lg p-6 mx-4 sm:mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Update Video</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Video Title"
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Description */}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    rows="4"
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                {/* Thumbnail Upload */}
                <div>
                    <label className="block text-sm mb-1">Thumbnail</label>
                    <input
                        type="file"
                        onChange={(e) => setThumbnail(e.target.files[0])}
                        className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                                   file:rounded-lg file:border-0 
                                   file:text-sm file:font-semibold 
                                   file:bg-blue-600 file:text-white 
                                   hover:file:bg-blue-700"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto bg-gray-600 px-4 py-2 rounded-lg font-medium  hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateVideoForm;

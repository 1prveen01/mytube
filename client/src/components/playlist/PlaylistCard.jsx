import React, { useEffect, useState } from "react";
import UpdatePlaylistForm from "./UpdatePlaylistForm";

const PlaylistCard = ({ playlist, onUpdate, onDelete }) => {

    const [isEditing, setIsEditing] = useState(false)


    // Get the last added video for cover
    const lastVideo =
        playlist.videos && playlist.videos.length > 0
            ? playlist.videos[playlist.videos.length - 1]
            : null;

    const coverImage =
        lastVideo?.thumbnail ||
        "https://via.placeholder.com/300x180?text=No+Cover";


    
    if (isEditing) {
        return (
            <UpdatePlaylistForm
                playlist={playlist}
                onSuccess={(updated) => {
                    onUpdate(updated);   // update parent state
                    setIsEditing(false); // close form
                }}
                onCancel={() => setIsEditing(false)}
            />
        );
    }
    return (
        <div className="sm:grid-cols-1 grid lg:grid-cols-2">
            <div className="card border rounded-2xl bg-base-100 w-96 shadow-sm hover:shadow-lg transition">
                {/* Cover Image */}
                <figure>
                    <img
                        className="rounded-2xl w-full h-44 object-cover"
                        src={coverImage}
                        alt={playlist.name}
                    />
                </figure>

                {/* Playlist Info */}
                <div className="card-body">
                    <h2 className="card-title">{playlist.name}</h2>
                    <p className="text-gray-600 line-clamp-2">{playlist.description}</p>

                    {/* Actions */}
                    <div className="card-actions flex flex-row justify-between mt-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn bg-blue-600 px-2 py-1 rounded hover:bg-blue-800 text-white"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => onDelete?.(playlist._id)}
                            className="btn bg-red-600 px-2 py-1 rounded hover:bg-red-800 text-white"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistCard;

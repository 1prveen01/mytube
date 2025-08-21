// components/playlist/AddToPlaylistModal.jsx
import React, { useEffect, useState } from "react";
import { getUserPlaylists, addVideoToPlaylist, createPlaylist } from "../../services/playlistService.js";

const AddToPlaylistModal = ({ videoId, onClose }) => {

    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [newPlaylistDescription, setNewPlaylistDescription] = useState("");

    useEffect(() => {
        const fetchPlaylists = async () => {
            const res = await getUserPlaylists();
            setPlaylists(res.playlists || []);
        };
        fetchPlaylists();
    }, []);

    const handleAddToPlaylist = async (playlistId) => {
        await addVideoToPlaylist(playlistId, videoId);
        alert("Video added to playlist!");
        onClose();
    };

    const handleCreatePlaylist = async () => {
        if (!newPlaylistName.trim()) return;
        const newPlaylist = await createPlaylist({ name: newPlaylistName, description: newPlaylistDescription });
        setPlaylists([...playlists, newPlaylist]);
        setNewPlaylistName("");
        setNewPlaylistDescription("");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Save to Playlist</h2>

                {playlists.length > 0 ? (
                    playlists.map((pl) => (
                        <div key={pl._id} className="flex border border-gray-600 mx-2 my-3 rounded px-2 py-1 justify-between items-center border-b ">

                            <div className="flex flex-col">
                                <span className="font-bold text-lg   text-black">{pl.name}</span>
                                <p className="text-black font-sm block font-light">{pl.description}</p>
                            </div>

                            <button
                                onClick={() => handleAddToPlaylist(pl._id)}
                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                            >
                                Add
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No playlists found. Create one below </p>
                )}

                {/* Create new playlist */}
                <div className="mt-4 border-1 border-gray-900 rounded-lg px-4 items-center justify-between py-2 flex gap-2">
                    <div className="flex flex-col space-y-2">
                        <input
                        type="text"
                        placeholder="New Playlist Name"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        className="border text-black rounded-lg p-2 flex-1"
                    />
                    <input
                        type="text"
                        placeholder="New Playlist Description"
                        value={newPlaylistDescription}
                        onChange={(e) => setNewPlaylistDescription(e.target.value)}
                        className="border text-black rounded-lg p-2 flex-1"
                    />
                    </div>
                    <button
                        onClick={(handleCreatePlaylist)}
                        className="bg-blue-600 mx-2 text-black px-3 py-2 rounded hover:bg-blue-800"
                    >
                        +
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AddToPlaylistModal;

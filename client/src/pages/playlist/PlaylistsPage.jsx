import React, { useEffect, useState } from "react";
import PlaylistCard from "../../components/playlist/PlaylistCard";
import Layout from "../../components/Layout";
import PlaylistForm from "../../components/playlist/PlaylistForm";
import { getUserPlaylists, removePlaylist } from "../../services/playlistService.js";

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await getUserPlaylists();
        setPlaylists(res.playlists || []);
      } catch (error) {
        console.error("Failed to fetch playlists", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleAddPlaylist = (newPlaylist) => {
    setPlaylists((prev) => [newPlaylist, ...prev]);
  };

  const handleUpdatePlaylist = (updated) => {
    setPlaylists((prev) =>
      prev.map((playlist) => (playlist._id === updated._id ? updated : playlist))
    );
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await removePlaylist(playlistId);
      setPlaylists((prev) => prev.filter((p) => p._id !== playlistId));
    } catch (error) {
      console.error("Failed to delete the playlist", error);
    }
  };

  return (
    <Layout>
      <div className="w-full min-h-screen px-4 py-6 sm:px-6 lg:px-10">
        {/* Page Heading */}
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-6">
          Create Playlist
        </h1>

        {/* Playlist Form */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-md p-4 sm:p-6 mb-10">
          <PlaylistForm onSuccess={handleAddPlaylist} />
        </div>

        {/* Playlist List */}
        <h2 className="font-semibold text-xl sm:text-2xl text-white mb-4">
          My Playlists
        </h2>

        <div className="grid gap-6 
                        grid-cols-1 
                        sm:grid-cols-2 
                        lg:grid-cols-3 
                        xl:grid-cols-4">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <PlaylistCard
                key={playlist._id}
                playlist={playlist}
                onUpdate={handleUpdatePlaylist}
                onDelete={handleDeletePlaylist}
              />
            ))
          ) : (
            <p className="text-gray-400">No playlists found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PlaylistsPage;

import React, { useEffect, useState } from 'react'
import PlaylistCard from '../../components/playlist/PlaylistCard'
import Layout from '../../components/Layout'
import PlaylistForm from '../../components/playlist/PlaylistForm'
import { getUserPlaylists } from '../../services/playlistService.js'




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

  return (
    <Layout>
      <div className="w-full h-screen px-4 py-2 m-4">
        <h1 className="mx-8 font-bold text-xl">Create Playlist</h1>

        {/* Playlist Form */}
        <div className="w-full px-8 py-4">
          <div className="px-8 py-4 rounded-lg border">
            <PlaylistForm  onSuccess={handleAddPlaylist}  />
          </div>

          {/* Playlist List */}
          <h1 className="mt-6 font-semibold text-lg">My Playlists</h1>
          <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist._id}
                  playlist={playlist}
                  onUpdate={handleUpdatePlaylist}
                  onDelete={(id) => console.log("Delete playlist:", id)}
                />
              ))
            ) : (
              <p className="text-gray-500">No playlists found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default PlaylistsPage
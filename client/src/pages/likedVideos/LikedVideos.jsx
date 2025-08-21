import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout.jsx';
import { Link } from 'react-router-dom';
import { getLikedVideos } from '../../services/likeService.js';
import VideoCard from '../../components/video/VideoCard.jsx';

const LikedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchLikedvideos = async () => {
      try {
        const data = await getLikedVideos();
        setVideos(data);
      } catch (error) {
        console.log("Error in fetching liked videos: ", error);
      }
    };

    fetchLikedvideos();
  }, [page]);

  return (
    <Layout>
      <div className="flex flex-col justify-start px-4 sm:px-6 lg:px-10">
        <h2 className="text-white font-semibold text-2xl sm:text-3xl mt-6 mb-4">
          Liked Videos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <Link key={video._id} to={`/video/${video._id}`}>
                <VideoCard video={video} />
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 text-lg py-8">
              No liked videos found
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LikedVideos;

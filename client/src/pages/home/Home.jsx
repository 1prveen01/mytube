import React, { useEffect, useState } from 'react'
import { fetchAllVideos } from '../../services/videoService.js';
import Layout from '../../components/Layout.jsx';
import { Link } from 'react-router-dom';
import VideoCard from '../../components/video/VideoCard.jsx';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchAllVideos({ page, limit });
        setVideos(data.videos);
        setTotalPage(Math.ceil(data.total / limit));
      } catch (error) {
        console.log("Error fetching videos: ", error);
      }
    };
    loadVideos();
  }, [page]);

  return (
    <Layout>
      <div className="flex flex-col w-full px-4 sm:px-6 lg:px-12">
        {/* Page heading */}
        <h2 className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl mt-6 mb-4">
          Videos
        </h2>

        
        <div className="grid gap-4 sm:gap-6 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4 
                        xl:grid-cols-5">
          {videos.map((video) => (
            <Link to={`/video/${video._id}`} key={video._id}>
              <VideoCard video={video} />
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white text-lg">
            Page {page} of {totalPage}
          </span>
          <button
            disabled={page === totalPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

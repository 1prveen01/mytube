import React, { useEffect, useState } from 'react'
import VideoCard from '../../components/VideoCard.jsx'
import { fetchAllVideos } from '../../services/videoService.js';
import Layout from '../../components/Layout.jsx';
import { Link } from 'react-router-dom';

const Home = () => {

  const [videos, setVideos] = useState([]);
  const [page, setpage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 10;

  useEffect(() => {

    const loadVideos = async () => {
      try {
        const data = await fetchAllVideos({ page, limit })
        setVideos(data.videos);
        setTotalPage(Math.ceil(data.total / limit));

      } catch (error) {
        console.log("Error fetching videos: ", error)
      }
    }
    loadVideos();
  }, [page])

  return (
    <Layout>
      <div className='flex-col flex justify-start'>
        <h2 className='text-white font-semibold text-2xl mx-8 mt-4'>Videos</h2>
        <div className='grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-4 p-2'>
            {videos.map((video) => (
              <Link to={`/video/${video._id}`}>
                <VideoCard key={video._id} video={video} />
              </Link>
            ))}
        </div>
      </div>
    </ Layout >
  )
}

export default Home
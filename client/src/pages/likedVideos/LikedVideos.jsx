import React, { useEffect, useState } from 'react'
import VideoCard from '../../components/VideoCard.jsx'
import Layout from '../../components/Layout.jsx';
import { Link } from 'react-router-dom';
import { getLikedVideos } from '../../services/likeService.js';

const LikedVideos = () => {

    const [videos, setVideos] = useState([]);
    const [page, setpage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 10;

    useEffect(() => {

        const fetchLikedvideos = async () => {
            try {
                const data = await getLikedVideos();
                setVideos(data);

            } catch (error) {
                console.log("Error in  fetching liked videos: ", error)
            }
        }

        fetchLikedvideos();


    }, [page])
    return (
        <Layout>
            <div className='flex-col flex justify-start'>
                <h2 className='text-white font-semibold text-2xl mx-8 mt-4'>Liked Videos</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 p-2'>

                    {videos.length > 0 ? (
                        videos.map((video) => (
                            <Link key={video._id} to={`/video/${video._id}`}>
                                <VideoCard video={video} />
                            </Link>
                        ))
                    ) : (
                        <p className="col-span-4 text-center text-gray-500">
                            No liked videos found
                        </p>
                    )}
                </div>
            </div>
        </ Layout >
    )
}

export default LikedVideos

import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import { getVideoById } from '../../services/videoService.js';

import VideoPlayerCard from '../../components/VideoPlayerCard.jsx'

const VideoPlayer = () => {

  const {videoId} = useParams();
  const [video, setVideo] = useState(null);
  

  useEffect(() => {

    const loadVideos = async () => {
      try {
        const resVideo = await getVideoById(videoId);
        setVideo(resVideo);
        

      } catch (error) {
        console.log("Error fetching videos: ", error)
      }
    }

    loadVideos();


  }, [videoId])

  if (!video) return <div className="text-white">Loading...</div>;




  return (
    <div className='w-full h-screen'>
        <VideoPlayerCard video={video} />
    </div>
  )
}

export default VideoPlayer
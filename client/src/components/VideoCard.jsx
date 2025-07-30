import React from 'react'


const VideoCard = ({video}) => {
  return (
    <div className="card bg-teal-50 text-black font-medium rounded-md mx-8 my-2 w-86 shadow-sm">
  <figure>
    <img
      src={video.thumbnail }
      alt={video.title} />
  </figure>
  <div className="card-body mt-2">
    <h2 className="card-title">{video.title}</h2>
    <p className='text-md font-normal'>{video.description}</p>

    <div className="card-actions justify-between">
     <p>{video.views}</p>
     <p>{video.duration}</p>
    </div>
    
  </div>
</div>
  )
}

export default VideoCard


import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div className="bg-teal-50 text-black font-medium rounded-lg shadow-md 
                    w-full max-w-sm mx-auto overflow-hidden 
                    hover:shadow-xl transition-shadow duration-200 
                    flex flex-col">

      {/* thumbnails to same aspect ratio */}
      <figure className="w-full h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={video.thumbnail}
          alt={video.title}
        />
      </figure>



      <div className="p-3 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="font-semibold text-base sm:text-lg text-gray-900 truncate">
          {video.title}
        </h2>

        {/* Description */}
        <p className="text-sm font-normal text-gray-700 truncate">
          {video.description}
        </p>

        {/* Footer actions */}
        <div className="flex justify-between items-center mt-auto text-sm text-gray-800">
          
          <p>{Number(video.duration).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

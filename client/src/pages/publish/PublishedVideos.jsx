import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout.jsx';
import { Link } from 'react-router-dom';
import { getPublishedVideos, deleteVideobyId } from '../../services/videoService.js';
import VideoCard from '../../components/video/VideoCard.jsx';
import UpdateVideoForm from '../../components/video/UpdateVideoForm.jsx';

const PublishedVideos = () => {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 10;
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Fetch videos function
    const fetchPublishedVideos = async () => {
        try {
            const { videos, total } = await getPublishedVideos({ page, limit });
            setVideos(videos);
            setTotalPage(Math.ceil(total / limit));
        } catch (error) {
            console.error("Error fetching published videos:", error);
        }
    };

    useEffect(() => {
        fetchPublishedVideos();
    }, [page]);

    const handleDelete = async (videoId) => {
        if (window.confirm("Are you sure you want to delete this video?")) {
            try {
                await deleteVideobyId(videoId);
                alert("Video deleted successfully");
                fetchPublishedVideos(); 
            } catch (error) {
                console.error("Error deleting video:", error);
                alert("Failed to delete video");
            }
        }
    };

    return (
        <Layout>
            <div className="flex-col flex justify-start">
                <h2 className="text-white font-semibold text-2xl mx-8 mt-4">
                    Published Videos
                </h2>

                {/* Video  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-8 mt-4 gap-6 p-2">
                    {videos.length > 0 ? (
                        videos.map((video) => (
                            <div
                                key={video._id}
                                className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                <Link to={`/video/${video._id}`}>
                                    <VideoCard video={video} />
                                </Link>

                                
                                <div className="flex justify-around items-center px-4 py-3 border-t bg-gray-50">
                                    <button
                                        onClick={() => setSelectedVideo(video)}
                                        className="bg-blue-600 px-4 py-1.5 text-sm text-white cursor-pointer font-medium rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(video._id)}
                                        className="bg-red-600 px-4 py-1.5 text-sm text-white cursor-pointer font-medium rounded-lg hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-4 text-center text-gray-500">
                            No videos published yet
                        </p>
                    )}
                </div>

                {/* Pagination  */}
                {totalPage > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span className="text-white">
                            Page {page} of {totalPage}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
                            disabled={page === totalPage}
                            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Update Video Modal */}
                {selectedVideo && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                        <UpdateVideoForm
                            video={selectedVideo}
                            onClose={() => setSelectedVideo(null)}
                            onUpdated={fetchPublishedVideos}
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PublishedVideos;

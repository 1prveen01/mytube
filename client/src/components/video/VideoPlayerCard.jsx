import React from 'react'
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import CommentList from '../CommentList.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { addComment, getComment } from '../../services/commentService.js';
import { getLikeStatus, postDislikeInVideo, postLikeInVideo, } from '../../services/likeService.js';
import { getSubscriptionStatus } from '../../services/subscribeService.js';
import { togglesubscribeChannel } from '../../services/subscribeService.js';
import SubscribeButton from '../SubscribeButton.jsx';
import AddToPlaylistModal from '../playlist/AddToPlaylistModel.jsx';




const VideoPlayerCard = ({ video }) => {


  const { videoId } = useParams();
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [likeState, setLikeState] = useState({
    liked: false,
    likeCount: 0,
    disliked: false,
    dislikeCount: 0
  });

  //subscribers count
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loadingSubscribe, setLoadingSubscribe] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch subscription status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await getSubscriptionStatus(video.owner._id);
        setIsSubscribed(res.isSubscribed);
        setSubscriberCount(res.subscribersCount);
      } catch (err) {
        console.error("Error fetching subscription status:", err);
      }
    };
    fetchStatus();
  }, [video.owner._id]);

  const handleSubscribe = async () => {
    if (loadingSubscribe) return; // prevent spam clicks
    setLoadingSubscribe(true);
    try {
      const { isSubscribed, subscribersCount } = await togglesubscribeChannel(video.owner._id);
      setIsSubscribed(isSubscribed);
      setSubscriberCount(subscribersCount);
    } catch (err) {
      console.error("Error toggling subscription:", err);
    } finally {
      setLoadingSubscribe(false);
    }
  };

  // Fetch like/dislike status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await getLikeStatus(videoId);
        setLikeState({
          liked: !!res.isLiked,
          likeCount: res.likeCount || 0,
          disliked: !!res.isDisliked,
          dislikeCount: res.dislikeCount || 0
        });
      } catch (error) {
        console.error("Error fetching like/dislike status:", error);
      }
    };
    fetchStatus();
  }, [videoId]);

  // Handle Like
  const handleLike = async () => {
    try {
      const { isLiked, likeCount, dislikeCount } = await postLikeInVideo(videoId);
      setLikeState(prev => ({
        ...prev,
        liked: isLiked,
        likeCount,
        disliked: false,
        dislikeCount
      }));
    } catch (error) {
      console.log("Error in liking Video: ", error);
    }
  };

  // Handle Dislike
  const handleDislike = async () => {
    try {
      const { isDisliked, likeCount, dislikeCount } = await postDislikeInVideo(videoId);
      setLikeState(prev => ({
        ...prev,
        disliked: isDisliked,
        dislikeCount,
        liked: false,
        likeCount
      }));
    } catch (error) {
      console.log("Error in disliking Video: ", error);
    }
  };

  const navigate = useNavigate();

  //handleImage
  const handleImage = () => {
    navigate(`/dashboard/profile`)
  }

  // fetch comments
  useEffect(() => {
    if (!videoId) return;

    const loadComment = async () => {
      try {
        const resComment = await getComment(videoId)
        setComment(resComment.comments || [])

      } catch (error) {
        console.log("Error in fetching comment: ", error)
      }
    }

    loadComment()
  }, [videoId]);


  //adding commments
  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      setLoading(true)
      await addComment(videoId, commentText)
      setCommentText("");

      //re-fetching comments after adding
      const resComment = await getComment(videoId)
      setComment(resComment.comments || [])

    } catch (error) {
      console.log("Error adding in comment: ", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col  md:p-4 lg:p-6 h-screen'>

      {/* //upper half for video */}
      <div className='h-1/2 w-full'>
        <video autoPlay controls={true} className='h-full w-full' src={video.videoFile}></video>
      </div>

      {/* //lower half for comments and details */}
      <div className='h-1/2 w-full'>
        {/* video title and description subscribe like and dislike */}

        <div className='flex flex-row border rounded p-2 justify-between items-center  my-4'>
          <div className='flex flex-col'>
            <h2 className='text-3xl font-medium'>{video.title}</h2>
            <h3 className='text-sm font-regular'>{video.description}</h3>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-black font-semibold justify-center items-center px-4 rounded-3xl py-2"
          >
            + Save to Playlist
          </button>
        </div>

        {showModal && (
          <AddToPlaylistModal
            videoId={video._id}
            onClose={() => setShowModal(false)}
          />
        )}

        {/* parent div */}
        <div className='flex  justify-between   flex-row '>
          {/* name image */}
          <div className='flex items-center  flex-row'>
            <img className='w-14 h-14 cursor-pointer rounded-full' src={video.owner.avatar} onClick={handleImage} alt="" />
            <div className='flex flex-col ml-4 justify-between items-start'>
              <p onClick={handleImage} className='text-md block cursor-pointer font-medium uppercase'>{video.owner.fullName}</p>
              {/* <p className='block text-sm font-light'>{video.owner.username}</p> */}
              <p className='text-sm font-light'>{subscriberCount} subscribers</p>

            </div>
          </div>

          {/* like dislike and subscribe*/}
          <div className='flex   flex-row items-center'>
            <div className='mx-4'>
              <button
                onClick={handleSubscribe}
                disabled={loadingSubscribe}
                className={`flex flex-row font-semibold justify-center items-center px-4 rounded-3xl py-2 transition ${isSubscribed
                  ? "bg-gray-300 text-black hover:bg-gray-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                {loadingSubscribe
                  ? "Loading..."
                  : isSubscribed
                    ? `Subscribed `
                    : `Subscribe `}
              </button>
            </div>

            <div className='flex flex-row  bg-white justify-center items-center border px-4 rounded-3xl py-2'>
              <AiFillLike
                onClick={handleLike}
                className={`text-2xl cursor-pointer ${likeState.liked ? "text-blue-500" : "text-black"}`}
              />
              <p className='mx-1 text-black font-medium'>{likeState.likeCount}</p>
              <AiFillDislike
                onClick={handleDislike}
                className={`text-2xl ml-2 cursor-pointer ${likeState.disliked ? "text-red-500" : "text-black"}`}
              />
              <p className='mx-1 text-black font-medium'>{likeState.dislikeCount}</p>
            </div>
          </div>
        </div>

        {/* Comment box area */}
        <h2 className='text-3xl mt-2'>Comments</h2>
        <div className='flex flex-row justify-start items-center  mt-2'>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full border outline-none border-gray-300 p-2 rounded resize-none"
            rows={2}
          />
          <div className='mx-4'>
            <button
              onClick={handleComment}
              disabled={loading}
              className='bg-white text-md px-4 font-medium rounded-3xl py-2   text-black'>
              {loading ? "Posting..." : "Comment"}
            </button>
          </div>
        </div>


        {/* show comments  */}
        <div className='w-full  mt-2 '>
          <CommentList comments={comment} />

        </div>

      </div>


    </div>
  )
}

export default VideoPlayerCard
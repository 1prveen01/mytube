import React from 'react'
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import CommentList from './CommentList.jsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { addComment, getComment } from '../services/commentService.js';



const VideoPlayerCard = ({ video }) => {


  const { videoId } = useParams();
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");


  // fetch comments
  useEffect(() => {
    if(!videoId) return;

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
    <div className='flex flex-col h-screen'>

      {/* //upper half for video */}
      <div className='h-1/2 w-full'>
        <video autoPlay controls={true} className='h-full w-full' src={video.videoFile}></video>
      </div>

      {/* //lower half for comments and details */}
      <div className='h-1/2 w-full'>
        {/* video title and description subscribe like and dislike */}
        <div className='flex flex-col  border-2 border-red-500 my-4'>
          <h2 className='text-3xl font-medium'>{video.title}</h2>
          <h3 className='text-sm font-regular'>{video.description}</h3>

        </div>

        {/* parent div */}
        <div className='flex border-2 justify-between  border-green-500 flex-row '>
          {/* name image */}
          <div className='flex items-center  flex-row'>
            <img className='w-14 h-14 rounded-full' src="https://cdn.pixabay.com/photo/2020/04/10/14/57/animal-5026147_1280.jpg" alt="" />
            <div className='flex flex-col ml-4 justify-between items-start'>
              <p className='text-md block font-medium uppercase'>praveen kumar</p>
              <p className='block text-sm font-light'>username is written here</p>
            </div>
          </div>

          {/* like dislike and subscribe*/}
          <div className='flex  flex-row items-center'>
            <div className='mx-4'>
              <button className='bg-white text-md px-4 font-medium rounded-3xl py-2   text-black'>Subscribe</button>
            </div>

            <div className='flex flex-row  bg-white justify-center items-center px-4 rounded-3xl py-2'>
              <AiFillLike className='text-2xl text-black' />
              <p className='block mx-1 text-black text-md font-medium'>24</p>
              <AiFillDislike className='text-2xl  ml-2 text-black' />
            </div>
          </div>
        </div>

        {/* Comment box area */}
        <h2 className='text-3xl mt-2'>Comments</h2>
        <div className='flex flex-row justify-start items-center border-2 border-red-500 mt-2'>
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
        <div className='w-full border-2 mt-2 border-white '>
          <CommentList comments={comment} />

        </div>

      </div>


    </div>
  )
}

export default VideoPlayerCard
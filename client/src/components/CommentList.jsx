import React from 'react'
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

const CommentList = ({ comment }) => {
    return (
        <ul className='space-y-4'>
            {
                comment.map((item) => (
                    <li key={item._id} className='border-b-2 border-gray-700 w-[80%]'>
                        <div className='flex items-center mt-2 text-white flex-row'>
                            <img className='w-10 h-10 rounded-full' src="https://cdn.pixabay.com/photo/2020/04/10/14/57/animal-5026147_1280.jpg" alt="" />
                            <div className='flex flex-col ml-4 items-start justify-center'>
                                <p className='block text-sm font-medium'> {item.owner.username} is </p>
                                <p className='block text-sm font-light break-words'>{item.content}</p>
                                <div className='flex flex-row  justify-center items-center'>
                                    <AiFillLike className='text-md cursor-pointer text-white' />
                                    <p className='block mx-1 text-white text-sm font-medium'>24</p>
                                    <AiFillDislike className='text-md  ml-2 text-white cursor-pointer' />
                                </div>
                            </div>

                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default CommentList
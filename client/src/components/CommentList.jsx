import React, { useState, useEffect } from 'react';
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { getDislikedComment, getLikedComment } from '../services/likeService.js';

const CommentList = ({ comments = [] }) => {
    const [likeState, setLikeState] = useState({});

    // Initialize likeState when comments change
    useEffect(() => {
        if (!comments.length) return;

        const initialState = comments.reduce((acc, c) => {
            acc[c._id] = {
                liked: c.isLiked || false,
                count: c.likesCount || 0,
                disliked: c.isDisliked || false,
                dislikeCount: c.dislikeCount || 0,
            };
            return acc;
        }, {});
        setLikeState(initialState);
    }, [comments]);


    const handleLike = async (commentId) => {
        try {
            const res = await getLikedComment(commentId);
            setLikeState((prev) => {
                const current = prev[commentId] || {
                    count: 0,
                    liked: false,
                    dislikeCount: 0,
                    disliked: false,
                };

                return {
                    ...prev,
                    [commentId]: {
                        ...current,
                        liked: res.isLiked,
                        count: res.likesCount ?? current.count,
                        disliked: false,
                        dislikeCount: res.dislikeCount ?? current.dislikeCount,
                    },
                };
            });
        } catch (error) {
            console.log("Error in toggle comment like:", error);
        }
    };
    const handleDislike = async (commentId) => {
        try {
            const res = await getDislikedComment(commentId);
            setLikeState((prev) => {
                const current = prev[commentId] || {
                    count: 0,
                    liked: false,
                    dislikeCount: 0,
                    disliked: false,
                };

                return {
                    ...prev,
                    [commentId]: {
                        ...current,
                        disliked: res.isDisliked,
                        dislikeCount: res.dislikeCount ?? current.dislikeCount,
                        liked: false,
                        count: res.likesCount ?? current.count,
                    },
                };
            });
        } catch (error) {
            console.log("Error in toggle comment dislike:", error);
        }
    };


    return (
        <ul className="space-y-4">
            {comments.map((item) => (
                <li key={item._id} className="p-4 border-b-2 border-gray-700">
                    <div className="flex items-center text-white flex-row">
                        <img
                            className="w-10 h-10 rounded-full cursor-pointer"
                            src={item?.owner?.avatar}
                            alt="avatar"
                        />
                        <div className="flex flex-col ml-4 items-start justify-center">
                            <p className="block text-sm cursor-pointer font-medium">
                                {item?.owner?.username}
                            </p>
                            <p className="block text-sm font-light break-words">
                                {item?.content}
                            </p>
                            <div className="flex flex-row justify-center items-center mt-1">
                                <AiFillLike
                                    onClick={() => handleLike(item._id)}
                                    className={`text-md cursor-pointer ${likeState?.[item._id]?.liked ? "text-blue-500" : "text-white"}`}
                                />

                                <p className="block mx-1 text-white text-sm font-medium">
                                    {likeState?.[item._id]?.count ?? 0}
                                </p>
                                <AiFillDislike
                                    onClick={() => handleDislike(item._id)}
                                    className={`text-md ml-2 cursor-pointer ${likeState?.[item._id]?.disliked ? "text-red-500" : "text-white"}`}
                                />
                                <p className="block mx-1 text-white text-sm font-medium">
                                    {likeState?.[item._id]?.dislikeCount ?? 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CommentList;

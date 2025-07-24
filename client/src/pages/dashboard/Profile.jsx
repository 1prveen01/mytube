import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axios.js';



const Profile = () => {

    const { user, isAuthenticated } = useAuth();
    const [subscribers, setSubscribers] = useState(0);
    const [subscribed, setSubscribed] = useState(0);

    useEffect(() => {
        console.log("User object:", user)
        console.log("User fullName:", user?.fullName);
        console.log("User username:", user?.username);
    }, [user]);


    useEffect(() => {
        if (!user?._id) return;


        //get number of subscribers

        axiosInstance
            .get(`/subscription/get-user-channel-subscribers/${user._id}`)
            .then((res) => (setSubscribers(res.data.length)))
            .catch((err) => (console.log("Error in fetching subscribers: ", err)));


        //get the numbers of subscribed channel
        axiosInstance.get(`/get-subscribed-channels/${user._id}`)
            .then((res) => setSubscribed(res.data.length))
            .catch((err) => console.log("Error in fetching subscribed channels: ", err));

    }, [user])



    if (!isAuthenticated) {
        return <div className="text-white p-4">Please login to view your profile.</div>;
    }



    return (


        <div className="min-h-screen bg-black flex justify-center items-center  text-white p-8 min-w-screen">
            <div className='flex flex-row justify-center border-2 border-gray-900 items-center'>
                <div className="left h-[200px] w-[200px]">
                    <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="" />
                </div>
                <div className="right ml-4 flex-col flex items-start border-2 border-amber-400 justify-between">
                    <h2 className='text-4xl text-white font-medium '>Welcome , {user.fullName}</h2>
                    <h3> channel Name : {user.username}</h3>
                    <h2 className=''>Subscribers: 54</h2>
                    <h2>Subscribed: 20</h2>
                    <h2>Tweets: 2</h2>

                    <div className='flex flex-row justify-around  w-full'>
                        <button className='bg-gray-700 rounded-md px-2 py-1 my-2 text-white text-2xl'>edit</button>
                        <button className='bg-red-600  rounded-md px-2 py-1  my-2 text-white text-2xl'>delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
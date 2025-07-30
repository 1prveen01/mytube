import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axios.js';
import Layout from '../../components/Layout.jsx';



const Profile = () => {

    const { user, isAuthenticated } = useAuth();
    const [image, setImage] = useState("")
    const [subscribers, setSubscribers] = useState(0);
    const [subscribed, setSubscribed] = useState(0);
    const [tweet, setTweet] = useState(0);

    useEffect(() => {
        console.log("User object:", user)
        console.log("User fullName:", user?.fullName);
        console.log("User username:", user?.username);
    }, [user]);


    useEffect(() => {
        if (!user?._id) return;


        //get number of subscribers
        axiosInstance
            .get(`/subscriptions/get-user-channel-subscribers/${user._id}`)
            .then((res) => (setSubscribers(res.data.length)))
            .catch((err) => (console.log("Error in fetching subscribers: ", err)));


        //get the numbers of subscribed channel
        axiosInstance.get(`subscriptions/get-subscribed-channels/${user._id}`)
            .then((res) => setSubscribed(res.data.length))
            .catch((err) => console.log("Error in fetching subscribed channels: ", err));

        //get the number of tweets
        axiosInstance.get(`tweets/get-user-tweets/${user._id}`)
            .then((res) => setTweet(res.data.totalTweet))
            .catch((err) => console.log("Error in fetching total tweets count : ", err));

    }, [user])



    if (!isAuthenticated) {
        return <div className="text-white p-4">Please login to view your profile.</div>;
    }



    return (
        <Layout>
           <div className="flex flex-row justify-center items-center p-8 min-h-[calc(100vh-4rem)] w-full overflow-x-hidden">

                <div className='flex flex-row justify-center border-2 border-gray-900 px-8 py-4 rounded-md items-center'>
                <div className="left h-[200px] w-[200px]">
                    <img 
                    className='h-full w-full object-cover rounded-md' 
                    src={user.avatar} 
                    alt="" />
                </div>
                <div className="right ml-4 flex-col flex items-start  justify-between">
                    <h2 className='text-4xl text-white font-medium '>Welcome , {user.fullName}</h2>
                    <h3> channel Name : {user.username}</h3>
                    <h2 className=''>Subscribers: {subscribers}</h2>
                    <h2>Subscribed: {subscribed}</h2>
                    <h2>Tweets: {tweet}</h2>

                    <div className='flex flex-row justify-between  w-full'>
                        <button className='bg-gray-700 rounded-md px-2 py-1 my-2 text-white text-2xl'>edit</button>
                        <button className='bg-red-600  rounded-md px-2 py-1  my-2 text-white text-2xl'>delete</button>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}

export default Profile
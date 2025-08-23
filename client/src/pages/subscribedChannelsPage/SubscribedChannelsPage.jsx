// SubscribedChannelsPage.jsx
import React, { useState, useEffect } from 'react';
import { getSubscribedChannelsList } from '../../services/subscribeService.js';
import Layout from '../../components/Layout.jsx';
import { useAuth } from '../../context/AuthContext.jsx'; 
import { useNavigate } from 'react-router-dom';


const SubscribedChannelsPage = () => {
    const navigate = useNavigate()
    const { user } = useAuth(); 
    const subscriberId = user?._id;

    const [channels, setChannels] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchSubscribedChannels = async () => {
            try {
                const data = await getSubscribedChannelsList(subscriberId); 
                setChannels(data.subscribedChannel || []);
                setTotal(data.totalSubscribedChannel || 0);
            } catch (error) {
                console.error("Error fetching subscribed channels:", error);
            }
        };

        if (subscriberId) fetchSubscribedChannels();
    }, [subscriberId]);

     const handleChannelClick = (channelId) => {
        navigate(`/channelDashboard/${channelId}`);
    };

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6 text-white">
                    Channels You Subscribed: {total}
                </h1>

                {channels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {channels.map((sub) => (
                            <div
                                key={sub._id}
                                onClick={() => handleChannelClick(sub.channel._id)}
                                className="flex items-center cursor-pointer p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <img
                                    src={sub.channel.avatar}
                                    alt={sub.channel.fullName}
                                    className="w-14 h-14 rounded-full object-cover border mr-4"
                                />
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                                        {sub.channel.fullName}
                                    </h2>
                                    <p className="text-sm text-gray-600 truncate">
                                        @{sub.channel.username}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">
                        You haven’t subscribed to any channels yet.
                    </p>
                )}
            </div>
        </Layout>
    );
};

export default SubscribedChannelsPage;

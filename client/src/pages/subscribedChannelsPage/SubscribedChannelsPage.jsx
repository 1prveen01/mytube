import React, { useState, useEffect } from 'react';
import { getUserChannelSubscribersList } from '../../services/subscribeService.js';
import Layout from '../../components/Layout.jsx';

const SubscribedChannelsPage = ({ subscriberId }) => {
    const [channels, setChannels] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchSubscribedChannels = async () => {
            try {
                const data = await getUserChannelSubscribersList(subscriberId);
                setChannels(data.subscribedChannel || []);
                setTotal(data.totalSubscribedChannel || 0);
            } catch (error) {
                console.error("Error fetching subscribed channels:", error);
            }
        };

        if (subscriberId) fetchSubscribedChannels();
    }, [subscriberId]);

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-xl font-semibold mb-6 text-white">
                    Channels You Subscribed: {total}
                </h1>

                {channels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {channels.map((channel) => (
                            <div
                                key={channel._id}
                                className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                {/* Avatar */}
                                <img
                                    src={channel.owner.avatar}
                                    alt={channel.fullName}
                                    className="w-14 h-14 rounded-full object-cover border mr-4"
                                />

                                {/* Info */}
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                                        {channel.fullName}
                                    </h2>
                                    <p className="text-sm text-gray-600 truncate">
                                        @{channel.username}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">You haven’t subscribed to any channels yet.</p>
                )}
            </div>
        </Layout>
    );
};

export default SubscribedChannelsPage;

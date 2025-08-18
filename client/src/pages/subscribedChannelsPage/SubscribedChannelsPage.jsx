import React, { useState, useEffect } from 'react'

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
        <Layout >


            <div className="p-6">
                
                <h1 className="text-md font-semibold mb-6">
                    Channels You Subscribed: {total}
                </h1>

                <div className="grid grid-cols-1 rounded-md md:grid-cols-3 gap-4">
                    {channels.map((channel) => (
                        <div
                            key={channel._id}
                            className="p-4 border flex flex-row justify-start items-center rounded-lg shadow hover:shadow-lg"
                        >
                            <img src={channel.owner.avatar} alt="" />
                            <div className='flex flex-col items-center'>
                                <h2 className="text-lg font-semibold">{channel.fullName}</h2>
                                <p className="text-sm text-gray-600">{channel.usernmae}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default SubscribedChannelsPage
import React from 'react'

const PlaylistCard = () => {
    return (

        <div className='sm:grid grid-cols-3 md:grid-cols-2 '>
            <div className="card border rounded-2xl bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        className='rounded-2xl'
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title"> Title</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions flex flex-row  justify-between mt-2">
                        <button className="btn bg-blue-600 px-2 py-1 rounded hover:bg-blue-800 btn-primary">Update</button>
                        <button className="btn bg-red-600 px-2 py-1 rounded hover:bg-red-800 btn-primary">Delete </button>
                    </div>
                </div>
            </div>


            <div className="card border rounded-2xl bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        className='rounded-2xl'
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title"> Title</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions flex flex-row  justify-between mt-2">
                        <button className="btn bg-blue-600 px-2 py-1 rounded hover:bg-blue-800 btn-primary">Update</button>
                        <button className="btn bg-red-600 px-2 py-1 rounded hover:bg-red-800 btn-primary">Delete </button>
                    </div>
                </div>
            </div>

            <div className="card border rounded-2xl bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        className='rounded-2xl'
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title"> Title</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions flex flex-row  justify-between mt-2">
                        <button className="btn bg-blue-600 px-2 py-1 rounded hover:bg-blue-800 btn-primary">Update</button>
                        <button className="btn bg-red-600 px-2 py-1 rounded hover:bg-red-800 btn-primary">Delete </button>
                    </div>
                </div>
            </div>

        </div>



    )
}

export default PlaylistCard
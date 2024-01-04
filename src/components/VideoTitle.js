import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='w-screen aspect-video pt-[20%] p-24 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-3xl font-bold w-1/3'>{title}</h1>
            <p className='py-6 text-lg w-2/3'>{overview}</p>
            <div>
                <button className='bg-white text-black rounded-lg p-4 px-12 text-xl hover:bg-opacity-80'>▷ Play</button>
                <button className='mx-2 bg-gray-500 text-white rounded-lg p-4 px-12 text-xl bg-opacity-50'>More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle
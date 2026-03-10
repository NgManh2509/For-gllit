import React from 'react'

const VideoBackGround = () => {
  return (
    <div className='fixed inset-0 -z-10'>
      <video autoPlay loop muted playsInline className='w-full h-full object-cover'>
        <source src={`${import.meta.env.BASE_URL}webBackground.mp4`} type='video/mp4' />
      </video>
      {/* Overlay tối */}
      <div className='absolute inset-0 bg-black/60 backdrop-blur-[3px]' />
    </div>
  )
}

export default VideoBackGround
import React from 'react'

const VideoBackGround = () => {
  return (
    <div className='fixed inset-0 -z-10'>
      <video autoPlay loop muted playsInline className='w-full h-full object-cover'>
        <source 
          src='https://res.cloudinary.com/dgj1wlh6b/video/upload/q_auto,f_auto/v1773160399/ILLIT_%EC%95%84%EC%9D%BC%EB%A6%BF_NOT_ME_Official_MV_mzwcfl.mp4' 
          type='video/mp4' 
        />      
      </video>
      {/* Overlay tối */}
      <div className='absolute inset-0 bg-black/60 backdrop-blur-[3px]' />
    </div>
  )
}

export default VideoBackGround
import React, { useEffect, useRef } from 'react'

const VideoBackGround = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Defer video src assignment until after page is interactive
    // This prevents video from blocking LCP and critical resources
    const video = videoRef.current;
    if (!video) return;

    const loadVideo = () => {
      if (!video.src) {
        video.src = 'https://res.cloudinary.com/dqdssnpbf/video/upload/f_auto,q_auto/v1777541748/videoMV/au5jynayhtbqci65oxgu.webm';
        video.play().catch(() => {});
      }
    };

    // Load video after page load — không block LCP
    if (document.readyState === 'complete') {
      loadVideo();
    } else {
      window.addEventListener('load', loadVideo, { once: true });
      return () => window.removeEventListener('load', loadVideo);
    }
  }, []);

  return (
    <div className='fixed inset-0 -z-10'>
      <video
        ref={videoRef}
        preload="none"
        autoPlay
        loop
        muted
        playsInline
        className='w-full h-full object-cover'
      />
      {/* Overlay tối */}
      <div className='absolute inset-0 bg-black/60 backdrop-blur-[3px]' />
    </div>
  )
}

export default VideoBackGround
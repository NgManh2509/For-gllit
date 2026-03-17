import React, { useState, useEffect, useRef } from 'react';
import awards from '../data/awards.js'; 
const AwardCard = ({ item, bentoClass, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true); 
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Phân biệt Mobile và Desktop ngay khi load trang
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Xử lý hiệu ứng trượt
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { rootMargin: '0px', threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      observer.disconnect();
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.play().catch(error => console.log("Video play interrupted:", error));
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.pause(); 
    }
  };

  const handleClick = () => {
    if (isMobile && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(error => console.log("Playback failed:", error));
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick} 
      className={`group relative overflow-hidden bg-zinc-900/80 rounded-xl md:rounded-2xl flex items-center justify-center cursor-pointer 
      transition-all duration-700 ease-out transform
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} 
      ${bentoClass}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-transparent">
        {isVisible && (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            // VŨ KHÍ MỚI Ở ĐÂY: Desktop load sẵn (auto), Mobile không load (none)
            preload="metadata" 
            className="w-full h-full object-cover transition-opacity duration-500"
          >
            <source src={item.videoLink} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="absolute inset-0 bg-black/30 z-10 transition-colors duration-300 group-hover:bg-black/60" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 pointer-events-none">
        <span className="text-[10px] md:text-xs font-medium text-white/90 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 tracking-wider uppercase mb-2 shadow-lg">
          {item.hosting}
        </span>
        <h3 className="font-serif font-bold text-white leading-tight mb-1 px-2 drop-shadow-md" style={{ fontSize: 'calc(1rem + 0.5vw)' }}>
          {item.awardName}
        </h3>
        <span className="text-xs md:text-sm font-serif italic text-white/80 drop-shadow-sm">
          In {item.awardYear}
        </span>
      </div>
    </div>
  );
};

const AwardSection = () => {
  const getBentoClass = (index) => {
    switch(index) {
      case 0: return "md:col-span-3 md:row-span-2"; 
      case 1: return "md:col-span-3 md:row-span-1"; 
      case 2: return "md:col-span-1 md:row-span-1"; 
      case 3: return "md:col-span-2 md:row-span-1"; 
      case 4: return "md:col-span-2 md:row-span-2"; 
      case 5: return "md:col-span-4 md:row-span-1"; 
      case 6: return "md:col-span-2 md:row-span-1"; 
      case 7: return "md:col-span-2 md:row-span-1"; 
      default: return "md:col-span-2 md:row-span-1";
    }
  };

  return (
    <section className="bg-transparent w-full h-screen mt-[8px] p-2 md:p-3 overflow-hidden flex flex-col box-border">
      <div className="w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-[repeat(8,minmax(0,1fr))] md:grid-rows-4 gap-2 md:gap-3 w-full h-full">
          {awards.map((item, index) => (
            <AwardCard 
              key={item.id} 
              item={item} 
              bentoClass={`${getBentoClass(index)} rounded-xl md:rounded-2xl border border-white/10`} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardSection;
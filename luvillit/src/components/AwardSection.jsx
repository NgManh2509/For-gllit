import React, { useState, useEffect, useRef } from 'react';
import awards from '../data/awards.js';

// AwardCard nhận isMobile từ prop — không tự quản resize nữa
const AwardCard = ({ item, bentoClass, index, isMobile }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Chỉ xử lý hiệu ứng trượt — resize đã được quản lý ở AwardSection cha
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px', threshold: 0.15 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
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
            preload="metadata"
            className="w-full h-full object-cover transition-opacity duration-500"
          >
            <source src={item.videoLink} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="absolute inset-0 bg-black/30 z-10 transition-colors duration-300 group-hover:bg-black/60" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-2 text-center transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 pointer-events-none" style={{ gap: 'clamp(3px, 0.4vw, 8px)' }}>
        <span className="whitespace-nowrap font-medium text-white/90 bg-white/10 backdrop-blur-md rounded-full border border-white/20 tracking-wider uppercase shadow-lg overflow-hidden text-ellipsis max-w-[90%]" style={{ fontSize: 'clamp(7px, 0.65vw, 12px)', padding: 'clamp(3px, 0.3vw, 6px) clamp(6px, 0.7vw, 12px)' }}>
          {item.hosting}
        </span>
        <h3 className="whitespace-nowrap font-serif font-bold text-white drop-shadow-md overflow-hidden text-ellipsis max-w-[95%] px-1" style={{ fontSize: 'clamp(9px, 0.85vw, 18px)', lineHeight: 1.2, margin: 0 }}>
          {item.awardName}
        </h3>
        <span className="whitespace-nowrap font-serif italic text-white/80 drop-shadow-sm" style={{ fontSize: 'clamp(7px, 0.65vw, 14px)' }}>
          In {item.awardYear}
        </span>
      </div>
    </div>
  );
};

const AwardSection = () => {
  // 1 listener duy nhất cho toàn bộ 8 cards
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setIsMobile(window.innerWidth < 768);
    });
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, []);

  const getBentoClass = (index) => {
    switch (index) {
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
              isMobile={isMobile}
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
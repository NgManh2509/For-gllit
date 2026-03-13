import React, { useState, useEffect, useRef } from 'react';
import awards from '../data/awards.js'; 

// --- LOADING ICON FOR LAZY LOAD ---
const LoadingIcon = () => (
  <svg className="animate-spin h-10 w-10 text-white/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- COMPONENT THẺ GIẢI THƯỞNG BENTO ---
// Nhận thêm prop 'index' để làm hiệu ứng stagger (hiện lệch nhau)
const AwardCard = ({ item, bentoClass, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      {
        // Đổi rootMargin thành 0px để thẻ thực sự vào màn hình mới bắt đầu chạy animation
        rootMargin: '0px', 
        threshold: 0.15, // Cần hiện 15% diện tích thẻ mới kích hoạt
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.log("Video play interrupted:", error));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause(); 
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Thêm class animation trượt lên và mờ dần (opacity & translate-y)
      // Dùng isVisible để bật/tắt class
      className={`group relative overflow-hidden bg-transparent rounded-xl md:rounded-2xl flex items-center justify-center cursor-pointer 
      transition-all duration-700 ease-out transform
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} 
      ${bentoClass}`}
      // Mỗi thẻ sẽ có delay dài hơn thẻ trước 100ms
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Vùng chứa Video (bg-transparent) */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-transparent">
        {isVisible ? (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-opacity duration-500"
            preload="metadata"
          >
            <source src={item.videoLink} type="video/mp4" />
          </video>
        ) : (
          <LoadingIcon />
        )}
      </div>

      {/* Lớp phủ tối (Dark Overlay) */}
      <div className="absolute inset-0 bg-black/30 z-10 transition-colors duration-300 group-hover:bg-black/60" />

      {/* Thông tin hiện lên khi HOVER */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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

// --- COMPONENT CHÍNH ---
const AwardSection = () => {
  // Bản đồ toán học chia grid
  const getBentoClass = (index) => {
    switch(index) {
      case 0: return "col-span-1 row-span-1 md:col-span-2 md:row-span-2"; 
      case 1: return "col-span-1 row-span-1 md:col-span-2 md:row-span-2"; 
      case 2: return "col-span-1 row-span-1 md:col-span-1 md:row-span-2"; 
      case 3: return "col-span-1 row-span-1 md:col-span-1 md:row-span-2"; 
      case 4: return "col-span-1 row-span-1 md:col-span-4 md:row-span-1"; 
      case 5: return "col-span-1 row-span-1 md:col-span-2 md:row-span-1"; 
      case 6: return "col-span-1 row-span-1 md:col-span-4 md:row-span-1"; 
      case 7: return "col-span-1 row-span-1 md:col-span-2 md:row-span-1"; 
      default: return "col-span-1 row-span-1";
    }
  };

  return (
    <div className="bg-transparent w-full h-auto min-h-screen md:h-screen p-2 md:p-3 overflow-hidden box-border flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[250px] md:grid-rows-4 md:auto-rows-fr gap-2 md:gap-3 h-full w-full flex-grow">
        {awards.map((item, index) => (
          <AwardCard 
            key={item.id} 
            item={item} 
            bentoClass={getBentoClass(index)} 
            index={index} // Truyền index vào đây
          />
        ))}
      </div>
    </div>
  );
};

export default AwardSection;
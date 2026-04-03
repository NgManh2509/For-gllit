import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MemberCard = ({ member, onClose, onPlayAudio }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === member.image.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? member.image.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNextImage(); /* vuốt trái sang ảnh tiếp theo */
    } else if (distance < -50) {
      handlePrevImage(); /* vuốt phải về ảnh trước */
    }
  };

  if (!member) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&display=swap');
        .font-serif {
            font-family: 'Playfair Display', serif;
        }
      `}} />
      
      {/* Khung bao ngoài cùng */}
      <motion.div 
        className="w-[92vw] md:w-full mx-auto font-sans relative" style={{ maxWidth: 'clamp(300px, 47vw, 680px)' }}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        
        {/* Thẻ trắng (Card) */}
        <div className="relative border border-gray-100 overflow-hidden bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]" style={{ paddingTop: 'clamp(28px, 3vw, 40px)', paddingBottom: 'clamp(20px, 2.5vw, 32px)', paddingLeft: 'clamp(16px, 2.5vw, 32px)', paddingRight: 'clamp(16px, 2.5vw, 32px)' }}>
          
          {/* Lỗ khuyết giống ID card */}
          <div className="absolute left-1/2 -translate-x-1/2 rounded-full z-20 bg-[#e6e8eb] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]" style={{ top: 'clamp(10px, 1vw, 16px)', width: 'clamp(40px, 3.5vw, 68px)', height: 'clamp(10px, 0.9vw, 16px)' }} />

          {/* Nút đóng */}
          <button 
            onClick={onClose}
            className="absolute text-gray-400 hover:text-gray-800 transition-colors bg-transparent rounded-full p-2 z-30 top-2 right-2 md:top-4 md:right-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          {/* Phần 1: Ảnh & Thông tin */}
          <div className="flex items-center" style={{ gap: 'clamp(12px, 1.8vw, 24px)', marginTop: 'clamp(0px, 0.5vw, 8px)' }}>
            
            {/* Khung Ảnh */}
            <div 
              className="flex-shrink-0 relative group" 
              style={{ touchAction: 'pan-y', width: 'clamp(80px, 9vw, 140px)', height: 'clamp(80px, 9vw, 140px)' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={member.image[currentImageIndex]}
                alt={member.stageName}
                className="w-full h-full object-cover border border-black/5 transition-all duration-500 rounded-[12px] md:rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              />
              
              <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[12px] md:rounded-[16px]"></div>

              <div className="absolute inset-0 flex items-center justify-between px-1 md:px-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button onClick={handlePrevImage} className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-1 md:p-1.5 shadow-md transition-transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button onClick={handleNextImage} className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-1 md:p-1.5 shadow-md transition-transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>

              <div className="absolute bottom-1.5 md:bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                {member.image.map((_, idx) => (
                  <div key={idx} className={`h-1 md:h-1.5 rounded-full shadow-sm transition-all ${idx === currentImageIndex ? 'w-2.5 md:w-3.5 bg-white' : 'w-1.5 bg-white/60'}`} />
                ))}
              </div>
            </div>

            {/* Chi tiết Tên / Chức vụ */}
            <div className="flex-grow flex flex-col justify-center min-w-0">
              <h1 className="font-serif font-medium text-black leading-tight truncate" style={{ fontSize: 'clamp(18px, 2.2vw, 34px)', marginBottom: 'clamp(2px, 0.3vw, 4px)' }}>
                {member.stageName}
              </h1>
              <p className="font-normal leading-snug text-[#d85547] truncate" style={{ fontSize: 'clamp(12px, 1.1vw, 17px)' }}>
                {member.pos}
              </p>

              <button
                onClick={() => onPlayAudio(member.intro)}
                className="flex items-center justify-center border border-gray-200 font-medium text-black hover:bg-gray-50 transition-colors w-full sm:w-fit focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                style={{ marginTop: 'clamp(8px, 1vw, 16px)', gap: 'clamp(4px, 0.5vw, 8px)', paddingLeft: 'clamp(8px, 0.8vw, 12px)', paddingRight: 'clamp(8px, 0.8vw, 12px)', paddingTop: 'clamp(5px, 0.4vw, 6px)', paddingBottom: 'clamp(5px, 0.4vw, 6px)', fontSize: 'clamp(10px, 0.9vw, 14px)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0" style={{ width: 'clamp(12px, 1vw, 16px)', height: 'clamp(12px, 1vw, 16px)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                <span className="truncate">Self-introduction monologue</span>
              </button>
            </div>
          </div>

          {/* Phần 2: Bio */}
          <div className="border border-gray-200/80 bg-[#f6f6f6]" style={{ borderRadius: 'clamp(12px, 1.2vw, 20px)', padding: 'clamp(12px, 1.5vw, 24px)', marginTop: 'clamp(16px, 2vw, 32px)' }}>
            <h2 className="font-serif font-medium text-black" style={{ marginBottom: 'clamp(4px, 0.5vw, 12px)', fontSize: 'clamp(13px, 1.1vw, 18px)' }}>Birthday</h2>
            <div className="text-gray-700 overflow-y-auto pr-2 custom-scrollbar leading-relaxed" style={{ marginBottom: 'clamp(6px, 0.8vw, 12px)', fontSize: 'clamp(11px, 0.9vw, 15px)', maxHeight: 'clamp(60px, 6vw, 140px)' }}>
              {member.birthDate}
            </div>
            <h2 className="font-serif font-medium text-black" style={{ marginBottom: 'clamp(4px, 0.5vw, 12px)', fontSize: 'clamp(13px, 1.1vw, 18px)' }}>Place of birth</h2>
            <div className="text-gray-700 overflow-y-auto pr-2 custom-scrollbar leading-relaxed" style={{ marginBottom: 'clamp(6px, 0.8vw, 12px)', fontSize: 'clamp(11px, 0.9vw, 15px)', maxHeight: 'clamp(60px, 6vw, 140px)' }}>
              {member.homeTown}
            </div>
            <h2 className="font-serif font-medium text-black" style={{ marginBottom: 'clamp(4px, 0.5vw, 12px)', fontSize: 'clamp(13px, 1.1vw, 18px)' }}>Bio</h2>
            <div className="text-gray-700 overflow-y-auto pr-2 custom-scrollbar leading-relaxed" style={{ fontSize: 'clamp(11px, 0.9vw, 15px)', maxHeight: 'clamp(60px, 6vw, 140px)' }}>
              {member.bio}
            </div>
          </div>
          
        </div>
      </motion.div>
    </>
  );
};

export default MemberCard;

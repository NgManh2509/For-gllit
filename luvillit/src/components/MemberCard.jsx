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
        className="w-[92vw] md:w-full mx-auto font-sans relative max-w-[680px]" 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        
        {/* Thẻ trắng (Card) */}
        <div className="relative border border-gray-100 overflow-hidden bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] pt-10 pb-6 px-5 md:pb-8 md:px-8">
          
          {/* Lỗ khuyết giống ID card */}
          <div className="absolute left-1/2 -translate-x-1/2 rounded-full z-20 top-3 md:top-4 w-[50px] md:w-[68px] h-[12px] md:h-[16px] bg-[#e6e8eb] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]" />

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
          <div className="flex items-center gap-4 md:gap-6 mt-0 md:mt-2">
            
            {/* Khung Ảnh */}
            <div 
              className="flex-shrink-0 relative group w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]" 
              style={{ touchAction: 'pan-y' }}
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
              <h1 className="font-serif font-medium text-black leading-tight mb-0.5 md:mb-1 text-2xl sm:text-3xl md:text-[34px] truncate">
                {member.stageName}
              </h1>
              <p className="font-normal leading-snug text-[#d85547] text-[15px] md:text-[17px] truncate">
                {member.pos}
              </p>

              <button
                onClick={() => onPlayAudio(member.intro)}
                className="mt-2 md:mt-4 flex items-center justify-center gap-1.5 md:gap-2 border border-gray-200 font-medium text-black hover:bg-gray-50 transition-colors w-full sm:w-fit focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white rounded-lg px-2 py-1.5 md:px-3 md:py-1.5 text-[11.5px] md:text-[14px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                <span className="truncate">Self-introduction monologue</span>
              </button>
            </div>
          </div>

          {/* Phần 2: Bio */}
          <div className="border border-gray-200/80 bg-[#f6f6f6] rounded-[16px] md:rounded-[20px] p-4 md:p-6 mt-5 md:mt-8">
            <h2 className="font-serif font-medium text-black mb-1.5 md:mb-3 text-[16px] md:text-[18px]">Birthday</h2>
            <div className="text-gray-700 overflow-y-auto pr-2 custom-scrollbar mb-2 md:mb-3 text-[14px] md:text-[15px] leading-relaxed max-h-[90px] md:max-h-[140px]">
              {member.birthDate}
            </div>
            <h2 className="font-serif font-medium text-black mb-1.5 md:mb-3 text-[16px] md:text-[18px]">Place of birth</h2>
            <div className="text-gray-700 overflow-y-auto pr-2 custom-scrollbar mb-2 md:mb-3 text-[14px] md:text-[15px] leading-relaxed max-h-[90px] md:max-h-[140px]">
              {member.homeTown}
            </div>
            <h2 className="font-serif font-medium text-black mb-1.5 md:mb-3 text-[16px] md:text-[18px]">Bio</h2>
            <div className="text-gray-700 overflow-y-auto pr-2 custom-scrollbar text-[14px] md:text-[15px] leading-relaxed max-h-[90px] md:max-h-[140px]">
              {member.bio}
            </div>
          </div>
          
        </div>
      </motion.div>
    </>
  );
};

export default MemberCard;

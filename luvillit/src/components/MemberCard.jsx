import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MemberCard = ({ member, onClose, onPlayAudio }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === member.image.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? member.image.length - 1 : prev - 1));
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
        className="w-full mx-auto font-sans relative" 
        style={{ maxWidth: '680px' }}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        
        {/* Thẻ trắng (Card) */}
        <div 
          className="relative border border-gray-100 overflow-hidden" 
          style={{ 
            padding: '40px 32px 32px 32px', 
            backgroundColor: '#ffffff', 
            borderRadius: '15px', 
            boxShadow: '0 20px 60px -15px rgba(0,0,0,0.3)' 
          }}
        >
          
          {/* Lỗ khuyết giống ID card */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 rounded-full z-20" 
            style={{ 
              top: '16px', 
              width: '68px', 
              height: '16px', 
              backgroundColor: '#e6e8eb', 
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)' 
            }} 
          />

          {/* Nút đóng */}
          <button 
            onClick={onClose}
            className="absolute text-gray-400 hover:text-gray-800 transition-colors bg-transparent rounded-full p-2 z-30"
            style={{ top: '20px', right: '20px' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          {/* Phần 1: Ảnh & Thông tin */}
          <div className="flex items-center" style={{ gap: '24px', marginTop: '12px' }}>
            
            {/* Khung Ảnh */}
            <div className="flex-shrink-0 relative group" style={{ width: '140px', height: '140px' }}>
              <img
                src={member.image[currentImageIndex]}
                alt={member.stageName}
                className="w-full h-full object-cover border border-black/5 transition-all duration-500"
                style={{ borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              />
              
              <div 
                className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                style={{ borderRadius: '16px' }}
              ></div>

              <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button onClick={handlePrevImage} className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 shadow-md transition-transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button onClick={handleNextImage} className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-1.5 shadow-md transition-transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>

              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                {member.image.map((_, idx) => (
                  <div key={idx} className={`h-1.5 rounded-full shadow-sm transition-all ${idx === currentImageIndex ? 'w-3.5 bg-white' : 'w-1.5 bg-white/60'}`} />
                ))}
              </div>
            </div>

            {/* Chi tiết Tên / Chức vụ */}
            <div className="flex-grow flex flex-col justify-center">
              <h1 className="font-serif font-medium text-black leading-tight mb-1" style={{ fontSize: '34px' }}>
                {member.stageName}
              </h1>
              <p className="font-normal leading-snug" style={{ color: '#d85547', fontSize: '17px' }}>
                {member.pos}
              </p>

              <button
                onClick={() => onPlayAudio(member.intro)}
                className="mt-4 flex items-center gap-2 border border-gray-200 font-medium text-black hover:bg-gray-50 transition-colors w-fit focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                style={{ 
                  borderRadius: '8px', 
                  padding: '6px 12px', 
                  fontSize: '14px', 
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)' 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
                Self-introduction monologue
              </button>
            </div>
          </div>

          {/* Phần 2: Bio */}
          <div 
            className="border border-gray-200/80" 
            style={{ 
              marginTop: '32px', 
              backgroundColor: '#f6f6f6', 
              borderRadius: '20px', 
              padding: '24px' 
            }}
          >
            <h2 className="font-serif font-medium text-black mb-3" style={{ fontSize: '18px' }}>Birthday</h2>
            <div 
              className="text-gray-700 overflow-y-auto pr-2 custom-scrollbar mb-3" 
              style={{ fontSize: '15px', lineHeight: '1.6', maxHeight: '140px' }}
            >
              {member.birthDate}
            </div>
            <h2 className="font-serif font-medium text-black mb-3" style={{ fontSize: '18px' }}>Place of birth</h2>
            <div 
              className="text-gray-700 overflow-y-auto pr-2 custom-scrollbar mb-3" 
              style={{ fontSize: '15px', lineHeight: '1.6', maxHeight: '140px' }}
            >
              {member.homeTown}
            </div>
            <h2 className="font-serif font-medium text-black mb-3" style={{ fontSize: '18px' }}>Bio</h2>
            <div 
              className="text-gray-700 overflow-y-auto pr-2 custom-scrollbar mb-3" 
              style={{ fontSize: '15px', lineHeight: '1.6', maxHeight: '140px' }}
            >
              {member.bio}
            </div>
          </div>
          
        </div>
      </motion.div>
    </>
  );
};

export default MemberCard;
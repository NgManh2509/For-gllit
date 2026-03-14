"use client";
import React from "react";

const MemberFrame = ({ 
  imageUrl, 
  name = "Moka",
  className = "" 
}) => {
  return (
    // Dùng w-full h-full để lấp đầy 100% tỷ lệ được giao từ MemberSection
    <div className={`relative inline-block w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ${className}`}>
      
      {/* Khung viền mỏng dần trên mobile để bớt thô */}
      <div className="relative w-full h-full border-[clamp(1px,0.2vw,3px)] border-white box-border bg-black">
        
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover block"
        />

        {/* Thẻ tên dùng % để tự di chuyển theo khung */}
        <div 
          className="absolute bg-white flex items-center justify-center z-10"
          style={{
            top: '-25%',                  
            right: '-2.2%',                 
            height: '25%',                
            padding: '2% 10%',            
            minHeight: '16px',            
          }}
        >
          <span 
            className="text-black"
            style={{ 
              fontFamily: "'Pixelify Sans', sans-serif", 
              fontSize: 'clamp(8px, 1.5vw, 24px)', 
              lineHeight: '1',
              transform: 'translateY(10%)' 
            }}
          >
            {name}
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default MemberFrame;
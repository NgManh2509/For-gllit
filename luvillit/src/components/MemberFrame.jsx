"use client";
import React from "react";

const MemberFrame = ({ 
  imageUrl, 
  name = "Moka",
  className = "" 
}) => {
  return (
    <div className={`relative inline-block w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] @container ${className}`}>
      
      <div className="relative w-full h-full border-[clamp(1px,0.2vw,3px)] border-white box-border bg-black">
        
        <img 
          src={imageUrl} 
          alt={name} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover block"
        />
        <div 
          className="absolute bg-white flex items-center justify-center z-10
                     -top-[13cqw] -translate-y-1/2 -right-[clamp(1px,0.2vw,3px)] 
                     px-[5cqw] py-[2cqw]"
        >
          <span 
            className="text-black"
            style={{ 
              fontFamily: "'Pixelify Sans', sans-serif", 
              fontSize: '20cqw', 
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
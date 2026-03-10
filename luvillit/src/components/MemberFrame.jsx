"use client";
import React from "react";

const MemberFrame = ({ 
  imageUrl, 
  name = "Moka",
  width = "w-72",   
  height = "h-96",  
  className = "" 
}) => {
  return (
    // Tăng mt-12 để chừa khoảng trống lớn hơn cho thẻ tên không bị lẹm
    <div className={`relative inline-block ${width} ${height} mt-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ${className}`}>
      
      {/* KHUNG VIỀN CHÍNH (Sắc nét, không bo góc) */}
      <div className="relative w-full h-full border-[3px] border-white box-border bg-black">
        
        {/* ẢNH GỐC */}
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover block"
        />

        {/* THẺ TÊN (Textbox) */}
        <div 
          className="absolute bg-white flex items-center justify-center z-10"
          style={{
            top: '-49px',        // Kéo thẻ tên lên cao hơn để nằm hẳn trên viền
            right: '-3px',       // Ép sát lề phải, che đi cái viền trắng bên phải
            padding: '5px 14px', // TĂNG PADDING: 10px trên/dưới, 24px trái/phải
            height: '49px',      // Đảm bảo chiều cao đủ bao phủ xuống chạm mí viền trong
          }}
        >
          <span 
            className="text-black"
            style={{ 
              fontFamily: "'Pixelify Sans', sans-serif", 
              fontSize: '24px', 
              lineHeight: '1',
              transform: 'translateY(2px)' 
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
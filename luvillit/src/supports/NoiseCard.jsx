
import React, { useEffect, useRef } from "react";

const NoiseCard = ({
  width = "w-96",
  height = "h-72",
  children,
  className = "",
  noiseOpacity = 0.15,
  grainSize = 1,
  imageUrl = "",
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Vẽ noise tĩnh một lần — không dùng rAF loop
    const drawNoise = () => {
      const { width, height } = canvas;
      if (width === 0 || height === 0) return;

      if (grainSize === 1) {
        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;
        const opacity = Math.floor(noiseOpacity * 255);
        for (let i = 0; i < data.length; i += 4) {
          const randomValue = Math.floor(Math.random() * 255);
          data[i] = randomValue;
          data[i + 1] = randomValue;
          data[i + 2] = randomValue;
          data[i + 3] = opacity;
        }
        ctx.putImageData(imageData, 0, 0);
      } else {
        ctx.clearRect(0, 0, width, height);
        for (let y = 0; y < height; y += grainSize) {
          for (let x = 0; x < width; x += grainSize) {
            const randomValue = Math.floor(Math.random() * 255);
            ctx.fillStyle = `rgba(${randomValue}, ${randomValue}, ${randomValue}, ${noiseOpacity})`;
            ctx.fillRect(x, y, grainSize, grainSize);
          }
        }
      }
    };

    // Chỉ vẽ lại khi container thay đổi kích thước (resize), không loop
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        drawNoise();
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [noiseOpacity, grainSize]);

 return (
    <div
      ref={containerRef}
      // Khung bọc ngoài nhận các class w-full, h-auto từ prop truyền vào
      className={`relative overflow-hidden ${width} ${height} ${className}`}
    >
      {/* 1. LỚP DƯỚI CÙNG: Ảnh nền (Không dùng absolute để nó tự bung chiều cao) */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="background"
          className="w-full h-auto block" 
        />
      )}

      {/* 2. LỚP Ở GIỮA: Canvas tạo noise (Dùng absolute để đè lên ảnh) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-overlay opacity-80"
      />

      {/* 3. LỚP TRÊN CÙNG: Nội dung children (nếu có) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default NoiseCard;
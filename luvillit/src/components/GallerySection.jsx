import React, { useEffect, useRef } from 'react';

// =========================================================
// --- 0. CẤU HÌNH & DỮ LIỆU ---
// =========================================================
const POOL_SIZE = 14;           
const TICK_SPACING = 16;        
const VIRTUAL_TICKS_COUNT = 150; 
const BASE = import.meta.env.BASE_URL;

const galleryData = Array.from({ length: 42 }, (_, i) => {
  return { 
    type: 'image', 
    src: `${BASE}/galleryCollection/illit (${i+1}).webp`,
    num: i + 1 
  };
});
const DATA_LEN = galleryData.length;

export default function GallerySection() {
  const containerRef = useRef(null);
  const galleryWrapperRef = useRef(null);
  const timelineContainerRef = useRef(null);
  const timelineCanvasRef = useRef(null); 

  const poolRefs = useRef([]);

  useEffect(() => {
    const mainContainer = containerRef.current;
    const galleryWrapper = galleryWrapperRef.current;
    const timelineContainer = timelineContainerRef.current;
    const timelineCanvas = timelineCanvasRef.current;

    if (!mainContainer || !galleryWrapper || !timelineContainer || !timelineCanvas) return;

    const ctx = timelineCanvas.getContext('2d');
    if (!ctx) return;

    // Sync canvas kích thước với container
    const syncCanvasSize = () => {
      timelineCanvas.width  = timelineContainer.clientWidth;
      timelineCanvas.height = timelineContainer.clientHeight;
    };
    syncCanvasSize();
    const canvasSizeObserver = new ResizeObserver(syncCanvasSize);
    canvasSizeObserver.observe(timelineContainer);

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let targetTranslate = 0;
    let prevTranslate = 0;

    let isHoveringTimeline = false;
    let mouseX = 0;
    let reqId;
    
    // Biến lưu thời gian tương tác cuối để Auto-scroll
    let lastInteractionTime = Date.now();

    // Cache isMobile bên ngoài rAF — tránh forced reflow mỗi frame
    let isMobile = window.innerWidth < 768;
    const mobileObserver = new ResizeObserver(() => {
      isMobile = window.innerWidth < 768;
    });
    mobileObserver.observe(document.documentElement);

    // --- MOUNT-ONCE: Tạo cấu trúc DOM cho 14 pool slots, chỉ chạy 1 lần ---
    poolRefs.current.forEach((node) => {
      if (!node || node.children.length > 0) return;
      // Wrapper ngoài cùng
      const wrapper = document.createElement('div');
      wrapper.className = "relative w-full h-full group cursor-pointer";

      // Container ảnh

      const img = document.createElement('img');
      img.alt = "Gallery";
      img.className = "w-full h-full object-contain pointer-events-none";

      wrapper.appendChild(img);

      // Wrapper text
      const textWrapper = document.createElement('div');
      textWrapper.className = "absolute top-full right-0 mt-2 w-full flex justify-end pb-2";

      const textInfo = document.createElement('div');
      // text-right: căn phải thẳng cạnh phải của slot ảnh, w-full chiếm toàn bộ chiều rộng slot
      textInfo.className = "text-white text-[10px] md:text-xs font-medium tracking-[0.1em] md:tracking-[0.2em] uppercase pointer-events-none drop-shadow-md whitespace-nowrap transition-all duration-300 ease-out opacity-100 translate-y-0 md:opacity-0 md:[transform:translateZ(-50px)_translateY(-10px)] md:group-hover:opacity-100 md:group-hover:[transform:translateZ(0px)_translateY(0px)]";

      textWrapper.appendChild(textInfo);
      wrapper.appendChild(textWrapper);
      node.appendChild(wrapper);

      // Lưu ref để rAF loop dùng, không rebuild DOM nữa
      node._img  = img;
      node._text = textInfo;
      node._dataIndex = -1; // force update lần đầu
    });

    // --- CÁC SỰ KIỆN KÉO THẢ VÀ CUỘN ---
    const startDrag = (e) => {
      isDragging = true;
      const clientDrag = e.pageX || e.touches?.[0].pageX;
      startX = clientDrag - targetTranslate;
      lastInteractionTime = Date.now();
    };
    const onDrag = (e) => {
      if (!isDragging) return;
      const x = e.pageX || e.touches?.[0].pageX;
      targetTranslate = x - startX;
      lastInteractionTime = Date.now();
    };
    const endDrag = () => { 
      isDragging = false; 
    };

    window.addEventListener("mousedown", startDrag);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchstart", startDrag, { passive: false });
    window.addEventListener("touchmove", onDrag, { passive: false });
    window.addEventListener("touchend", endDrag);
 

    const onTimelineMouseMove = (e) => {
      isHoveringTimeline = true;
      const rect = timelineContainer.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      lastInteractionTime = Date.now();
    };
    const onTimelineMouseLeave = () => {
      isHoveringTimeline = false;
    };

    timelineContainer.addEventListener("mousemove", onTimelineMouseMove);
    timelineContainer.addEventListener("mouseleave", onTimelineMouseLeave);

    const ease = 0.1;
    const skewFactor = 0.08;  
    const maxSkew = 15;       

    const render = () => {
      // isMobile được cache bên ngoài — không đọc layout ở đây nữa

      // LOGIC AUTO-SCROLL CHO MOBILE (Tự chạy nếu thả tay > 1 giây)
      if (isMobile && !isDragging && (Date.now() - lastInteractionTime > 1000)) {
        targetTranslate -= 0.8;
      }

      currentTranslate += (targetTranslate - currentTranslate) * ease;
      const velocity = currentTranslate - prevTranslate;
      prevTranslate = currentTranslate;

      let skewX = -velocity * skewFactor;
      if (skewX > maxSkew) skewX = maxSkew;
      if (skewX < -maxSkew) skewX = -maxSkew;
      if (Math.abs(velocity) < 0.05) skewX = 0;

      // Desktop: giá trị cố định, không đổi theo resize — gap luôn là 60px (380-320)
      // Mobile: compact hơn, gap 30px (290-260)
      const actualWidth = poolRefs.current[0]?.clientWidth || 0;
      const currentItemW = actualWidth > 0 ? actualWidth : (isMobile ? 260 : 320);
      
      // Chốt cứng khoảng trống giữa 2 bức ảnh (Gap)
      const gap = isMobile ? 30 : 60; 
      const currentSlotW = currentItemW + gap;

      // --- CẬP NHẬT GALLERY ---
      const wrapperW = galleryWrapper.clientWidth;
      const centerSlot = Math.round(-currentTranslate / currentSlotW);
      const startSlot = centerSlot - Math.floor(POOL_SIZE / 2);

      poolRefs.current.forEach((node, i) => {
        if (!node) return;
        const slotIndex = startSlot + i;
        const dataIndex = ((slotIndex % DATA_LEN) + DATA_LEN) % DATA_LEN;

        // Chỉ mutate khi data thực sự thay đổi — không rebuild DOM
        if (node._dataIndex !== dataIndex) {
          node._dataIndex = dataIndex;
          node._img.src   = galleryData[dataIndex].src;
          node._text.textContent = `ILLIT Illustration #${galleryData[dataIndex].num}`;
        }

        const x = wrapperW / 2 + currentTranslate + slotIndex * currentSlotW - currentItemW / 2;
        node.style.transform = `translateX(${x}px) skewX(${skewX}deg)`;
      });

      // --- VẼ TIMELINE BẰNG CANVAS ---
      const cW = timelineCanvas.width;
      const cH = timelineCanvas.height;
      const centerY = cH / 2;
      const canvasCenterX = cW / 2;

      const exactCenterIndex = -currentTranslate / TICK_SPACING;

      let hoverCenterIndex = -1;
      if (isHoveringTimeline && !isDragging) {
        const centerOfContainer = timelineContainer.clientWidth / 2;
        hoverCenterIndex = (mouseX - centerOfContainer - currentTranslate) / TICK_SPACING;
      }

      ctx.clearRect(0, 0, cW, cH);

      // Số ticks cần vẽ để phủ hết canvas (thêm đệm 2 bên)
      const visibleTicks = Math.ceil(cW / TICK_SPACING) + 4;
      const startIndex = Math.floor(exactCenterIndex) - Math.floor(visibleTicks / 2);

      for (let j = 0; j < visibleTicks; j++) {
        const absoluteIndex = startIndex + j;
        // Vị trí x của tick: canvas center + offset theo scroll
        const tickX = canvasCenterX + (absoluteIndex * TICK_SPACING + currentTranslate);

        if (tickX < -TICK_SPACING || tickX > cW + TICK_SPACING) continue;

        const isMajor = absoluteIndex % 30 === 0;
        const baseH   = isMajor ? 24 : 12;
        const baseOp  = isMajor ? 1.0 : 0.4;

        // Center shrink effect
        let finalScaleY = 1;
        const distToCenter = Math.abs(exactCenterIndex - absoluteIndex);
        if (distToCenter <= 3) {
          finalScaleY = 0.2 + distToCenter * 0.26;
          if (finalScaleY > 1) finalScaleY = 1;
        }

        // Hover wave effect
        if (isHoveringTimeline && !isDragging) {
          const distToHover = Math.abs(hoverCenterIndex - absoluteIndex);
          if (distToHover <= 5) {
            const waveScale = 1 + 0.8 * Math.cos((distToHover / 5) * (Math.PI / 2));
            finalScaleY = Math.max(finalScaleY, waveScale);
          }
        }

        const drawH = baseH * finalScaleY;
        ctx.globalAlpha = baseOp;
        ctx.fillStyle = '#808080';
        ctx.fillRect(tickX - 1, centerY - drawH / 2, 2, drawH);
      }

      ctx.globalAlpha = 1;

      reqId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousedown", startDrag);
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchstart", startDrag);
      window.removeEventListener("touchmove", onDrag);
      window.removeEventListener("touchend", endDrag);

      if (timelineContainer) {
        timelineContainer.removeEventListener("mousemove", onTimelineMouseMove);
        timelineContainer.removeEventListener("mouseleave", onTimelineMouseLeave);
      }
      mobileObserver.disconnect();
      canvasSizeObserver.disconnect();
      cancelAnimationFrame(reqId);
    };
  }, []); 

  return (
    <div 
      ref={containerRef}
      // FIX 1: Thay md:gap-10 thành md:gap-[clamp(24px,4vh,40px)] để khoảng trống giữa các khối tự động co giãn
      className="relative flex flex-col h-screen justify-start pt-10 md:pt-15 gap-6 md:gap-[clamp(24px,4vh,40px)] overflow-hidden select-none cursor-grab active:cursor-grabbing bg-transparent text-inherit"
    >
      
      {/* --- HỌA TIẾT NỀN RESPONSIVE --- */}
      <div className="absolute top-[10%] md:top-[15%] left-[5%] md:left-[10%] w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-blue-500/10 rounded-full blur-[60px] md:blur-[85px] pointer-events-none" />
      <div className="absolute bottom-[15%] md:bottom-[20%] right-[10%] md:right-[15%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-500/10 rounded-full blur-[70px] md:blur-[100px] pointer-events-none" />

      {/* HEADER RESPONSIVE */}
      <div className="text-center mt-[10px] md:pt-1 pointer-events-none z-10 w-full shrink-0">
        <h1 className="font-noto font-bold text-white tracking-[0.1em] md:tracking-[0.2em] leading-tight md:leading-[0.9] m-0 uppercase text-4xl md:text-[clamp(2.5rem,6vh,4.5rem)]">
          {/* FIX 2: Thay md:text-[4.5rem] cứng thành clamp để chữ Gallery nhỏ lại khi màn hình lùn đi */}
          GALLERY 
        </h1>
      </div>

      {/* GALLERY CONTAINER RESPONSIVE */}
      {/* FIX 3: Thay md:h-[500px] thành md:h-[clamp(360px,50vh,500px)] */}
      <div className="relative overflow-hidden z-10 w-full shrink-0 h-[380px] md:h-[clamp(360px,50vh,500px)]" id="gallery-wrapper" ref={galleryWrapperRef}>
        <div className="absolute inset-0 will-change-transform [perspective:1200px] [transform-style:preserve-3d]">
          {Array.from({ length: POOL_SIZE }).map((_, i) => (
            <div
              key={i}
              // Chiều rộng sẽ tự động = Chiều cao * 0.8 (chuẩn tỉ lệ 1080x1350)
              className="absolute top-1/2 -translate-y-1/2 will-change-transform h-[320px] md:h-[clamp(340px,45vh,420px)] aspect-[4/5]"
              ref={(el) => (poolRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      {/* FIX 5: Thay md:h-[120px] thành md:h-[clamp(80px,12vh,120px)] */}
      <div 
        className="relative w-full px-[5vw] flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] z-10 shrink-0 h-[80px] md:h-[clamp(80px,12vh,120px)]" 
        ref={timelineContainerRef}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-[2px] h-[60px] bg-white -translate-x-1/2 z-10 pointer-events-none" />

        <canvas
          ref={timelineCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}
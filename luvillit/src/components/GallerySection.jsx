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
    src: `${BASE}/galleryCollection/illit (${i+1}).jpg`,
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
      wrapper.className = "flex flex-col items-center justify-center w-full h-full group cursor-pointer";

      // Container ảnh
      const imgContainer = document.createElement('div');
      imgContainer.className = "w-full overflow-hidden flex justify-center items-center h-[90%]";

      const img = document.createElement('img');
      img.alt = "Gallery";
      img.className = "w-full h-full object-contain pointer-events-none";

      imgContainer.appendChild(img);
      wrapper.appendChild(imgContainer);

      // Wrapper text
      const textWrapper = document.createElement('div');
      textWrapper.className = "w-full overflow-hidden mt-2 flex justify-end h-[10%]";

      const textInfo = document.createElement('div');
      textInfo.className = "text-white text-[10px] md:text-xs font-medium tracking-[0.1em] md:tracking-[0.2em] uppercase transform translate-y-0 md:-translate-y-4 opacity-100 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none";

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

      const currentItemW = isMobile ? 260 : 320;
      const currentSlotW = isMobile ? 290 : 360;

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
      className="relative flex flex-col h-screen justify-center gap-6 md:gap-10 overflow-hidden select-none cursor-grab active:cursor-grabbing bg-transparent text-inherit"
    >
      
      {/* --- HỌA TIẾT NỀN RESPONSIVE --- */}
      <div className="absolute top-[10%] md:top-[15%] left-[5%] md:left-[10%] w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-blue-500/10 rounded-full blur-[60px] md:blur-[85px] pointer-events-none" />
      <div className="absolute bottom-[15%] md:bottom-[20%] right-[10%] md:right-[15%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-500/10 rounded-full blur-[70px] md:blur-[100px] pointer-events-none" />

      {/* HEADER RESPONSIVE (Đã thêm -mt-[10px] và bỏ pt để kéo cao hơn) */}
      <div className="text-center -mt-[10px] md:pt-2 pointer-events-none z-10 w-full shrink-0">
        <h1 className="text-4xl md:text-[4.5rem] font-noto font-bold text-white tracking-[0.1em] md:tracking-[0.2em] leading-tight md:leading-[0.9] m-0 uppercase">
          GALLERY 
        </h1>
      </div>

      {/* GALLERY CONTAINER RESPONSIVE */}
      <div className="relative overflow-hidden z-10 h-[360px] md:h-[500px] w-full shrink-0" id="gallery-wrapper" ref={galleryWrapperRef}>
        <div className="absolute inset-0 will-change-transform [perspective:1200px] [transform-style:preserve-3d]">
          {Array.from({ length: POOL_SIZE }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-[260px] md:w-[320px] h-[340px] md:h-[420px] will-change-transform overflow-hidden"
              ref={(el) => (poolRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div 
        className="relative w-full px-[5vw] h-[80px] md:h-[120px] flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] z-10 shrink-0" 
        ref={timelineContainerRef}
      >
        {/* Đường kẻ trắng tâm giữ nguyên là DOM */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-[2px] h-[60px] bg-white -translate-x-1/2 z-10 pointer-events-none" />

        {/* Canvas thay thế 150 tick DOM nodes */}
        <canvas
          ref={timelineCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}
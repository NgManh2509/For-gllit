import React, { useEffect, useRef, useState } from 'react';

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

  // --- ANIMATION STEP 1: State để kích hoạt animation ---
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const mainContainer = containerRef.current;
    const galleryWrapper = galleryWrapperRef.current;
    const timelineContainer = timelineContainerRef.current;
    const timelineCanvas = timelineCanvasRef.current;

    if (!mainContainer || !galleryWrapper || !timelineContainer || !timelineCanvas) return;

    // --- ANIMATION STEP 2: Intersection Observer Setup ---
    // Chỉ kích hoạt animation khi người dùng scroll đến section này
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // Bật state để trigger CSS transition
          // Sau khi hiện ra rồi thì không cần observe nữa để tiết kiệm CPU
          observer.unobserve(mainContainer); 
        }
      },
      { 
        threshold: 0.15 // Section hiện ra 15% diện tích thì mới trigger
      }
    );

    observer.observe(mainContainer);

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

    // Cache isMobile bên ngoài rAF
    let isMobile = window.innerWidth < 768;
    const mobileObserver = new ResizeObserver(() => {
      isMobile = window.innerWidth < 768;
    });
    mobileObserver.observe(document.documentElement);

    // --- MOUNT-ONCE: Tạo cấu trúc DOM ---
    poolRefs.current.forEach((node) => {
      if (!node || node.children.length > 0) return;

      const wrapper = document.createElement('div');
      wrapper.className = "relative w-full h-full group cursor-pointer";

      const img = document.createElement('img');
      img.alt = "Gallery";
      img.className = "w-full h-full object-contain pointer-events-none";
      wrapper.appendChild(img);

      const textWrapper = document.createElement('div');
      textWrapper.className = "absolute top-full right-0 mt-2 w-full flex justify-end pb-2"; 

      const textInfo = document.createElement('div');
      textInfo.className = "text-white text-[10px] md:text-xs font-medium tracking-[0.1em] md:tracking-[0.2em] uppercase pointer-events-none drop-shadow-md whitespace-nowrap transition-all duration-300 ease-out opacity-100 translate-y-0 md:opacity-0 md:[transform:translateZ(-50px)_translateY(-10px)] md:group-hover:opacity-100 md:group-hover:[transform:translateZ(0px)_translateY(0px)]";

      textWrapper.appendChild(textInfo);
      wrapper.appendChild(textWrapper);
      node.appendChild(wrapper);

      node._img  = img;
      node._text = textInfo;
      node._dataIndex = -1; 
    });

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

      const actualWidth = poolRefs.current[0]?.clientWidth || 0;
      const currentItemW = actualWidth > 0 ? actualWidth : (isMobile ? 260 : 320);
      
      const gap = isMobile ? 30 : 60; 
      const currentSlotW = currentItemW + gap;

      const wrapperW = galleryWrapper.clientWidth;
      const centerSlot = Math.round(-currentTranslate / currentSlotW);
      const startSlot = centerSlot - Math.floor(POOL_SIZE / 2);

      poolRefs.current.forEach((node, i) => {
        if (!node) return;
        const slotIndex = startSlot + i;
        const dataIndex = ((slotIndex % DATA_LEN) + DATA_LEN) % DATA_LEN;

        if (node._dataIndex !== dataIndex) {
          node._dataIndex = dataIndex;
          node._img.src   = galleryData[dataIndex].src;
          node._text.textContent = `ILLIT Illustration #${galleryData[dataIndex].num}`;
        }

        const x = wrapperW / 2 + currentTranslate + slotIndex * currentSlotW - currentItemW / 2;
        node.style.transform = `translateX(${x}px) skewX(${skewX}deg)`;
      });

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

      const visibleTicks = Math.ceil(cW / TICK_SPACING) + 4;
      const startIndex = Math.floor(exactCenterIndex) - Math.floor(visibleTicks / 2);

      for (let j = 0; j < visibleTicks; j++) {
        const absoluteIndex = startIndex + j;
        const tickX = canvasCenterX + (absoluteIndex * TICK_SPACING + currentTranslate);

        if (tickX < -TICK_SPACING || tickX > cW + TICK_SPACING) continue;

        const isMajor = absoluteIndex % 30 === 0;
        const baseH   = isMajor ? 24 : 12;
        const baseOp  = isMajor ? 1.0 : 0.4;

        let finalScaleY = 1;
        const distToCenter = Math.abs(exactCenterIndex - absoluteIndex);
        if (distToCenter <= 3) {
          finalScaleY = 0.2 + distToCenter * 0.26;
          if (finalScaleY > 1) finalScaleY = 1;
        }

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
      observer.disconnect(); // ANIMATION STEP 3: Cleanup observer
      cancelAnimationFrame(reqId);
    };
  }, []); 

  // --- ANIMATION STEP 4: Định nghĩa các class tiện ích ---
  // Class ban đầu (ẩn): Mờ, trượt xuống, thu nhỏ nhẹ
  const hiddenBase = "opacity-0 translate-y-8 scale-95";
  // Class khi hiện: Rõ, vị trí chuẩn, scale chuẩn
  const visibleBase = "opacity-100 translate-y-0 scale-100";
  // Class transition cơ bản (hardware accelerated)
  const transitionBase = "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform";

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col h-screen justify-center gap-6 md:gap-[clamp(24px,4vh,40px)] overflow-hidden select-none cursor-grab active:cursor-grabbing bg-transparent text-inherit"
    >
      {/* HỌA TIẾT NỀN RESPONSIVE */}
      <div className="absolute top-[10%] md:top-[15%] left-[5%] md:left-[10%] w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-blue-500/10 rounded-full blur-[60px] md:blur-[85px] pointer-events-none" />
      <div className="absolute bottom-[15%] md:bottom-[20%] right-[10%] md:right-[15%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-500/10 rounded-full blur-[70px] md:blur-[100px] pointer-events-none" />

      {/* HEADER RESPONSIVE */}
      {/* ANIMATION STEP 5: Áp dụng class cho Header (trượt từ dưới lên, delay 0ms) */}
      <div className={`text-center -mt-[40px] md:-mt-[10px] md:pt-2 pointer-events-none z-10 w-full shrink-0 ${transitionBase} ${isInView ? visibleBase : hiddenBase}`}>
        <h1 className="font-noto font-bold text-white tracking-[0.1em] md:tracking-[0.2em] leading-tight md:leading-[0.9] m-0 uppercase text-4xl md:text-[clamp(2.5rem,6vh,4.5rem)]">
          GALLERY 
        </h1>
      </div>

      {/* GALLERY CONTAINER RESPONSIVE */}
      {/* ANIMATION STEP 6: Áp dụng class cho Gallery Wrapper (scale nhẹ, delay 200ms) */}
      <div className={`relative overflow-hidden z-10 w-full shrink-0 h-[380px] md:h-[clamp(360px,50vh,500px)] ${transitionBase} delay-200 ${isInView ? visibleBase : hiddenBase}`} id="gallery-wrapper" ref={galleryWrapperRef}>
        <div className="absolute inset-0 will-change-transform [perspective:1200px] [transform-style:preserve-3d]">
          {Array.from({ length: POOL_SIZE }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 will-change-transform h-[320px] md:h-[clamp(340px,45vh,420px)] aspect-[4/5]"
              ref={(el) => (poolRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      {/* ANIMATION STEP 7: Áp dụng class cho Timeline (delay 400ms) */}
      <div 
        className={`relative w-full px-[5vw] flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] z-10 shrink-0 h-[80px] md:h-[clamp(80px,12vh,120px)] ${transitionBase} delay-400 ${isInView ? visibleBase : hiddenBase}`} 
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
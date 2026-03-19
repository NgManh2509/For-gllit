import React, { useEffect, useRef } from 'react';

// =========================================================
// --- 0. CẤU HÌNH & DỮ LIỆU ---
// =========================================================
const SLOT_WIDTH = 360;         
const ITEM_WIDTH = 320;
const POOL_SIZE = 14;           
const TICK_SPACING = 16;        
const VIRTUAL_TICKS_COUNT = 150; 
const BASE = import.meta.env.BASE_URL;

const galleryData = Array.from({ length: 42 }, (_, i) => {
  // Trả về thêm num để dùng cho dòng chữ ILLIT Illustration
  return { 
    type: 'image', 
    src: `${BASE}/galleryCollection/anh (${i+1}).jpg`,
    num: i + 1 
  };
});
const DATA_LEN = galleryData.length;

export default function GallerySection() {
  const galleryWrapperRef = useRef(null);
  const timelineTrackRef = useRef(null);
  const timelineContainerRef = useRef(null);

  const poolRefs = useRef([]);
  const tickWrapperRefs = useRef([]);
  const tickRefs = useRef([]);

  useEffect(() => {
    const galleryWrapper = galleryWrapperRef.current;
    const timelineTrack = timelineTrackRef.current;
    const timelineContainer = timelineContainerRef.current;

    if (!galleryWrapper || !timelineTrack || !timelineContainer) return;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let targetTranslate = 0;
    let prevTranslate = 0;

    let isHoveringTimeline = false;
    let mouseX = 0;
    let reqId;

    // --- HÀM RENDER NỘI DUNG (THÊM LẠI HOVER TEXT) ---
    const setNodeContent = (node, data) => {
      node.innerHTML = ''; 
      if (data.type === 'image') {
        const wrapper = document.createElement('div');
        wrapper.className = "flex flex-col items-center justify-center w-full h-full group cursor-pointer";

        const imgContainer = document.createElement('div');
        imgContainer.className = "w-full overflow-hidden transition-transform duration-300";
        // Bỏ scale-110 (zoom) theo yêu cầu
        
        const img = document.createElement('img');
        img.src = data.src;
        img.alt = "Gallery";
        img.className = "w-full h-auto object-contain pointer-events-none"; 
        
        imgContainer.appendChild(img);
        wrapper.appendChild(imgContainer);

        // Text ở bên dưới, trượt xuống khi hover
        const textWrapper = document.createElement('div');
        // Dồn hết chiều ngang và căn text sang phải
        textWrapper.className = "w-full overflow-hidden mt-2 flex justify-end";
        
        const textInfo = document.createElement('div');
        // Đổi màu text thành trắng
        textInfo.className = "text-white text-xs font-medium tracking-[0.2em] uppercase transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none";
        textInfo.innerText = `ILLIT Illustration #${data.num}`;
        
        textWrapper.appendChild(textInfo);
        wrapper.appendChild(textWrapper);

        node.appendChild(wrapper);
      } else {
        node.innerHTML = `<div class="w-full h-full flex items-center justify-center text-[3rem] font-black text-center bg-[#1d4ed8] text-white pointer-events-none leading-none">${data.content}</div>`;
      }
    };

    const startDrag = (e) => {
      isDragging = true;
      startX = (e.pageX || e.touches?.[0].pageX) - targetTranslate;
    };
    const onDrag = (e) => {
      if (!isDragging) return;
      const x = e.pageX || e.touches?.[0].pageX;
      targetTranslate = x - startX;
    };
    const endDrag = () => { isDragging = false; };

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
      currentTranslate += (targetTranslate - currentTranslate) * ease;
      const velocity = currentTranslate - prevTranslate;
      prevTranslate = currentTranslate;
      
      let skewX = -velocity * skewFactor;
      if (skewX > maxSkew) skewX = maxSkew;
      if (skewX < -maxSkew) skewX = -maxSkew;
      if (Math.abs(velocity) < 0.05) skewX = 0;

      // --- CẬP NHẬT GALLERY ---
      const wrapperW = galleryWrapper.clientWidth;
      const centerSlot = Math.round(-currentTranslate / SLOT_WIDTH);
      const startSlot = centerSlot - Math.floor(POOL_SIZE / 2);

      poolRefs.current.forEach((node, i) => {
        if (!node) return;
        const slotIndex = startSlot + i;
        const dataIndex = ((slotIndex % DATA_LEN) + DATA_LEN) % DATA_LEN;

        if (node._dataIndex !== dataIndex) {
          node._dataIndex = dataIndex;
          setNodeContent(node, galleryData[dataIndex]);
        }

        const x = wrapperW / 2 + currentTranslate + slotIndex * SLOT_WIDTH - ITEM_WIDTH / 2;
        node.style.transform = `translateX(${x}px) skewX(${skewX}deg)`;
      });

      // --- CẬP NHẬT TIMELINE (GIỮ NGUYÊN) ---
      timelineTrack.style.transform = `translateX(${currentTranslate}px)`;
      const exactCenterIndex = -currentTranslate / TICK_SPACING;

      let hoverCenterIndex = -1;
      if (isHoveringTimeline && !isDragging) {
        const centerOfContainer = timelineContainer.clientWidth / 2;
        hoverCenterIndex = (mouseX - centerOfContainer - currentTranslate) / TICK_SPACING;
      }

      const startIndex = Math.floor(exactCenterIndex) - Math.floor(VIRTUAL_TICKS_COUNT / 2);

      tickWrapperRefs.current.forEach((wrapper, j) => {
        if (!wrapper || !tickRefs.current[j]) return;
        const tick = tickRefs.current[j];
        const absoluteIndex = startIndex + j; 
        
        wrapper.style.transform = `translateX(${absoluteIndex * TICK_SPACING}px)`;
        
        const isMajor = absoluteIndex % 30 === 0;
        tick.style.height = isMajor ? '24px' : '12px';
        tick.style.opacity = isMajor ? '1' : '0.4';

        let finalScaleY = 1; 
        const distToCenter = Math.abs(exactCenterIndex - absoluteIndex);
        if (distToCenter <= 3) {
          finalScaleY = 0.2 + (distToCenter * 0.26);
          if (finalScaleY > 1) finalScaleY = 1;
        }

        if (isHoveringTimeline && !isDragging) {
          const distToHover = Math.abs(hoverCenterIndex - absoluteIndex);
          if (distToHover <= 5) { 
            const waveScale = 1 + (0.8) * Math.cos((distToHover / 5) * (Math.PI / 2));
            finalScaleY = Math.max(finalScaleY, waveScale);
          }
        }
        tick.style.transform = `scaleY(${finalScaleY})`;
      });

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
      cancelAnimationFrame(reqId);
    };
  }, []); 

  return (
    // Thay justify-between bằng justify-center và thêm gap-10 để các phần cách nhau rộng hơn
    <div className="relative flex flex-col h-screen justify-center gap-10 overflow-hidden select-none cursor-grab active:cursor-grabbing bg-transparent text-inherit">
      
      {/* --- HỌA TIẾT NỀN (KHÔNG DÍNH VIỀN) --- */}
      <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[85px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER */}
      {/* pt-10 pb-5 đổi thành pt-4 pb-0, vì đã có gap-6 lo phần khoảng cách */}
      <div className="text-center pt-4 pointer-events-none z-10 w-full shrink-0">
        <h1 className="text-[4.5rem] font-noto font-bold text-white tracking-[0.2em] leading-[0.9] m-0 uppercase">
          GALLERY 
        </h1>
      </div>

      {/* GALLERY */}
      {/* Sửa grow thành h-[500px] (cố định tạm) hoặc shrink-0 để không bị giãn hết cỡ, ép các component lại gần */}
      <div className="relative overflow-hidden z-10 h-[500px] w-full shrink-0" id="gallery-wrapper" ref={galleryWrapperRef}>
        <div className="absolute inset-0 will-change-transform [perspective:1200px] [transform-style:preserve-3d]">
          {Array.from({ length: POOL_SIZE }).map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-[320px] h-[420px] will-change-transform overflow-hidden"
              ref={(el) => (poolRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>

      {/* TIMELINE (GIỮ NGUYÊN) */}
      <div 
        className="relative w-full px-[5vw] h-[120px] flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] z-10 shrink-0" 
        ref={timelineContainerRef}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-[2px] h-[60px] bg-white -translate-x-1/2 z-10 pointer-events-none"></div>
        
        <div className="absolute left-1/2 top-0 h-full will-change-transform" ref={timelineTrackRef}>
          {Array.from({ length: VIRTUAL_TICKS_COUNT }).map((_, j) => (
            <div
              key={j}
              className="absolute -left-[8px] top-1/2 -translate-y-1/2 w-[16px] h-[60px] flex items-end justify-center"
              ref={(el) => (tickWrapperRefs.current[j] = el)}
            >
              <div
                className="w-[2px] origin-bottom will-change-transform"
                style={{ backgroundColor: '#808080' }}
                ref={(el) => (tickRefs.current[j] = el)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
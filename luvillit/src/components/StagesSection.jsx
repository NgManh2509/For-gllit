import React, { useState, useEffect } from 'react';
import fanCamData from '../data/fanCam';





const AccordionShowcase = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const checkIsMobile = () => {
            if (isMounted) setIsMobile(window.innerWidth < 768);
        };
        checkIsMobile();
        const ro = new ResizeObserver(checkIsMobile);
        ro.observe(document.documentElement);
        return () => { isMounted = false; ro.disconnect(); };
    }, []);
    
  const [activeCardId, setActiveCardId] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const handleCardClick = (id, vidArray) => {
    if (activeCardId === id) return;
    
    setActiveCardId(id);
    const randomIndex = Math.floor(Math.random() * vidArray.length);
    setActiveVideoIndex(randomIndex);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setActiveCardId(null);
  };

  return (
    <div className={isMobile ? "flex flex-col h-[1650px] w-full bg-transparent text-white font-serif pt-6 md:pt-10" : "flex flex-col h-screen w-full bg-transparent overflow-hidden text-white font-serif pt-6 md:pt-10"}>
      
      <div className="flex flex-col items-center justify-center shrink-0 mb-[10px] bg-transparent relative z-10 -mt-8 md:-mt-6">
        
        {/* CHỮ STAGES */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans tracking-[0.3em] text-white drop-shadow-lg">
          STAGES
        </h1>
        
        {/* DÒNG SUBTITLE TINH TẾ */}
        {/* Sử dụng font-serif, in nghiêng (italic), chữ mỏng (font-light), và làm mờ (text-white/60) để tạo nét thanh lịch */}
        <p className="text-xs md:text-sm font-serif italic font-light tracking-widest text-white/60 mt-2">
          ( illit's fancam )
        </p>

      </div>
      
      <div className="flex flex-col md:flex-row w-full flex-1 min-h-0">
       
        {fanCamData.map((idol) => {
          const isActive = activeCardId === idol.id;

          return (
            <div
              key={idol.id}
              onClick={() => handleCardClick(idol.id, idol.vid)}
              style={{ willChange: 'flex' }}
              className={`
                relative cursor-pointer overflow-hidden 
                border-b md:border-b-0 md:border-r border-white/10 last:border-b-0 md:last:border-r-0
                transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isActive ? 'flex-[3] md:flex-[1.5] cursor-default' : 'flex-1'}
              `}
            >
              
              {/* Ảnh dùng chung cho cả Mobile và Desktop để tránh giật lag */}
              <img
                src={idol.img}
                alt={`${idol.name} FanCam`}
                loading="lazy" /* Đợi cuộn tới mới tải để nhường tốc độ mạng cho nội dung trên cùng */
                decoding="async" /* Parse ảnh mượt hơn ở chế độ chạy nền */
                className={`absolute inset-0 w-full h-full object-cover z-10 
                  object-[50%_20%] md:object-center /* Dùng mốc cắt ảnh khác nhau cho mobile và desktop */
                  transition-transform duration-700 
                  ${isActive ? 'md:scale-105' : ''}`}
              />

              {/* LỚP PHỦ */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:from-black/80 md:via-transparent md:to-transparent z-20 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}
              ></div>

              {/* TÊN IDOL */}
              <div
                className={`absolute z-30 font-light text-white/80 tracking-[0.2em] transition-all duration-500
                  bottom-4 left-6 md:bottom-10 md:left-auto md:right-5 
                  text-2xl md:text-4xl lg:text-5xl 
                  md:[writing-mode:vertical-rl] md:rotate-180 
                  ${isActive ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
              >
                {idol.name}
              </div>

              {/* KHU VỰC VIDEO */}
              <div
                className={`absolute inset-0 bg-black z-40 transition-opacity duration-500 delay-300
                  flex items-center justify-center
                  ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
              >
                {/* Nút đóng */}
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 md:top-5 md:right-5 z-50 w-10 h-10 bg-transparent hover:bg-white/20 rounded-full flex items-center justify-center text-2xl transition-colors font-sans"
                >
                  &times;
                </button>

                {/* Video */}
                <video
                  key={idol.vid[activeVideoIndex]}
                  className="w-full h-full object-cover shadow-2xl" 
                  src={idol.vid[activeVideoIndex]}
                  preload="metadata"
                  muted
                  playsInline
                  loop
                  ref={(el) => {
                    if (el) {
                      if (isActive) {
                        el.play().catch(e => console.log("Trình duyệt chặn autoplay:", e));
                      } else {
                        el.pause();
                        el.currentTime = 0;
                      }
                    }
                  }}
                  title={`${idol.name} FanCam`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="h-[50px] md:h-[60px] shrink-0 bg-[#0a0a0a] flex justify-center md:justify-start items-center px-4 md:px-10 font-sans">
        <p className="text-gray-500 hover:text-white font-bold text-xs md:text-sm transition-colors text-center"> All videos are from Youtube @BIMONG and @Dori_YouTube </p>
      </div>

    </div>
  );
};

export default AccordionShowcase;

import React, { useState, useEffect, useRef } from 'react';
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

  const renderDesktop = () => (
    <div className="flex flex-col h-screen w-full bg-transparent overflow-hidden text-white font-serif pt-0 md:pt-5">
      
      <div className="flex flex-col items-center justify-center shrink-0 mb-[10px] bg-transparent relative z-10 -mt-8 md:-mt-6">
        
        {/* CHỮ STAGES */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sans tracking-[0.3em] text-white drop-shadow-lg">
          STAGES
        </h1>
        
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
                  className="w-full h-full object-cover object-[50%_15%] shadow-2xl" 
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
      <div className="h-[60px] shrink-0 flex justify-center items-center font-sans z-50 pointer-events-none bg-neutral-950">
        <p className="italic text-white text-[13px] font-medium font-['Lora',serif]">Fin.</p>
      </div>

    </div>
  );

  const [deck, setDeck] = useState(fanCamData);
  const [swipeDir, setSwipeDir] = useState(null);
  const [isPlayingMobile, setPlayingMobile] = useState(false);
  const [mobileVideoIndex, setMobileVideoIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (swipeDir) return;
    const distance = touchStartX.current - touchEndX.current;
    
    if (distance > 50) {
      triggerSwipe('left'); // Swiped left
    } else if (distance < -50) {
      triggerSwipe('right'); // Swiped right
    } else {
      setPlayingMobile(!isPlayingMobile); // Tap to toggle play
    }
  };
  const triggerSwipe = (dir) =>{
    setSwipeDir(dir);
    setPlayingMobile(false);
    setTimeout(() => {
      setDeck((prevDeck) => {
        const newDeck = [...prevDeck];
        const [first] = newDeck.splice(0, 1);
        newDeck.push(first);
        return newDeck;
      });
      setSwipeDir(null);
      setMobileVideoIndex(Math.floor(Math.random() * deck[1].vid.length));
    }, 300);
  }
  const renderMobile = () => (
    <div className="flex md:hidden flex-col h-[100dvh] w-full bg-transparent overflow-hidden text-white font-serif relative">
      
      {/* HEADER MOBILE */}
      <div className="flex flex-col items-center justify-center shrink-0 pt-10 relative z-50">
        <h1 className="text-3xl font-bold font-sans tracking-[0.3em] text-white drop-shadow-lg">STAGES</h1>
        <p className="text-xs font-serif italic font-light tracking-widest text-white/60 mt-2">( illit's fancam )</p>
        <p className="text-[10px] text-white/40 mt-4 font-sans uppercase tracking-widest animate-pulse">
          {isPlayingMobile ? "Swipe to next" : "Tap to play • Swipe to next"}
        </p>
      </div>

{/* KHU VỰC THẺ DECK */}
      <div className="flex-1 w-full relative flex items-center justify-center perspective-[1000px]">
        {deck.map((idol, index) => {
          // Chỉ render 3 thẻ trên cùng
          if (index > 2) return null;

          const isFront = index === 0;
          const isSecond = index === 1;
          const isThird = index === 2;

          // Xử lý CSS Animation tạo hiệu ứng "Bộ Bài Vật Lý"
          let transformClasses = "";
          let filterClass = ""; // Dùng độ sáng thay vì độ trong suốt

          if (isFront && swipeDir === 'left') {
            transformClasses = "-translate-x-[120%] -rotate-12 opacity-0"; 
          } else if (isFront && swipeDir === 'right') {
            transformClasses = "translate-x-[120%] rotate-12 opacity-0"; 
          } else if (isFront) {
            // Thẻ trên cùng: To nhất, đổ bóng mạnh nhất, không xoay
            transformClasses = "translate-x-0 translate-y-0 rotate-0 scale-100 z-30 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"; 
            filterClass = "brightness-100";
          } else if (isSecond) {
            // Thẻ thứ 2: Lệch sang phải một chút, hơi xoay nghiêng, thu nhỏ cực ít
            transformClasses = "translate-x-4 translate-y-3 rotate-4 scale-[0.98] z-20 shadow-xl"; 
            filterClass = "brightness-75"; // Tối đi để tạo cảm giác bị đè
          } else if (isThird) {
            // Thẻ thứ 3: Lệch sang trái, xoay ngược chiều lại
            transformClasses = "-translate-x-4 translate-y-6 -rotate-3 scale-[0.95] z-10 shadow-lg"; 
            filterClass = "brightness-50"; // Tối nhất
          }

          return (
            <div
              key={idol.id}
              onTouchStart={isFront ? handleTouchStart : undefined}
              onTouchMove={isFront ? handleTouchMove : undefined}
              onTouchEnd={isFront ? handleTouchEnd : undefined}
              // Thêm filterClass vào thẻ tổng
              className={`absolute w-[75vw] aspect-[9/16] rounded-2xl overflow-hidden will-change-transform transition-all duration-300 ease-out ${transformClasses} ${filterClass}`}
            >
              {/* Ảnh Cover */}
              <img
                src={idol.img}
                alt={idol.name}
                className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
              />

              {/* Gradient Tối Góc Dưới */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 pointer-events-none"></div>

              {/* Tên Idol */}
              <div className={`absolute bottom-6 left-6 z-20 font-light text-white tracking-[0.2em] text-3xl transition-opacity duration-300 ${isPlayingMobile && isFront ? 'opacity-0' : 'opacity-100'}`}>
                {idol.name}
              </div>

              {/* Lớp Video */}
              {isFront && isPlayingMobile && (
                <div className="absolute inset-0 bg-black z-30 animate-in fade-in duration-300">
                  <video
                    className="w-full h-full object-cover object-[50%_15%]"
                    src={idol.vid[mobileVideoIndex]}
                    autoPlay muted playsInline loop
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="h-[60px] shrink-0 flex justify-center items-center font-sans z-50 pointer-events-none">
        <p className="italic text-white text-[13px] font-medium font-['Lora',serif]">Fin.</p>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? renderMobile() : renderDesktop()}
    </>
  );
};

export default AccordionShowcase;

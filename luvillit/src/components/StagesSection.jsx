import React, { useState, useEffect, useRef, useCallback } from 'react';
import fanCamData from '../data/fanCam';

const VideoSkeleton = () => (
  <div className="video-skeleton">
    <div className="video-skeleton__play" />

    <div className="video-skeleton__dots">
      <div className="video-skeleton__dot" />
      <div className="video-skeleton__dot" />
      <div className="video-skeleton__dot" />
    </div>

    <div className="video-skeleton__bottom">
      <div className="video-skeleton__title video-skeleton__shimmer" />
      <div className="video-skeleton__subtitle video-skeleton__shimmer" />
      <div className="video-skeleton__progress-track" />
    </div>
  </div>
);

const AccordionShowcase = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;

    const checkIsMobile = () => {
      if (!isMounted) return;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => { 
      isMounted = false; 
      window.removeEventListener('resize', checkIsMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const [activeCardId, setActiveCardId] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const handleCardClick = useCallback((id, vidArray) => {
    if (activeCardId === id) return;
    
    setIsVideoLoaded(false);
    setActiveCardId(id);
    const randomIndex = Math.floor(Math.random() * vidArray.length);
    setActiveVideoIndex(randomIndex);
  }, [activeCardId]);

  const handleClose = useCallback((e) => {
    e.stopPropagation();
    setIsVideoLoaded(false);
    setActiveCardId(null);
  }, []);

  const renderDesktop = () => (
    <div className="flex flex-col h-screen w-full bg-transparent overflow-hidden text-white font-serif pt-0 md:pt-5">
      
      <div className="flex flex-col items-center justify-center shrink-0 mb-[10px] bg-transparent relative z-10 -mt-8 md:-mt-6">
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
              <img
                src={idol.img}
                alt={`${idol.name} FanCam`}
                loading="lazy" 
                decoding="async" 
                className={`absolute inset-0 w-full h-full object-cover z-10 
                  object-[50%_20%] md:object-center
                  transition-transform duration-700 
                  ${isActive ? 'md:scale-105' : ''}`}
              />

              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:from-black/80 md:via-transparent md:to-transparent z-20 transition-opacity duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}
              ></div>

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
                {isActive && (
                  <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 md:top-5 md:right-5 z-50 w-10 h-10 bg-transparent hover:bg-white/20 rounded-full flex items-center justify-center text-2xl transition-colors font-sans"
                  >
                    &times;
                  </button>
                )}

                {isActive && !isVideoLoaded && <VideoSkeleton />}

                {isActive && (
                  <video
                    key={idol.vid[activeVideoIndex]}
                    className={`absolute inset-0 w-full h-full object-cover object-[50%_15%] shadow-2xl transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`} 
                    src={idol.vid[activeVideoIndex]}
                    preload="metadata"
                    autoPlay
                    muted
                    playsInline
                    loop
                    onLoadedData={() => setIsVideoLoaded(true)}
                    title={`${idol.name} FanCam`}
                  />
                )}
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

  const triggerSwipe = useCallback((dir) => {
    setSwipeDir(dir);
    setPlayingMobile(false);
    setIsVideoLoaded(false);
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
  }, [deck]);

  const handleTouchEnd = useCallback(() => {
    if (swipeDir) return;
    const distance = touchStartX.current - touchEndX.current;
    
    if (distance > 50) {
      triggerSwipe('left');
    } else if (distance < -50) {
      triggerSwipe('right');
    } else {
      setIsVideoLoaded(false);
      setPlayingMobile(!isPlayingMobile);
    }
  }, [swipeDir, isPlayingMobile, triggerSwipe]);

  const renderMobile = () => (
    <div className="flex md:hidden flex-col h-[100dvh] w-full bg-transparent overflow-hidden text-white font-serif relative">
      
      <div className="flex flex-col items-center justify-center shrink-0 pt-10 relative z-50">
        <h1 className="text-3xl font-bold font-sans tracking-[0.3em] text-white drop-shadow-lg">STAGES</h1>
        <p className="text-xs font-serif italic font-light tracking-widest text-white/60 mt-2">( illit's fancam )</p>
        <p className="text-[10px] text-white/40 mt-4 font-sans uppercase tracking-widest animate-pulse">
          {isPlayingMobile ? "Swipe to next" : "Tap to play • Swipe to next"}
        </p>
      </div>

      <div className="flex-1 w-full relative flex items-center justify-center perspective-[1000px]">
        {deck.map((idol, index) => {
          if (index > 2) return null;

          const isFront = index === 0;
          const isSecond = index === 1;
          const isThird = index === 2;

          let transformClasses = "";
          let filterClass = "";

          if (isFront && swipeDir === 'left') {
            transformClasses = "-translate-x-[120%] -rotate-12 opacity-0"; 
          } else if (isFront && swipeDir === 'right') {
            transformClasses = "translate-x-[120%] rotate-12 opacity-0"; 
          } else if (isFront) {
            transformClasses = "translate-x-0 translate-y-0 rotate-0 scale-100 z-30 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"; 
            filterClass = "brightness-100";
          } else if (isSecond) {
            transformClasses = "translate-x-4 translate-y-3 rotate-4 scale-[0.98] z-20 shadow-xl"; 
            filterClass = "brightness-75"; 
          } else if (isThird) {
            transformClasses = "-translate-x-4 translate-y-6 -rotate-3 scale-[0.95] z-10 shadow-lg"; 
            filterClass = "brightness-50"; 
          }

          return (
            <div
              key={idol.id}
              onTouchStart={isFront ? handleTouchStart : undefined}
              onTouchMove={isFront ? handleTouchMove : undefined}
              onTouchEnd={isFront ? handleTouchEnd : undefined}
              className={`absolute w-[75vw] aspect-[9/16] rounded-2xl overflow-hidden will-change-transform transition-all duration-300 ease-out ${transformClasses} ${filterClass}`}
            >
              <img
                src={idol.img}
                alt={idol.name}
                className="absolute inset-0 w-full h-full object-cover object-[50%_20%]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 pointer-events-none"></div>

              <div className={`absolute bottom-6 left-6 z-20 font-light text-white tracking-[0.2em] text-3xl transition-opacity duration-300 ${isPlayingMobile && isFront ? 'opacity-0' : 'opacity-100'}`}>
                {idol.name}
              </div>

              {isFront && isPlayingMobile && (
                <div className="absolute inset-0 bg-black z-30 animate-in fade-in duration-300">
                  
                  {!isVideoLoaded && <VideoSkeleton />}

                  <video
                    className={`absolute inset-0 w-full h-full object-cover object-[50%_15%] transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    src={idol.vid[mobileVideoIndex]}
                    autoPlay 
                    muted 
                    playsInline 
                    loop
                    onLoadedData={() => setIsVideoLoaded(true)}
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
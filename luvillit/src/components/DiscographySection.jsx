import React, { useState, useEffect, useRef } from 'react';
import discoLink from '../data/discographyData';

const endTime = new Date('2026-04-30 18:00:00').getTime();

// Component phụ trợ làm hiệu ứng trượt lên
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out z-10 relative ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Component xử lý HUD Decorator chốt ở các góc
const CornerDecorator = ({ position, label, reverse = false }) => (
  <div className={`absolute ${position} flex items-center gap-3 opacity-50 z-0 pointer-events-none ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse"></div>
    <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-white drop-shadow-md">
      {label}
    </span>
  </div>
);

// Component xử lý SVG: Text uốn cong (Chỉ giữ lại vòng tròn)
const CurvedTextCircle = ({ text, radius, direction = 'normal', duration = '40s', textSize = 'text-2xl', opacity = 'opacity-30', offset = '0%', extraStyle = {} }) => {
  const size = radius * 2 + 100;
  const center = size / 2;
  const pathD = `M ${center}, ${center} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  return (
    <div className="absolute flex items-center justify-center pointer-events-none" style={{ width: size, height: size }}>
      <svg 
        viewBox={`0 0 ${size} ${size}`} 
        className="w-full h-full overflow-visible"
        style={{
          animationName: 'pure-spin',
          animationDuration: duration,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: direction === 'reverse' ? 'reverse' : 'normal',
          animationPlayState: extraStyle.animationPlayState ?? 'running',
        }}
      >
        <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        <defs>
          <path id={`path-${radius}`} d={pathD} />
        </defs>
        <text className={`${textSize} ${opacity} tracking-[0.5em] font-noto font-black uppercase fill-white drop-shadow-lg`}>
          <textPath href={`#path-${radius}`} startOffset={offset}>
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

// Component chứa 2 quỹ đạo tròn — tự pause khi off-screen
const AnimatedCircles = () => {
  const ref = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsPaused(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pauseStyle = isPaused ? { animationPlayState: 'paused' } : {};

  return (
    <div ref={ref} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <CurvedTextCircle text="BE:LIFT" radius={800} duration="70s" direction="reverse" offset="55%" opacity="opacity-40" textSize="text-2xl md:text-5xl" extraStyle={pauseStyle} />
      <CurvedTextCircle text="ILLIT" radius={500} duration="50s" offset="85%" opacity="opacity-60" textSize="text-xl md:text-4xl" extraStyle={pauseStyle} />
    </div>
  );
};

const DiscographySection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let timer = null;

    const tick = () => {
      const timeNow = new Date().getTime();
      const distance = endTime - timeNow;
      if (distance < 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    const startTimer = () => { tick(); timer = setInterval(tick, 1000); };
    const stopTimer  = () => clearInterval(timer);

    // Không chạy countdown khi tab ẩn
    const handleVis = () => document.hidden ? stopTimer() : startTimer();
    document.addEventListener('visibilitychange', handleVis);
    startTimer();

    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVis);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes pure-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Thẻ cha chứa toàn bộ Section */}
      <div className="w-full relative py-24 flex justify-center bg-transparent overflow-hidden">
        
        {/* Lớp nền HUD viễn tưởng */}
        <AnimatedCircles />

        {/* --- CÁC ĐIỂM HUD CHỐT Ở CÁC GÓC SECTION --- */}
        {/* Góc trên trái */}
        <CornerDecorator position="top-12 left-8 md:left-16" label="EST. 2024 // GLOBAL_SYNC" />
        
        {/* Góc trên phải (chữ đảo ngược lại cho thuận mắt) */}
        <CornerDecorator position="top-32 right-8 md:right-16" label="CORE_SYSTEM_ONLINE" reverse={true} />
        
        {/* Góc giữa trái */}
        <CornerDecorator position="top-1/2 left-4 md:left-12 -translate-y-1/2" label="DATA_NODE_01" />

        {/* Góc dưới trái */}
        <CornerDecorator position="bottom-32 left-8 md:left-16" label="BELIFT LAB M.V." />

        {/* Góc dưới phải */}
        <CornerDecorator position="bottom-12 right-8 md:right-16" label="MAGNETIC V1.0" reverse={true} />


        {/* --- NỘI DUNG CHÍNH --- */}
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center relative z-10">
          
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold font-noto text-center tracking-widest text-white drop-shadow-md mb-12">
              DISCOGRAPHY
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="w-full flex flex-col items-center mb-16">
              <div className="relative group w-64 h-64 sm:w-80 sm:h-80 bg-black aspect-square overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-300">
                <span className="text-6xl font-black text-white transition-transform duration-300 group-hover:scale-110 tracking-widest">
                  ? ? ?
                </span>
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center md:p-4 max-md:bottom-0 max-md:right-0 max-md:p-0 max-md:m-0 max-md:translate-x-2 max-md:translate-y-2 flex flex-col items-end md:items-center">
                    <span className="text-gray-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1">
                      4th Mini Album
                    </span>
                    <span className="text-white text-2xl font-bold font-serif">
                      MAMIHLAPINATAPA
                    </span>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-300 font-bold uppercase tracking-widest mb-2 drop-shadow-md">
                  Time until comeback
                </p>
                <div className="flex gap-4 text-xl sm:text-2xl font-bold font-serif text-white justify-center drop-shadow-md">
                  <div className="flex flex-col items-center">
                    <span>{timeLeft.days.toString().padStart(2, '0')}</span>
                    <span className="text-xs text-gray-400 uppercase font-sans font-semibold">Days</span>
                  </div>
                  <span>:</span>
                  <div className="flex flex-col items-center">
                    <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-xs text-gray-400 uppercase font-sans font-semibold">Hours</span>
                  </div>
                  <span>:</span>
                  <div className="flex flex-col items-center">
                    <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-xs text-gray-400 uppercase font-sans font-semibold">Mins</span>
                  </div>
                  <span>:</span>
                  <div className="flex flex-col items-center">
                    <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-xs text-gray-400 uppercase font-sans font-semibold">Secs</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* DANH SÁCH ALBUM CŨ */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center mx-auto mt-8">
            {discoLink.map((album, index) => (
              <FadeIn key={index} delay={index * 150 + 200}>
                <a
                  href={album.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[320px] block relative group aspect-square overflow-hidden bg-gray-100 cursor-pointer transition-all duration-300"
                >
                  <img
                    src={album.src}
                    alt={album.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center md:p-4 max-md:bottom-0 max-md:right-0 max-md:p-0 max-md:m-0 max-md:-translate-x-2 max-md:translate-y-2 flex flex-col items-end md:items-center">
                      <span className="text-gray-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1">
                        {album.albumType || 'ILLIT Album'}
                      </span>
                      <span className="text-white text-lg sm:text-xl font-bold font-serif text-right md:text-center">
                        {album.name}
                      </span>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default DiscographySection;
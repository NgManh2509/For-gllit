import React, { useState, useEffect, useRef } from 'react';
import discoLink from '../data/discographyData';

const endTime = new Date('2026-04-30 18:00:00').getTime();

// Component phụ trợ để làm hiệu ứng trượt lên khi cuộn chuột tới
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Ngừng theo dõi sau khi đã hiện hiệu ứng (chỉ chạy 1 lần)
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
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
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
    const timer = setInterval(() => {
      const timeNow = new Date().getTime();
      const distance = endTime - timeNow;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="w-full py-16 flex justify-center bg-transparent overflow-hidden">
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center">
          
          {/* Hiệu ứng trượt lên cho Tiêu đề */}
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold font-noto text-center tracking-widest text-white drop-shadow-md mb-3">
              DISCOGRAPHY
            </h1>
          </FadeIn>

          {/* Hiệu ứng trượt lên cho Album Comeback, delay 200ms để hiện sau tiêu đề 1 nhịp */}
          <FadeIn delay={200}>
            <div className="w-full flex flex-col items-center mb-16">
              <div className="relative group w-64 h-64 sm:w-80 sm:h-80 bg-black aspect-square overflow-hidden flex items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                <span className="text-6xl font-black text-white transition-transform duration-300 group-hover:scale-110 tracking-widest">
                  ? ? ?
                </span>
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center md:p-4 max-md:bottom-0 max-md:right-0 max-md:p-0 max-md:m-0 max-md:translate-x-2 max-md:translate-y-2 flex flex-col items-end md:items-center">
                    <span className="text-gray-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1">
                      ILLIT Album
                    </span>
                    <span className="text-white text-2xl font-bold font-serif">
                      it's ME 
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <p className="text-sm text-gray-300 font-bold uppercase tracking-widest mb-1 drop-shadow-md">
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

          {/* --- DANH SÁCH ALBUM --- */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center mx-auto">
            {discoLink.map((album, index) => (
              // Mỗi album sẽ có độ trễ (delay) tăng dần để tạo hiệu ứng gợn sóng (cascade)
              <FadeIn key={index} delay={index * 150 + 300}>
                <a
                  href={album.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[320px] block relative group aspect-square overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={album.src}
                    alt={album.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center md:p-4 max-md:bottom-0 max-md:right-0 max-md:p-0 max-md:m-0 max-md:-translate-x-2 max-md:translate-y-2 flex flex-col items-end md:items-center">
                      <span className="text-gray-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1">
                        {album.albumType}
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
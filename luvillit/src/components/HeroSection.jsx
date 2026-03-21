import React, { useState, useEffect } from 'react'
import { TextHighlighter } from '../supports/textHighlighter'

const tracks = [
  { num: '01', title: 'MY WORLD',            highlight: false, align: 'left'   },
  { num: '02', title: 'MAGNETIC',            highlight: true,  align: 'center' },
  { num: '03', title: 'MIDNIGHT FICTION',    highlight: true,  align: 'right'  },
  { num: '04', title: 'LUCKY GIRL SYNDROME', highlight: true,  align: 'left'   },
]

const membersLeft  = ['YUNAH', 'MINJU', 'MOKA']
const membersRight = ['WONHEE', 'IROHA']
const PINK = 'linear-gradient(#FF69C0, #FF69C0)'

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile(); 
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <section
      id="hero"
      style={{
        fontFamily: '"Outfit Variable", Outfit, sans-serif',
        marginTop: '100vh',
        borderRadius: '28px 28px 0 0',
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ── Background: Cố định nét ảnh, chỉ đẩy điểm nhìn sang trái ── */}
      <img
        src={`${import.meta.env.BASE_URL}grpPhoto.jpg`}
        alt="ILLIT background"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%', 
          height: '100%',
          objectFit: isMobile ? 'cover' : 'none', 
          objectPosition: isMobile ? 'top center' : '30% 35%', 
          zIndex: 0,
          left: 0, 
          borderRadius: '28px 28px 0 0',
        }}
      />
      
      <div style={{
        position: 'absolute',

        inset: 0,

        zIndex: 1,

        background: `linear-gradient(

          to bottom,

          transparent        0%,

          transparent        15%,

          rgba(0,0,0,0.06)   35%,

          rgba(0,0,0,0.42)   55%,

          rgba(0,0,0,0.74)   75%,

          rgba(0,0,0,0.88)   100%

        )`,

        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        <div style={{ flex: '0 0 50vh' }} />

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '1px 2.5vw',
          lineHeight: 0.5,
        }}>
          <span style={{ fontSize: 'clamp(50px, 12vw, 160px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>ILL</span>

          <div style={{ textAlign: 'center', marginBottom: '3vw', textTransform: 'uppercase' }}>
            <TextHighlighter
              triggerType="inView"
              highlightColor={PINK}
              useInViewOptions={{ once: true, amount: 0.3 }}
              transition={{ type: 'ease', duration: 0.5, delay: 0.1 }}
              rounded="rounded-none"
              style={{
                fontSize: 'clamp(9px, 1.1vw, 14px)',
                fontWeight: 600, letterSpacing: '0.25em', color: '#000000', lineHeight: 1.4, display: 'inline',
              }}
            >
              SUPER REAL ME&nbsp;&nbsp;{'///'}&nbsp;&nbsp;EP
            </TextHighlighter>
          </div>

          <span style={{ fontSize: 'clamp(50px, 12vw, 160px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>IT</span>
        </div>

        <div style={{
          padding: 'clamp(32px, 5vw, 64px) clamp(16px, 5vw, 80px)',
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          
        <div style={{
          // Ở mobile chuyển sang flex dọc, desktop giữ nguyên grid
          display: isMobile ? 'flex' : 'grid',
          flexDirection: isMobile ? 'column' : 'row',
          gridTemplateColumns: isMobile ? 'none' : '1fr 3.5fr 1fr',
          gap: isMobile ? '8vw' : '2vw', // Tăng khoảng cách trên mobile để layout có không gian thở
          alignItems: 'center', 
          width: '100%',
        }}>

          {/* Left Members */}
          <div style={{ 
            display: 'flex', flexDirection: 'column', gap: 4, 
            alignItems: 'flex-start', // Giữ căn trái cho chữ
            alignSelf: isMobile ? 'flex-start' : 'flex-end', // Mobile: trượt lên sát viền trái
            width: '100%',
          }}>
            {membersLeft.map((name, i) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)' }}>
                {i === 1 ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF69C0', flexShrink: 0 }} /> : <span style={{ width: 14 }} />}
                {name}
              </div>
            ))}
          </div>
          {/* Center Tracklist */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%',
            flex: 1, 
            margin: isMobile ? '2vh 0' : '0', 
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1, // Vẫn giữ gap 0 để kiểm soát khoảng cách hoàn toàn bằng customMargins bên dưới
            }}>
              {tracks.map((track, i) => {
                
                const textFontSize = isMobile ? 'clamp(18px, 6.5vw, 40px)' : 'clamp(24px, 4.5vw, 72px)';

                // 1. MẢNG CHỈNH THỤT LỀ TRÁI/PHẢI (Như cũ)
                const customIndents = isMobile 
                  ? ['-0.3em', '1em', '2.8em', '-0.8em'] 
                  : ['-0.3em', '1em', '3.0em', '-0.8em']; 

                // 2. MẢNG CHỈNH KHOẢNG TRỐNG TRÊN/DƯỚI (MỚI)
                // Thứ tự mảng: [Dưới dòng 01, Dưới dòng 02, Dưới dòng 03, Dưới dòng 04]
                const customMargins = isMobile
                  ? ['1px', '3px', '3px', '0px'] // <-- BẠN CHỈNH KHE HỞ MOBILE Ở ĐÂY
                  : ['1px', '1px', '2px', '0px']; 

                const textStyle = {
                  fontSize: textFontSize,
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  lineHeight: 1, 
                  whiteSpace: 'nowrap',
                }

                return (
                  <div key={track.title} style={{
                    display: 'flex', 
                    justifyContent: 'flex-start', 
                    alignItems: 'baseline', 
                    gap: '0.4em', 
                    marginLeft: customIndents[i], 
                    // GỌI KHOẢNG TRỐNG DƯỚI CHO TỪNG DÒNG TẠI ĐÂY:
                    marginBottom: customMargins[i], 
                    fontSize: textFontSize, 
                  }}>
                    <span style={{ 
                      fontSize: 'clamp(10px, 1.5vw, 14px)', 
                      fontWeight: 600, 
                      color: 'rgba(255,255,255,0.45)', 
                      letterSpacing: '0.1em', 
                      flexShrink: 0, 
                      alignSelf: 'flex-start', 
                      marginTop: isMobile ? '0.1em' : '0.4em' 
                    }}>
                      {track.num}
                    </span>

                    {track.highlight ? (
                      <TextHighlighter
                        triggerType="inView" highlightColor={PINK} useInViewOptions={{ once: true, amount: 0.3 }} transition={{ type: 'ease', duration: 0.5, delay: 0.1 + i * 0.1 }} rounded="rounded-none"
                        style={{ ...textStyle, display: 'block' }}
                      >
                        {track.title}
                      </TextHighlighter>
                    ) : (
                      <span style={textStyle}>
                        {track.title}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          {/* Right Members */}
          <div style={{ 
            display: 'flex', flexDirection: 'column', gap: 4, 
            alignItems: 'flex-end', // Giữ căn phải cho chữ
            alignSelf: isMobile ? 'flex-end' : 'flex-end', // Mobile: trượt xuống sát viền phải
            width: '100%',
          }}>
            {membersRight.map((name, i) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)' }}>
                {name}
                {i === 1 ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF69C0', flexShrink: 0 }} /> : <span style={{ width: 14 }} />}
              </div>
            ))}
          </div>

        </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
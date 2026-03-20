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
          rgba(0,0,0,0.10)   35%,
          rgba(0,0,0,0.50)   55%,
          rgba(0,0,0,0.82)   75%,
          rgba(0,0,0,0.96)   100%
        )`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        <div style={{ flex: '0 0 50vh' }} />

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 2.5vw',
          lineHeight: 0.85,
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
            display: 'grid',
            // FIX CHÍ MẠNG 1: Tăng cột giữa lên 3.5fr (rất rộng) để text không bao giờ bị nghẹt
            gridTemplateColumns: '1fr 3.5fr 1fr',
            gap: '2vw',
            alignItems: 'center', 
            width: '100%',
          }}>

            {/* Left Members */}
            <div style={{ 
              display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start', 
              alignSelf: 'flex-end', width: '100%',
            }}>
              {membersLeft.map((name, i) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', fontSize: 'clamp(8px, 1.2vw, 12px)', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)' }}>
                  {i === 1 ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF69C0', flexShrink: 0 }} /> : <span style={{ width: 14 }} />}
                  {name}
                </div>
              ))}
            </div>

            {/* Center Tracklist */}
            <div style={{ 
              display: 'flex', flexDirection: 'column', gap: 0, width: '100%',
            }}>
              {tracks.map((track, i) => {
                const alignMap  = { left: 'flex-start', center: 'center', right: 'flex-end' }
                // Dùng vw để margin so le giữ tỷ lệ chuẩn từ to xuống nhỏ
                const marginMap = { left: '0', center: '2.5vw', right: '5vw' }

                const textStyle = {
                  // FIX CHÍ MẠNG 2: Ép sàn clamp xuống 12px, font max 3.2vw. Đảm bảo 100% vừa vặn.
                  fontSize: 'clamp(12px, 3.2vw, 72px)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  lineHeight: 1,
                  // FIX CHÍ MẠNG 3: Cấm TextHighlighter bẻ dòng gây đè chữ
                  whiteSpace: 'nowrap',
                }

                return (
                  <div key={track.title} style={{
                    display: 'flex', justifyContent: alignMap[track.align], alignItems: 'baseline', gap: '0.6em', 
                    marginLeft: marginMap[track.align],
                  }}>
                    <span style={{ fontSize: 'clamp(10px, 0.85vw, 11px)', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', flexShrink: 0, alignSelf: 'flex-start', marginTop: '0.3em' }}>
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

            {/* Right Members */}
            <div style={{ 
              display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', 
              alignSelf: 'flex-end', width: '100%',
            }}>
              {membersRight.map((name, i) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', fontSize: 'clamp(8px, 1.2vw, 12px)', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)' }}>
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
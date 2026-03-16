import React, { useState, useEffect } from 'react'
import { TextHighlighter } from '../supports/textHighlighter'
import ThreeDCard from '../supports/ThreeDCard'

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
  // --- THÊM STATE ĐỂ KIỂM TRA MÀN HÌNH MOBILE ---
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Kiểm tra ngay khi load trang
    checkIsMobile(); 
    
    // Lắng nghe khi người dùng xoay ngang điện thoại hoặc kéo thu cửa sổ
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
      {/* ── Background: ảnh trải toàn section ── */}
      <img
        src={`${import.meta.env.BASE_URL}grpPhoto.jpg`}
        alt="ILLIT background"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          // ĐỔI OBJECT-FIT DỰA THEO isMobile
          objectFit: isMobile ? 'cover' : 'none',
          objectPosition: 'top center',
          zIndex: 0,
          left: isMobile ? '0' : '-15%', // Mobile thì không cần kéo lệch ảnh nữa
          borderRadius: '28px 28px 0 0',
        }}
      />
      
      {/* ── Gradient overlay: trong suốt ở trên → tối ở dưới ── */}
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

      {/* ── Content layer ── */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Spacer đẩy ILL IT xuống ~55vh */}
        <div style={{ flex: isMobile ? '0 0 45vh' : '0 0 55vh' }} />

        {/* ILL ──── EP ──── IT */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 2.5vw',
          lineHeight: 0.85,
        }}>
          <span style={{
            fontSize: 'clamp(50px, 12vw, 160px)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.03em',
          }}>
            ILL
          </span>

          <div style={{
            textAlign: 'center',
            marginBottom: isMobile ? '4vw' : '2vw',
            fontSize: 'clamp(9px, 1.1vw, 14px)',
            fontWeight: 500,
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.75)',
            textTransform: 'uppercase',
          }}>
            <TextHighlighter
              triggerType="inView"
              highlightColor={PINK}
              useInViewOptions={{ once: true, amount: 0.3 }}
              transition={{ type: 'ease', duration: 0.5, delay: 0.1 }}
              rounded="rounded-none"
              style={{
                fontSize: 'clamp(9px, 1.1vw, 14px)',
                fontWeight: 600,
                letterSpacing: '0.25em',
                color: '#000000',
                lineHeight: 1.4,
                display: 'inline',
              }}
            >
              SUPER REAL ME&nbsp;&nbsp;{'///'}&nbsp;&nbsp;EP
            </TextHighlighter>
          </div>

          <span style={{
            fontSize: 'clamp(50px, 12vw, 160px)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.03em',
          }}>
            IT
          </span>
        </div>

        {/* ── Tracklist ── */}
        {/* ── Tracklist ── */}
        <div style={{
          padding: 'clamp(32px, 5vw, 64px) clamp(24px, 5vw, 80px)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : 'row',
            gridTemplateColumns: isMobile ? 'none' : '0.8fr 2.4fr 0.8fr',
            // Đưa gap về 0 trên mobile để không có khoảng trống giữa các khối
            gap: isMobile ? '0' : '0 2vw',
            alignItems: 'center',
            width: '100%',
          }}>

            {/* Left: member names - Luôn lệch trái */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 4, 
              alignItems: 'flex-start', // Giữ lệch trái trên mobile
              alignSelf: isMobile ? 'flex-start' : 'flex-end', 
              width: '100%',
            }}>
              {membersLeft.map((name, i) => (
                <div key={name} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 'clamp(10px, 1vw, 12px)',
                  fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)',
                }}>
                  {i === 1
                    ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF69C0', flexShrink: 0 }} />
                    : <span style={{ width: 14 }} />
                  }
                  {name}
                </div>
              ))}
            </div>

            {/* Center: tracklist - Luôn so le */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 'clamp(4px, 1vw, 10px)', 
              width: '100%',
              padding: isMobile ? '16px 0' : '0', // Thêm tí đệm xíu trên dưới nều sát quá, bạn có thể chỉnh '0' nếu muốn dính hẳn
            }}>
              {tracks.map((track, i) => {
                // GIỮ NGUYÊN LOGIC LỆCH TRÁI/GIỮA/PHẢI CỦA DESKTOP
                const alignMap  = { left: 'flex-start', center: 'center', right: 'flex-end' }
                const marginMap = { left: '0', center: '5%', right: '10%' }

                return (
                  <div key={track.title} style={{
                    display: 'flex',
                    justifyContent: alignMap[track.align],
                    alignItems: 'baseline',
                    gap: '0.6em',
                    marginLeft: marginMap[track.align],
                  }}>
                    <span style={{
                      fontSize: 'clamp(10px, 0.85vw, 11px)',
                      fontWeight: 600, color: 'rgba(255,255,255,0.45)',
                      letterSpacing: '0.1em', flexShrink: 0,
                      alignSelf: 'flex-start', marginTop: '0.3em',
                    }}>
                      {track.num}
                    </span>

                    {track.highlight ? (
                      <TextHighlighter
                        triggerType="inView"
                        highlightColor={PINK}
                        useInViewOptions={{ once: true, amount: 0.3 }}
                        transition={{ type: 'ease', duration: 0.5, delay: 0.1 + i * 0.1 }}
                        rounded="rounded-none"
                        style={{
                          fontSize: 'clamp(20px, 5vw, 72px)',
                          fontWeight: 900,
                          letterSpacing: '-0.02em',
                          color: '#fff',
                          lineHeight: 1,
                          display: 'block',
                        }}
                      >
                        {track.title}
                      </TextHighlighter>
                    ) : (
                      <span style={{
                        fontSize: 'clamp(20px, 5vw, 72px)',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        color: '#fff',
                        lineHeight: 1,
                      }}>
                        {track.title}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Right: member names - Luôn lệch phải */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 4, 
              alignItems: 'flex-end', // Giữ lệch phải trên mobile
              alignSelf: isMobile ? 'flex-end' : 'flex-end', 
              width: '100%',
            }}>
              {membersRight.map((name, i) => (
                <div key={name} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 'clamp(10px, 1vw, 12px)',
                  fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.65)',
                }}>
                  {name}
                  {i === 1
                    ? <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF69C0', flexShrink: 0 }} />
                    : <span style={{ width: 14 }} />
                  }
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
import React from 'react'
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
        src="/grpPhoto.jpg"
        alt="ILLIT background"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'none',
          objectPosition: 'top center',
          zIndex: 0,
          left: '-15%',
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
        <div style={{ flex: '0 0 55vh' }} />

        {/* ILL ──── EP ──── IT */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 2.5vw',
          lineHeight: 0.85,
        }}>
          <span style={{
            fontSize: 'clamp(72px, 12vw, 160px)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.03em',
          }}>
            ILL
          </span>

          <div style={{
            textAlign: 'center',
            marginBottom: '2vw',
            fontSize: 'clamp(9px, 1.1vw, 14px)',
            fontWeight: 500,
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.75)',
            textTransform: 'uppercase',
          }}>
            SUPER REAL ME&nbsp;&nbsp;{'///'}&nbsp;&nbsp;EP
          </div>

          <span style={{
            fontSize: 'clamp(72px, 12vw, 160px)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.03em',
          }}>
            IT
          </span>
        </div>

        {/* ── Tracklist ── */}
        <div style={{
          padding: 'clamp(32px, 5vw, 64px) clamp(24px, 5vw, 80px)',
          flex: 1,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '0.7fr 2.6fr 0.7fr',
            gap: '0 2vw',
            alignItems: 'center',
          }}>

            {/* Left: member names */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignSelf: 'flex-end', paddingBottom: 8 }}>
              {membersLeft.map((name, i) => (
                <div key={name} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 'clamp(9px, 1vw, 12px)',
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

            {/* Center: tracklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.8vw, 10px)' }}>
              {tracks.map((track, i) => {
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
                      fontSize: 'clamp(8px, 0.85vw, 11px)',
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
                          fontSize: 'clamp(28px, 5vw, 72px)',
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
                        fontSize: 'clamp(28px, 5vw, 72px)',
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

            {/* Right: member names */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end', alignSelf: 'flex-end', paddingBottom: 8 }}>
              {membersRight.map((name, i) => (
                <div key={name} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 'clamp(9px, 1vw, 12px)',
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
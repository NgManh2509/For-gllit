import { useEffect, useRef, useState, useCallback } from 'react'

const BASE = import.meta.env.BASE_URL
const playlist = [
  { src: `${BASE}music/track1.mp3`,  name: 'Not me' },
  { src: `${BASE}music/track2.mp3`,  name: 'Not cute anymore' },
  { src: `${BASE}music/track3.mp3`,  name: 'Tick-Tack' },
  { src: `${BASE}music/track4.mp3`,  name: 'Iykyk' },
  { src: `${BASE}music/track5.mp3`,  name: 'Pimple' },
  { src: `${BASE}music/track6.mp3`,  name: 'oops' },
  { src: `${BASE}music/track7.mp3`,  name: 'jellyous' },
  { src: `${BASE}music/track8.mp3`,  name: 'I’ll Like You' },
  { src: `${BASE}music/track9.mp3`,  name: 'Cherish (My Love)' },
  { src: `${BASE}music/track10.mp3`, name: 'Do the dance' },
  { src: `${BASE}music/track11.mp3`, name: 'little monster' },
  { src: `${BASE}music/track12.mp3`, name: '밤소풍' },
  { src: `${BASE}music/track13.mp3`, name: '만찬가 晩餐歌 - tuki. Covered by MOKA' },
  { src: `${BASE}music/track14.mp3`, name: 'Toki Yo Tomare' },
  { src: `${BASE}music/track15.mp3`, name: 'BIRDS OF A FEATHER ( Minju ft. John Park )' },
  { src: `${BASE}music/track16.mp3`, name: 'Love Love Love ( Minju ft. John Park)' },
  { src: `${BASE}music/track17.mp3`, name: 'Almond Chocolate' },
  { src: `${BASE}music/track18.mp3`, name: 'Lucky Girl Syndrome' },
  { src: `${BASE}music/track19.mp3`, name: 'Magnetic' },
  { src: `${BASE}music/track20.mp3`, name: 'Desperate' },
  { src: `${BASE}music/track21.mp3`, name: 'Karitekita Neko (Do the Dance) (Japanese Ver.)' },
  { src: `${BASE}music/track22.mp3`, name: 'Midnight Fiction' },
  { src: `${BASE}music/track23.mp3`, name: 'My World' },
  { src: `${BASE}music/track24.mp3`, name: 'Topping' },
  { src: `${BASE}music/track25.mp3`, name: 'ILLIT (아일릿) ♡桃色片想い♡ covered by #WONHEE ｜ GLITTER DAY IN JAPAN' },
  { src: `${BASE}music/track26.mp3`, name: 'ILLIT (아일릿) Darling covered by #MOKA ｜ GLITTER DAY IN JAPAN' },
  { src: `${BASE}music/track27.mp3`, name: 'ILLIT (아일릿) GLAMOROUS SKY covered by #MINJU ｜ GLITTER DAY IN JAPAN' },
  { src: `${BASE}music/track28.mp3`, name: 'ILLIT (아일릿) 君はロックを聴かない covered by #YUNAH ｜ GLITTER DAY IN JAPAN' },
  { src: `${BASE}music/track29.mp3`, name: 'Sunday Morning' },
];

// ── SVG Icons ──────────────────────────────────────────────
const IconPrev = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" y1="4" x2="5" y2="20" />
  </svg>
)

const IconNext = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="4" x2="19" y2="20" />
  </svg>
)

const IconPlay = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 4.75C6 4.02 6.82 3.58 7.42 4.01l12 7.25a.75.75 0 0 1 0 1.48l-12 7.25C6.82 20.42 6 19.98 6 19.25V4.75Z"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconPause = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16" rx="1.5" ry="1.5" />
    <rect x="14" y="4" width="4" height="16" rx="1.5" ry="1.5" />
  </svg>
)

const IconMusic = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const IconMinimize = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

const IconMaximize = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
)

const IconGrip = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.5 }}>
    <circle cx="9" cy="5" r="2" />
    <circle cx="15" cy="5" r="2" />
    <circle cx="9" cy="12" r="2" />
    <circle cx="15" cy="12" r="2" />
    <circle cx="9" cy="19" r="2" />
    <circle cx="15" cy="19" r="2" />
  </svg>
)

// ── Main Component ─────────────────────────────────────────
export default function MusicPlayer() {
  const audioRef   = useRef(null)
  const playerRef  = useRef(null)
  const dragState  = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 })
  const progressRef = useRef(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying,    setIsPlaying]    = useState(false)
  const [started,      setStarted]      = useState(false)
  const [progress,     setProgress]     = useState(0)   // 0-100
  const [elapsed,      setElapsed]      = useState('0:00')
  const [duration,     setDuration]     = useState('0:00')
  const [pos,          setPos]          = useState({ x: null, y: null }) // null = not placed yet
  const [isMinimized,  setIsMinimized]  = useState(false) // State cho tính năng thu nhỏ

  // ── Format time ──
  const fmt = (sec) => {
    if (!sec || isNaN(sec)) return '0:00'
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // ── Initial position (bottom-right) after mount ──
  useEffect(() => {
    if (pos.x === null && playerRef.current) {
      const el = playerRef.current
      setPos({
        x: window.innerWidth  - el.offsetWidth  - 24,
        y: window.innerHeight - el.offsetHeight - 24,
      })
    }
  }, [pos.x])

  useEffect(() => {
    const handleResize = () => {
      setPos((prev) => {
        if(prev.x === null || prev.y === null || !playerRef.current) return prev
        const el = playerRef.current
        const PAD = 12

        const maxW = window.innerWidth - el.offsetWidth - PAD
        const maxH = window.innerHeight - el.offsetHeight - PAD

        return {
          x: clamp(prev.x, PAD, maxW),
          y: clamp(prev.y, PAD, maxH),
        }
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ── Clamp helper ──
  const clamp = useCallback((val, min, max) => Math.min(Math.max(val, min), max), [])

  // ── Drag ──
  const onPointerDown = (e) => {
    // Ignore clicks on buttons / progress bar
    if (e.target.closest('button') || e.target.closest('[data-progress]')) return
    e.preventDefault()
    const el = playerRef.current
    dragState.current = {
      dragging: true,
      startX:  e.clientX,
      startY:  e.clientY,
      originX: el.getBoundingClientRect().left,
      originY: el.getBoundingClientRect().top,
    }
    el.style.transition = 'none'
    el.style.cursor     = 'grabbing'
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup',   onPointerUp)
  }

  const onPointerMove = useCallback((e) => {
    if (!dragState.current.dragging) return
    const el  = playerRef.current
    const dx  = e.clientX - dragState.current.startX
    const dy  = e.clientY - dragState.current.startY
    const nx  = clamp(dragState.current.originX + dx, 0, window.innerWidth  - el.offsetWidth)
    const ny  = clamp(dragState.current.originY + dy, 0, window.innerHeight - el.offsetHeight)
    setPos({ x: nx, y: ny })
  }, [clamp])

  const snapToEdge = useCallback(() => {
    const el = playerRef.current
    if (!el) return
    const W       = window.innerWidth
    const H       = window.innerHeight
    const pw      = el.offsetWidth
    const ph      = el.offsetHeight
    const PAD     = 12

    setPos(prev => {
      const { x, y } = prev
      if (x === null || y === null) return prev
      const distLeft   = x
      const distRight  = W - pw - x
      const distTop    = y
      const distBottom = H - ph - y

      const minDist = Math.min(distLeft, distRight, distTop, distBottom)

      if (minDist === distLeft)   return { x: PAD,          y: Math.min(Math.max(y, PAD), H - ph - PAD) }
      if (minDist === distRight)  return { x: W - pw - PAD, y: Math.min(Math.max(y, PAD), H - ph - PAD) }
      if (minDist === distTop)    return { x: Math.min(Math.max(x, PAD), W - pw - PAD), y: PAD }
      /* distBottom */            return { x: Math.min(Math.max(x, PAD), W - pw - PAD), y: H - ph - PAD }
    })

    el.style.transition = 'left 0.3s cubic-bezier(0.25,0.46,0.45,0.94), top 0.3s cubic-bezier(0.25,0.46,0.45,0.94)'
    setTimeout(() => { if (el) el.style.transition = '' }, 350)
  }, [])

  const onPointerUp = useCallback(() => {
    dragState.current.dragging = false
    snapToEdge()
    const el = playerRef.current
    if (el) el.style.cursor = ''
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup',   onPointerUp)
  }, [onPointerMove, snapToEdge])

  // ── Snap to edge when minimized/maximized ──
  const initialMount = useRef(true)
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false
      return
    }
    const timer = setTimeout(() => {
      snapToEdge()
    }, 50)
    return () => clearTimeout(timer)
  }, [isMinimized, snapToEdge])

  // ── Start on first user interaction ──
  useEffect(() => {
    const start = () => {
      if (!started) {
        audioRef.current?.play().catch(() => {})
        setIsPlaying(true)
        setStarted(true)
      }
    }
    window.addEventListener('click', start, { once: true })
    window.addEventListener('touchstart',  start, { once: true })
    window.addEventListener('keydown',     start, { once: true })
    return () => {
      window.removeEventListener('click', start)
      window.removeEventListener('touchstart',  start)
      window.removeEventListener('keydown',     start)
    }
  }, [started])

  // ── Auto play when track changes ──
  useEffect(() => {
    if (!started || !audioRef.current) return
    setProgress(0)
    setElapsed('0:00')
    audioRef.current.load()
    audioRef.current.play().catch(() => {})
    setIsPlaying(true)
  }, [currentIndex, started])

  // ── Audio event listeners ──
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.05

    const onTimeUpdate = () => {
      const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0
      setProgress(pct)
      setElapsed(fmt(audio.currentTime))
    }
    const onLoaded = () => setDuration(fmt(audio.duration))
    const onEnded  = () => setCurrentIndex(i => (i + 1) % playlist.length)

    audio.addEventListener('timeupdate',        onTimeUpdate)
    audio.addEventListener('loadedmetadata',    onLoaded)
    audio.addEventListener('ended',             onEnded)
    return () => {
      audio.removeEventListener('timeupdate',     onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended',          onEnded)
    }
  }, [])

  // ── Global Voice Play/Stop Sync ──
  const isPlayingRef = useRef(isPlaying)
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  const wasPlayingRef = useRef(false)

  useEffect(() => {
    const handleVoicePlay = () => {
      wasPlayingRef.current = isPlayingRef.current
      if (audioRef.current && isPlayingRef.current) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }
    const handleVoiceStop = () => {
      if (audioRef.current && wasPlayingRef.current) {
        audioRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
    }

    window.addEventListener('voicePlay', handleVoicePlay)
    window.addEventListener('voiceStop', handleVoiceStop)
    return () => {
      window.removeEventListener('voicePlay', handleVoicePlay)
      window.removeEventListener('voiceStop', handleVoiceStop)
    }
  }, [])

  // ── Controls ──
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause(); setIsPlaying(false) }
    else           { audio.play().catch(() => {}); setIsPlaying(true) }
  }

  const prevTrack = () => setCurrentIndex(i => (i - 1 + playlist.length) % playlist.length)
  const nextTrack = () => setCurrentIndex(i => (i + 1) % playlist.length)

  const onProgressClick = (e) => {
    const bar   = progressRef.current
    if (!bar || !audioRef.current?.duration) return
    const rect  = bar.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = ratio * audioRef.current.duration
  }

  const trackName = playlist[currentIndex].name

  // Glassmorphism base style dùng chung
  const glassStyle = {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.18)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
    cursor: 'grab',
    color: '#fff',
    fontFamily: '"Inter", system-ui, sans-serif',
    transition: 'width 0.3s ease, padding 0.3s ease, border-radius 0.3s ease',
    overflow: 'hidden'
  }

  return (
    <>
      <audio ref={audioRef} src={playlist[currentIndex].src} preload="metadata" />

      {/* Player widget */}
      <div
        ref={playerRef}
        onPointerDown={onPointerDown}
        style={{
          position:  'fixed',
          left:      pos.x ?? 'auto',
          top:       pos.y ?? 'auto',
          right:     pos.x === null ? 24 : 'auto',
          bottom:    pos.y === null ? 24 : 'auto',
          zIndex:    9999,
          userSelect: 'none',
          touchAction: 'none',
          transition: 'box-shadow 0.2s',
        }}
        className="player-widget"
      >
        {isMinimized ? (
          /* ── MINIMIZED VIEW (Thu nhỏ) ── */
          <div style={{
            ...glassStyle,
            width: 'auto',
            borderRadius: 99,
            padding: '8px 12px 8px 6px', // Giảm padding trái một chút để icon 6 chấm tràn ra
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            {/* ── Biểu tượng 6 chấm để báo hiệu Drag ── */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '4px',
                cursor: 'grab' 
              }}
              title="Kéo để di chuyển"
            >
              <IconGrip />
            </div>

            {/* Phóng to */}
            <button onClick={() => setIsMinimized(false)} style={miniBtnStyle} title="Mở rộng">
              <IconMaximize />
            </button>

            {/* Play / Pause Mini */}
            <button onClick={togglePlay} style={{
              ...btnStyle,
              width: 32, height: 32,
              background: 'rgba(255, 255, 255, 0.2)',
            }}>
              {isPlaying ? <IconPause /> : <IconPlay />}
            </button>

            {/* Next Mini */}
            <button onClick={nextTrack} style={miniBtnStyle} title="Bài tiếp theo">
              <IconNext />
            </button>
          </div>
        ) : (
          /* ── FULL VIEW (Đầy đủ) ── */
          <div style={{
            ...glassStyle,
            width: 260,
            borderRadius: 20,
            padding: '14px 16px 12px',
            position: 'relative'
          }}>
            {/* Nút thu nhỏ góc trên bên phải */}
            <button 
              onClick={() => setIsMinimized(true)} 
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                ...miniBtnStyle
              }}
              title="Thu nhỏ"
            >
              <IconMinimize />
            </button>

            {/* Top row: music note + track name + index */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, paddingRight: 24 }}>
              {/* Animated music icon badge */}
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <IconMusic />
              </div>

              {/* Scrolling track name */}
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  animation: trackName.length > 18 ? 'marquee 8s linear infinite' : 'none',
                  display: 'inline-block',
                }}>
                  {trackName}
                </div>
                <div style={{ fontSize: 10, opacity: 0.55, marginTop: 1 }}>
                  {currentIndex + 1} / {playlist.length} · ILLIT
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div
              ref={progressRef}
              data-progress="true"
              onClick={onProgressClick}
              style={{
                height: 4,
                borderRadius: 99,
                background: 'rgba(255,255,255,0.15)',
                cursor: 'pointer',
                marginBottom: 6,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                height: '100%',
                borderRadius: 99,
                width: `${progress}%`,
                background: '#FFFFFF',
                transition: 'width 0.4s linear',
              }} />
            </div>

            {/* Time */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 9, opacity: 0.5, marginBottom: 12, letterSpacing: '0.3px',
            }}>
              <span>{elapsed}</span>
              <span>{duration}</span>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              {/* Prev */}
              <button onClick={prevTrack} style={btnStyle}>
                <IconPrev />
              </button>

              {/* Play / Pause */}
              <button onClick={togglePlay} style={{
                ...btnStyle,
                width: 44, height: 44,
                background: '#FFFFFF',
                color: '#000000',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)', 
              }}>
                {isPlaying ? <IconPause /> : <IconPlay />}
              </button>

              {/* Next */}
              <button onClick={nextTrack} style={btnStyle}>
                <IconNext />
              </button>
            </div>
          </div>
        )}

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            30%  { transform: translateX(0); }
            70%  { transform: translateX(-60%); }
            100% { transform: translateX(0); }
          }

          .player-widget button:hover {
            transform: scale(1.08);
            background-color: rgba(255,255,255,0.15) !important;
          }
          .player-widget button:active {
            transform: scale(0.93);
          }
        `}</style>
      </div>
    </>
  )
}

// ── Shared styles ──
const btnStyle = {
  width: 36,
  height: 36,
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.08)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.15s ease, background-color 0.15s ease',
  outline: 'none',
}

const miniBtnStyle = {
  ...btnStyle,
  width: 28,
  height: 28,
  borderRadius: 8,
  border: 'none',
  background: 'transparent'
}
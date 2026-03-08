import { useEffect, useRef, useState, useCallback } from 'react'

const playlist = [
  { src: '/music/track1.mp3',  name: 'Not me' },
  { src: '/music/track2.mp3',  name: 'Not cute anymore' },
  { src: '/music/track3.mp3',  name: 'Tick-Tack' },
  { src: '/music/track4.mp3',  name: 'Iykyk' },
  { src: '/music/track5.mp3',  name: 'Pimple' },
  { src: '/music/track6.mp3',  name: 'oops' },
  { src: '/music/track7.mp3',  name: 'jellyous' },
  { src: '/music/track8.mp3',  name: 'I’ll Like You' },
  { src: '/music/track9.mp3',  name: 'Cherish (My Love)' },
  { src: '/music/track10.mp3', name: 'Do the dance' },
  { src: '/music/track11.mp3', name: 'little monster' },
  { src: '/music/track12.mp3', name: '밤소풍' },
]

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

  const onPointerUp = useCallback(() => {
    dragState.current.dragging = false
    const el = playerRef.current
    if (el) {
      el.style.transition = ''
      el.style.cursor     = ''
    }
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup',   onPointerUp)
  }, [onPointerMove])

  // ── Start on first user interaction ──
  useEffect(() => {
    const start = () => {
      if (!started) {
        audioRef.current?.play().catch(() => {})
        setIsPlaying(true)
        setStarted(true)
      }
    }
    window.addEventListener('click',   start, { once: true })
    window.addEventListener('scroll',  start, { once: true })
    window.addEventListener('keydown', start, { once: true })
    return () => {
      window.removeEventListener('click',   start)
      window.removeEventListener('scroll',  start)
      window.removeEventListener('keydown', start)
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

  // ── Controls ──
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) { audio.pause(); setIsPlaying(false) }
    else           { audio.play().catch(() => {}); setIsPlaying(true) }
  }

  const prevTrack = () => setCurrentIndex(i => (i - 1 + playlist.length) % playlist.length)
  const nextTrack = () => setCurrentIndex(i => (i + 1) % playlist.length)

  // ── Seek by clicking progress bar ──
  const onProgressClick = (e) => {
    const bar   = progressRef.current
    if (!bar || !audioRef.current?.duration) return
    const rect  = bar.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = ratio * audioRef.current.duration
  }

  // ── Track display name (scroll if long) ──
  const trackName = playlist[currentIndex].name

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
        {/* Glass card */}
        <div style={{
          width: 260,
          borderRadius: 20,
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
          padding: '14px 16px 12px',
          cursor: 'grab',
          color: '#fff',
          fontFamily: '"Inter", system-ui, sans-serif',
        }}>

          {/* Top row: music note + track name + index */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            {/* Animated music icon badge */}
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg, rgba(255,138,157,0.6), rgba(182,181,216,0.6))',
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
              background: 'linear-gradient(90deg, #FF8A9D, #B6B5D8)',
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
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            {/* Prev */}
            <button onClick={prevTrack} style={btnStyle}>
              <IconPrev />
            </button>

            {/* Play / Pause */}
            <button onClick={togglePlay} style={{
              ...btnStyle,
              width: 44, height: 44,
              background: 'linear-gradient(135deg, rgba(255,138,157,0.55), rgba(182,181,216,0.55))',
              boxShadow: '0 4px 16px rgba(255,138,157,0.3)',
            }}>
              {isPlaying ? <IconPause /> : <IconPlay />}
            </button>

            {/* Next */}
            <button onClick={nextTrack} style={btnStyle}>
              <IconNext />
            </button>
          </div>

        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

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

// ── Shared button style ──
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

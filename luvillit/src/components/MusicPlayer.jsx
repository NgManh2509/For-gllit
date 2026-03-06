import { useEffect, useRef, useState } from 'react'

const playlist = [
  '/music/track1.mp3',
  '/music/track2.mp3',
  '/music/track3.mp3',
  '/music/track4.mp3',
  '/music/track5.mp3',
  '/music/track6.mp3',
  '/music/track7.mp3',
  '/music/track8.mp3',
  '/music/track9.mp3',
  '/music/track10.mp3',
  '/music/track11.mp3',
  '/music/track12.mp3',
]

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)

  // Bắt đầu phát khi người dùng tương tác lần đầu
  useEffect(() => {
    const startOnInteraction = () => {
      if (!started) {
        audioRef.current.play().catch(() => {})
        setStarted(true)
      }
    }

    window.addEventListener('click', startOnInteraction, { once: true })
    window.addEventListener('scroll', startOnInteraction, { once: true })
    window.addEventListener('keydown', startOnInteraction, { once: true })

    return () => {
      window.removeEventListener('click', startOnInteraction)
      window.removeEventListener('scroll', startOnInteraction)
      window.removeEventListener('keydown', startOnInteraction)
    }
  }, [started])

  // Chuyển bài khi hết
  const handleEnded = () => {
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentIndex(nextIndex)
  }

  // Tự phát khi đổi bài (trừ lần đầu chưa tương tác)
  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.load()
      audioRef.current.play().catch(() => {})
    }
    console.log(`🎵 Now playing: Track ${currentIndex + 1} — ${playlist[currentIndex]}`)
  }, [currentIndex])

  return (
    <>
      <audio
        ref={audioRef}
        src={playlist[currentIndex]}
        onEnded={handleEnded}
        volume={0.4}
        muted={muted}
      />

      {/* Nút mute/unmute góc màn hình */}
      {/* <button
        onClick={() => setMuted(!muted)}
        className="fixed bottom-5 right-5 z-50 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg backdrop-blur-sm hover:bg-black/70 transition"
        title={muted ? 'Bật nhạc' : 'Tắt nhạc'}
      >
        {muted ? '🔇' : '🎵'}
      </button> */}
    </>
  )
}

import './index.css'
import { lazy, Suspense, useEffect } from 'react'
import MusicPlayer from './components/MusicPlayer'
import VideoBackGround from './components/VideoBackGround'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import TextReveal from './supports/textReview'
import { motion } from 'framer-motion'
import autoWakeLook from './supports/hooks'
import fanCamData from './data/fanCam'
import FooterSection from './components/FooterSection'
// Lazy-load heavy below-fold sections — chỉ tải khi cần
const MemberSection      = lazy(() => import('./components/MemberSection'))
const AwardSection       = lazy(() => import('./components/AwardSection'))
const DiscographySection = lazy(() => import('./components/DiscographySection'))
const GallerySection     = lazy(() => import('./components/GallerySection'))
const StagesSection      = lazy(() => import('./components/StagesSection'))

const BASE = import.meta.env.BASE_URL
function App() {
  autoWakeLook()
  useEffect(() => {
    fanCamData.forEach(idol => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = idol.img;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <>
      {/* Video Background */}
      <VideoBackGround />

      {/* Navbar */}
      <NavBar />

      {/* Intro Overlay / Disclaimer */}
      <div className="absolute top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center z-10 pointer-events-none">
        
        {/* Lời tuyên bố bản quyền */}
        <TextReveal />

        {/* Scroll down for more */}
        <motion.div 
          className="mt-12 flex flex-col items-center gap-3 pointer-events-auto cursor-pointer select-none"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1.2, ease: "easeOut" }}
          onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.img
            src={`${BASE}/pressStartIcon.svg`}
            alt="Scroll down for more"
            className="w-100 md:w-120 opacity-80 hover:opacity-100 transition-opacity duration-300"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
          <motion.div
            className="text-white/50 mt-1 opacity-80 hover:opacity-100 transition-opacity duration-300"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="40" height="40" style={{ imageRendering: 'pixelated' }}>
              <g shapeRendering="crispEdges">
                <path d="M 5 1 H 11 V 6 H 15 V 8 H 14 V 9 H 13 V 10 H 12 V 11 H 11 V 12 H 10 V 14 H 6 V 12 H 5 V 11 H 4 V 10 H 3 V 9 H 2 V 8 H 1 V 6 H 5 V 1 Z" fill="#FDFAFE"/>
                <path d="M 6 2 H 10 V 7 H 14 V 8 H 13 V 9 H 12 V 10 H 11 V 11 H 10 V 12 H 9 V 13 H 7 V 12 H 6 V 11 H 5 V 10 H 4 V 9 H 3 V 8 H 2 V 7 H 6 V 2 Z" fill="#F38AB9"/>
              </g>
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Sections */}
      <main>
        <HeroSection />
        <section id="about">
          <Suspense fallback={null}>
            <MemberSection />
          </Suspense>
        </section>
        <section id="achievements" className="w-full overflow-x-hidden block">
          <Suspense fallback={null}>
            <AwardSection />
          </Suspense>
        </section>
        <section id="discography" className="w-full overflow-x-hidden block">
          <Suspense fallback={null}>
            <DiscographySection />
          </Suspense>
        </section>
        <section id="gallery" className="w-full h-screen">
          <Suspense fallback={null}>
            <GallerySection />
          </Suspense>
        </section>
        <section id="stages" className="w-full h-screen ">
          <Suspense fallback={null}>
            <StagesSection />
          </Suspense>
        </section>
      </main>
      <FooterSection />

      <MusicPlayer />
    </>
  )
}

export default App

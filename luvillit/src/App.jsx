import './index.css'
import MusicPlayer from './components/MusicPlayer'
import VideoBackGround from './components/VideoBackGround'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import MemberSection from './components/MemberSection'
import AwardSection from './components/AwardSection'
import DiscographySection from './components/DiscographySection'
import GallerySection from './components/GallerySection'
import TextReveal from './supports/textReview'
import { motion } from 'framer-motion'
import autoWakeLook from './supports/hooks'
import StagesSection from './components/StagesSection'


function App() {
  autoWakeLook()
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
          className="mt-12 text-white/50 text-[10px] md:text-xs tracking-[0.3em] uppercase flex flex-col items-center gap-3 font-semibold font-sans"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1.2, ease: "easeOut" }}
        >
          <span>Scroll down for more</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Sections */}
      <main>
        <HeroSection />
        <section id="about">
          <MemberSection />
        </section>
        <div className="h-4 w-full bg-transparent"></div>
        <section id="achievements" className="w-full overflow-x-hidden block">
          <AwardSection />
        </section>
        <div className="h-4 w-full bg-transparent"></div>
        <section id="discography" className="w-full overflow-x-hidden block">
          <DiscographySection />
        </section>
        <div className="h-4 w-full bg-transparent"></div>
        <section id="gallery" className="w-full h-screen">
          <GallerySection />
        </section>
        <section id="stages" className="w-full h-screen ">
          <StagesSection />
        </section>
      </main>

      <MusicPlayer />
    </>
  )
}

export default App

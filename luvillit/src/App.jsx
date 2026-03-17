import './index.css'
import MusicPlayer from './components/MusicPlayer'
import VideoBackGround from './components/VideoBackGround'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import MemberSection from './components/MemberSection'
import AwardSection from './components/AwardSection'
import DiscographySection from './components/DiscographySection'


function App() {
  return (
    <>
      {/* Video Background */}
      <VideoBackGround />

      {/* Navbar */}
      <NavBar />

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
      </main>

      {/* Footer */}
      <MusicPlayer />
    </>
  )
}

export default App

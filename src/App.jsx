import './index.css'
import MusicPlayer from './components/MusicPlayer'
import VideoBackGround from './components/VideoBackGround'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import MemberSection from './components/MemberSection'


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
        <section id="members"></section>
        <section id="achievements" style={{ minHeight: '100vh', background: '#000' }}></section>
      </main>

      {/* Footer */}
      <MusicPlayer />
    </>
  )
}

export default App

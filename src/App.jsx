import './index.css'
import MusicPlayer from './components/MusicPlayer'
import VideoBackGround from './components/VideoBackGround'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      {/* Video Background */}
      <VideoBackGround />

      {/* Navbar */}
      <NavBar />

      {/* Sections */}
      <main>
        <section id="hero"></section>
        <section id="about"></section>
        <section id="members"></section>
        <section id="achievements"></section>
      </main>

      {/* Footer */}
      <MusicPlayer />
    </>
  )
}

export default App

import React, { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CurveTextUp from '@/supports/curveTextUp'
import NoiseCard from '@/supports/NoiseCard'
import MemberFrame from '@/components/MemberFrame'
import members from '@/data/member.js'
import MemberCard from './MemberCard'

const memberFace = [
  `${import.meta.env.BASE_URL}memberSectionImg/irohaFace.png`, 
  `${import.meta.env.BASE_URL}memberSectionImg/minjuFace.png`, 
  `${import.meta.env.BASE_URL}memberSectionImg/mokaFace.png`, 
  `${import.meta.env.BASE_URL}memberSectionImg/wonheeFace.png`, 
  `${import.meta.env.BASE_URL}memberSectionImg/yunahFace.png`
];

const MemberSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const audioRef = useRef(null);

  const handleMemberClick = (stageName) => {
    const foundMember = members.find(m => m.stageName === stageName);
    setSelectedMember(foundMember);
  }

  const handleCloseCard = () =>{
    setSelectedMember(null);
    if(audioRef.current) {
      audioRef.current.pause();
    }
  }

  const handlePlayAudio = (audioPath) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(audioPath);
    audioRef.current.play();
  };

  return (
    <div id="member"
      style={{
        fontFamily: '"Outfit Variable", Outfit, sans-serif',
        position: 'relative', 
        width: '100%',
        overflow: 'hidden', 
        backgroundColor: '#000',
      }}>
        
      <NoiseCard 
        imageUrl={`${import.meta.env.BASE_URL}memberSectionImg/mem.png`}        
        animated={false}       
        noiseOpacity={0.2}    
        width="w-full"         
        height="h-auto"        
      />
      
      <div 
        className="absolute inset-0 top-[75%] z-[1] pointer-events-none opacity-60 md:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, transparent 15%, rgba(0,0,0,0.10) 35%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.82) 75%, rgba(0,0,0,0.96) 100%)`,
        }} 
      />
      
      {/* 1. Iroha: w-241 x-1133 h-217 y-764 */}
      <div 
        className="absolute z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"
        style={{
          left: `${(1133 / 2880) * 100}%`, top: `${(764 / 2160) * 100}%`,
          width: `${(241 / 2880) * 100}%`, height: `${(217 / 2160) * 100}%`
        }}
        onClick={() => handleMemberClick('Iroha')}      
      > 
        <MemberFrame imageUrl={memberFace[0]} name="Iroha" />
      </div>

      {/* 2. Wonhee: w-250 x-468 h-233 y-451 */}
      <div  
        className="absolute z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"
        style={{
          left: `${(468 / 2880) * 100}%`, top: `${(451 / 2160) * 100}%`,
          width: `${(250 / 2880) * 100}%`, height: `${(233 / 2160) * 100}%`
        }}
        onClick={() => handleMemberClick('Wonhee')}      
      > 
        <MemberFrame imageUrl={memberFace[3]} name="Wonhee" />
      </div>

      {/* 3. Minju: w-318 x-550 h-305 y-1055 */}
      <div  
        className="absolute z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"
        style={{
          left: `${(553 / 2880) * 100}%`, top: `${(1055 / 2160) * 100}%`,
          width: `${(318 / 2880) * 100}%`, height: `${(305 / 2160) * 100}%`
        }}
        onClick={() => handleMemberClick('Minju')}      
      > 
        <MemberFrame imageUrl={memberFace[1]} name="Minju" />
      </div>

      {/* 4. Moka: TẠM THỜI DÙNG SỐ CŨ QUY ĐỔI NGƯỢC (Chờ bạn cập nhật) */}
      <div 
          className="absolute z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"
          style={{
            left: `${(1980 / 2880) * 100}%`, top: `${(733 / 2160) * 100}%`,
            width: `${(271 / 2880) * 100}%`, height: `${(282 / 2160) * 100}%`
          }}
          onClick={() => handleMemberClick('Moka')}      
      > 
        <MemberFrame imageUrl={memberFace[2]} name="Moka" />
      </div>

      {/* 5. Yunah: TẠM THỜI DÙNG SỐ CŨ QUY ĐỔI NGƯỢC (Chờ bạn cập nhật) */}
      <div 
        className="absolute z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"
        style={{
          left: `${(1581 / 2880) * 100}%`, top: `${(450 / 2160) * 100}%`,
          width: `${(225 / 2880) * 100}%`, height: `${(216 / 2160) * 100}%`
        }}
        onClick={() => handleMemberClick('Yunah')}      
      > 
        <MemberFrame imageUrl={memberFace[4]} name="Yunah" />
      </div>


      <div className='absolute inset-0 backdrop-blur-none md:backdrop-blur-[1.5px] pointer-events-none' />

      {/* CÁC THÀNH PHẦN TEXT BÊN TRÊN */}
      <div className="absolute top-0 left-0 w-full z-10 transform scale-[0.6] md:scale-100 origin-top transition-transform duration-300">
        <CurveTextUp 
          text="ILLIT" speed={1} curveHeight={50} fontSize={64} color="#ffffff" height={200} gap={0.5} easing={0.05} direction="left" interactive={true} className="text-white"
        />
      </div>

      <div className="absolute top-[5%] md:top-[10%] left-[5%] z-30 text-white/40 text-[clamp(7px,1vw,10px)] uppercase tracking-[0.3em] font-light">
        <p>Belift Lab // New Era</p>
        <p>Est. 2024</p>
      </div>

      <div className="absolute top-[30%] md:top-[40%] left-[2%] z-30 text-white/30 text-[clamp(6px,0.8vw,9px)] uppercase tracking-[0.5em] font-extralight [writing-mode:vertical-lr] rotate-180">
        Super Real Me - Magnetic - Lucky Girl Syndrome
      </div>

      <div className="absolute bottom-[15%] md:bottom-[25%] right-[5%] z-30 text-right text-white/50 text-[clamp(8px,1.2vw,11px)] font-extralight tracking-widest italic">
        <p>"Not cute anymore. Not me"</p>
        <p className="not-italic text-[clamp(6px,0.8vw,8px)] mt-1 md:mt-2 opacity-60">© 2026 ILLIT Official</p>
      </div>

      {/* FOOTER CREDITS */}
      <div className="absolute bottom-[2%] md:bottom-[5%] left-1/2 -translate-x-1/2 z-30 w-[90%] md:w-full max-w-[600px] text-center">
        <div className="flex flex-col gap-1 md:gap-2 items-center">
          <p className="text-[clamp(6px,0.8vw,9px)] font-extralight tracking-[0.6em] text-gray-400 uppercase leading-none">
            Creative Direction by Belift Lab / Visual Identity Program
          </p>
          <p className="text-[clamp(5px,0.7vw,8px)] font-thin tracking-[0.8em] text-gray-500 uppercase leading-none mt-1 md:mt-0">
            ISO 400 // SHUTTER 1/125 // F2.8 // ILLIT_OFFICIAL_ARCHIVE
          </p>
          <p className="text-[clamp(5px,0.6vw,7px)] font-thin tracking-[0.4em] text-gray-600 uppercase mt-1 md:mt-2">
            © 2026 All Rights Reserved. Produced for Super Real Me
          </p>
        </div>
      </div>

      {/* MODAL MÀN HÌNH CHỜ */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              onClick={handleCloseCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-50 flex items-center justify-center pointer-events-none">
              <div className="pointer-events-auto">
                <MemberCard member={selectedMember} onClose={handleCloseCard} onPlayAudio={handlePlayAudio} />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MemberSection
import React from 'react'
import CurveTextUp from '@/supports/curveTextUp'
import NoiseCard from '@/supports/NoiseCard'
import MemberFrame from '@/components/MemberFrame'

const memberFace = ['memberSectionImg/irohaFace.png', 'memberSectionImg/minjuFace.png', 'memberSectionImg/mokaFace.png', 'memberSectionImg/wonheeFace.png', 'memberSectionImg/yunahFace.png']

const MemberSection = () => {
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
        imageUrl="/memberSectionImg/mem.png" 
        animated={false}       
        noiseOpacity={0.2}    
        width="w-full"         
        height="h-auto"        
      />

      <div className="absolute top-[33.2%] left-[68.2%] z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"> 
        <MemberFrame 
          imageUrl={memberFace[2]} 
          name="Moka" 
          width="w-[190px]"   
          height="h-[200px]" 
        />
      </div>
      <div className="absolute top-[20.4%] left-[54.8%] z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"> 
        <MemberFrame 
          imageUrl={memberFace[4]} 
          name="Yunah" 
          width="w-[155px]"   
          height="h-[145px]" 
        />
      </div>
      <div className="absolute top-[35%] left-[39.3%] z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"> 
        <MemberFrame 
          imageUrl={memberFace[0]} 
          name="Iroha" 
          width="w-[160px]"   
          height="h-[150px]" 
        />
      </div>
      <div className="absolute top-[21%] left-[16.2%] z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"> 
        <MemberFrame 
          imageUrl={memberFace[3]} 
          name="Wonhee" 
          width="w-[165px]"   
          height="h-[155px]" 
        />
      </div>
      <div className="absolute top-[48.8%] left-[19.22%] z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"> 
        <MemberFrame 
          imageUrl={memberFace[1]} 
          name="Minju" 
          width="w-[210px]"   
          height="h-[200px]" 
        />
      </div>
      <div className='absolute inset-0 backdrop-blur-[1.5px]' />

      {/* 2. Text đè lên phía trên cùng của ảnh */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 10 
      }}>
        <CurveTextUp 
          text="ILLIT"
          speed={1}
          curveHeight={50}
          fontSize={64}
          color="#ffffff"
          height={200}
          gap={0.5}
          easing={0.05}
          direction="left"
          interactive={true}
          className="text-white"
        />
      </div>
      <div className="absolute top-[10%] left-[5%] z-30 text-white/40 text-[10px] uppercase tracking-[0.3em] font-light">
        <p>Belift Lab // New Era</p>
        <p>Est. 2024</p>
      </div>

      {/* Khối 2: Giữa ảnh, nằm dọc phía trái */}
      <div className="absolute top-[40%] left-[2%] z-30 text-white/30 text-[9px] uppercase tracking-[0.5em] font-extralight [writing-mode:vertical-lr] rotate-180">
        Super Real Me - Magnetic - Lucky Girl Syndrome
      </div>

      {/* Khối 3: Góc phải dưới */}
      <div className="absolute bottom-[25%] right-[5%] z-30 text-right text-white/50 text-[11px] font-extralight tracking-widest italic">
        <p>"Not cute anymore. Not me"</p>
        <p className="not-italic text-[8px] mt-1 opacity-60">© 2026 ILLIT Official</p>
      </div>
      {/* --- CREDIT TEXT Ở CHÍNH GIỮA ĐÁY (Màu Gray) --- */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 z-30 w-full max-w-[600px] text-center">
        <div className="flex flex-col gap-2 items-center">
          
          {/* Dòng 1: Xám vừa (gray-400) */}
          <p className="text-[9px] font-extralight tracking-[0.6em] text-gray-400 uppercase leading-none">
            Creative Direction by Belift Lab / Visual Identity Program
          </p>
          {/* Dòng 3: Xám đậm hơn chút (gray-500) */}
          <p className="text-[8px] font-thin tracking-[0.8em] text-gray-500 uppercase leading-none">
            ISO 400 // SHUTTER 1/125 // F2.8 // ILLIT_OFFICIAL_ARCHIVE
          </p>
          
          {/* Dòng 4: Xám rất mờ (gray-600) */}
          <p className="text-[7px] font-thin tracking-[0.4em] text-gray-600 uppercase mt-2">
            © 2026 All Rights Reserved. Produced for Super Real Me
          </p>
        </div>
      </div>
    </div>
  )
}

export default MemberSection
import React from 'react'
import CurveTextUp from '@/supports/curveTextUp'
import CurveTextDown from '@/supports/curveText'
import NoiseCard from '@/supports/NoiseCard'
import MemberFrame from '@/components/MemberFrame'


const memberFace = ['memberSectionImg/irohaFace.png', 'memberSectionImg/minjuFace.png', 'memberSectionImg/mokaFace.png', 'memberSectionImg/wonheeFace.png', 'memberSectionImg/yunahFace.png']
const MemberSection = () => {
  return (
    <div id="member"
      style={{
        fontFamily: '"Outfit Variable", Outfit, sans-serif',
        position: 'relative', // Gốc để các thành phần absolute căn theo
        width: '100%',
        overflow: 'hidden', // Giữ bo góc cho ảnh
        backgroundColor: '#000',
      }}>
        
      {/* 1. Ảnh đóng vai trò vật chủ: Không dùng absolute nữa */}
      {/* Cách này giúp section tự động cao bằng đúng tấm ảnh của bạn */}
      {/* <img 
        src="/memberSectionImg/mem.png" 
        alt="memberPhoto2"  
        style={{
          display: 'block',
          width: '100%',
          height: 'auto', // Hiển thị full 100% tỉ lệ ảnh, không bị cắt
          zIndex: 0,
        }}  
      /> */}
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
      <div className="absolute top-[48.8%] left-[19.5%] z-20 transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30"> 
        <MemberFrame 
          imageUrl={memberFace[1]} 
          name="Minju" 
          width="w-[210px]"   
          height="h-[200px]" 
        />
      </div>
      <div className='absolute inset-0 bg-gray/60 backdrop-blur-[1.5px]' />

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
    </div>
  )
}

export default MemberSection
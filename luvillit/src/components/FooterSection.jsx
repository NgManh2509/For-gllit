import React from 'react';

const FooterSection = () => {
  // Mảng chứa các kênh để map ra, giúp code React ngắn gọn và dễ bảo trì hơn
  const creditLinks = ['HYBELABELS', 'Dori_YouTube', 'BIMONG', 'ILLIT_official'];

  return (
    <footer className="bg-neutral-950 flex justify-center font-['Lora',serif]" style={{ padding: 'clamp(20px, 3vw, 40px)' }}>
      <div
        className="bg-white w-[95%] max-w-[1200px] rounded-2xl relative flex flex-col md:flex-row justify-between shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
        style={{ padding: 'clamp(20px, 4vw, 48px)', gap: 'clamp(24px, 3vw, 32px)' }}
      >
        
        {/* --- Cột trái: Logo & Thông tin liên hệ --- */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left" style={{ gap: 'clamp(12px, 1.5vw, 24px)' }}>
          <img 
            src="./Illit_logo.svg" 
            alt="ILLIT Logo" 
            className="w-full h-auto" 
            style={{ maxWidth: 'clamp(140px, 18vw, 300px)' }}
          />
          <div className="flex" style={{ gap: 'clamp(10px, 1.2vw, 16px)' }}>
            <a href="https://www.facebook.com/ILLIT.beliftlab/" target="_blank" rel="noopener noreferrer">
              <img 
                src="./facebook-svgrepo-com.svg" 
                alt="Facebook" 
                className="transition-transform duration-300 hover:-translate-y-1" 
                style={{ width: 'clamp(20px, 1.8vw, 28px)', height: 'clamp(20px, 1.8vw, 28px)' }}
              />
            </a>
            <a href="https://www.instagram.com/illit_official/" target="_blank" rel="noopener noreferrer">
              <img 
                src="./instagram-svgrepo-com.svg" 
                alt="Instagram" 
                className="transition-transform duration-300 hover:-translate-y-1" 
                style={{ width: 'clamp(20px, 1.8vw, 28px)', height: 'clamp(20px, 1.8vw, 28px)' }}
              />
            </a>
          </div>
          <a 
            href="mailto:mxnhedit1234@gmail.com" 
            className="text-[#333] font-medium transition-colors duration-300 hover:text-[#fb70c5] whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
            style={{ fontSize: 'clamp(11px, 1.1vw, 18px)' }}
          >
            mxnhedit1234@gmail.com
          </a>
        </div>

        {/* --- Cột phải: Credits và Ảnh Decor --- */}
        <div className="flex-1 flex flex-col-reverse md:flex-row justify-between items-center md:items-start" style={{ gap: 'clamp(16px, 2vw, 32px)' }}>
          
          {/* Cột Credits */}
          <div className="flex flex-col items-center md:items-start z-10 w-full md:w-auto" style={{ gap: 'clamp(8px, 1vw, 16px)', paddingBottom: 'clamp(8px, 1vw, 16px)' }}>
            <h3
              className="font-['Playfair_Display',serif] font-bold tracking-[2px] uppercase text-[#1a1a1a] border-b border-[#eaeaea] w-full md:w-auto text-center md:text-left"
              style={{ fontSize: 'clamp(13px, 1.2vw, 20px)', marginBottom: 'clamp(4px, 0.5vw, 8px)', paddingBottom: 'clamp(4px, 0.5vw, 8px)' }}
            >
              Credits
            </h3>
            <ul className="flex flex-col text-center md:text-left" style={{ gap: 'clamp(6px, 0.7vw, 12px)' }}>
              {creditLinks.map((name) => (
                <li key={name}>
                  <a 
                    href={`https://www.youtube.com/@${name}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#555] transition-colors duration-300 relative group hover:text-black"
                    style={{ fontSize: 'clamp(11px, 1vw, 16px)' }}
                  >
                    {name}
                    <span className="absolute w-0 h-[1px] -bottom-[2px] left-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Ảnh Góc */}
          <div className="flex items-center justify-center static md:absolute md:bottom-[20px] md:right-[20px] z-0">
            <img 
              src="./footPic3.webp" 
              alt="Decoration" 
              className="h-auto rounded-lg pointer-events-none" 
              style={{ width: 'clamp(80px, 9vw, 150px)' }}
            />
          </div>

        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
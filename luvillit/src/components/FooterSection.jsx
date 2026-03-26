import React from 'react';

const FooterSection = () => {
  // Mảng chứa các kênh để map ra, giúp code React ngắn gọn và dễ bảo trì hơn
  const creditLinks = ['HYBELABELS', 'Dori_YouTube', 'BIMONG', 'ILLIT_official'];

  return (
    <footer className="bg-neutral-950 !p-6 md:!p-10 flex justify-center font-['Lora',serif]">
      <div className="bg-white w-[92%] md:w-[95%] max-w-[1200px] rounded-2xl relative flex flex-col md:flex-row justify-between !p-8 md:!p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] gap-12 md:gap-8">
        
        {/* --- Cột trái: Logo & Thông tin liên hệ --- */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <img 
            src="./Illit_logo.svg" 
            alt="ILLIT Logo" 
            className="w-full max-w-[300px] h-auto" 
          />
          <div className="flex gap-4">
            <a href="https://www.facebook.com/ILLIT.beliftlab/" target="_blank" rel="noopener noreferrer">
              <img 
                src="./facebook-svgrepo-com.svg" 
                alt="Facebook" 
                className="w-7 h-7 transition-transform duration-300 hover:-translate-y-1" 
              />
            </a>
            <a href="https://www.instagram.com/illit_official/" target="_blank" rel="noopener noreferrer">
              <img 
                src="./instagram-svgrepo-com.svg" 
                alt="Instagram" 
                className="w-7 h-7 transition-transform duration-300 hover:-translate-y-1" 
              />
            </a>
          </div>
          <a 
            href="mailto:mxnhedit1234@gmail.com" 
            className="text-[#333] text-lg font-medium transition-colors duration-300 hover:text-[#fb70c5]"
          >
            mxnhedit1234@gmail.com
          </a>
        </div>

        {/* --- Cột phải: Credits và Ảnh Decor --- */}
        {/* Dùng md:flex-row để nằm ngang trên PC, flex-col-reverse để ảnh nằm trên text trên Mobile */}
        <div className="flex-1 flex flex-col-reverse md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Cột Credits */}
          <div className="flex flex-col gap-4 items-center md:items-start z-10 w-full md:w-auto pb-4 md:pb-0">
            <h3 className="font-['Playfair_Display',serif] text-xl font-bold tracking-[2px] uppercase text-[#1a1a1a] mb-2 border-b border-[#eaeaea] pb-2">
              Credits
            </h3>
            <ul className="flex flex-col gap-3 text-center md:text-left">
              {creditLinks.map((name) => (
                <li key={name}>
                  <a 
                    href={`https://www.youtube.com/@${name}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#555] text-base transition-colors duration-300 relative group hover:text-black"
                  >
                    {name}
                    {/* Đường gạch chân chạy ra khi hover (dùng group-hover của Tailwind) */}
                    <span className="absolute w-0 h-[1px] -bottom-[2px] left-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Ảnh Góc */}
          <div className="flex items-center justify-center mt-4 md:mt-0 static md:absolute md:bottom-[20px] md:right-[20px] z-0">
            <img 
              src="./footPic3.webp" 
              alt="Decoration" 
              className="w-[150px] md:w-[120px] h-auto rounded-lg pointer-events-none" 
            />
          </div>

        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
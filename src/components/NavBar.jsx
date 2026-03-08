import React from 'react';

const Navbar = () => {
  return (
    <header style={{
      position: 'fixed',
      top: 20,
      left: 20,
      right: 20,
      zIndex: 1000,
    }}>
      <nav className="bg-transparent flex items-center px-10 py-6 font-helvetica text-[12px] uppercase tracking-widest text-white">
        
  
        <div className="flex-1 flex items-center gap-10">
          <a href="#introduct" className="hover:text-gray-300 transition-colors duration-300">
            Introduct
          </a>
          <a href="#members" className="hover:text-gray-300 transition-colors duration-300">
            Members
          </a>
        </div>

        <div className="flex justify-center items-center">
          <img 
            src="/Illit_logo.svg" 
            alt="logo" 
            className="h-6 object-contain" 
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
        <div className="flex-1 flex items-center justify-end gap-10">
          <a href="#achievement" className="hover:text-gray-300 transition-colors duration-300">
            Achievement
          </a>
          <a href="#contact" className="hover:text-gray-300 transition-colors duration-300">
            Contact
          </a>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
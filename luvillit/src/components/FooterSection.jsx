import React from 'react';
import { Youtube, Instagram, Facebook } from 'lucide-react';

const AUTHOR = {
  name: 'ng.manh',
  email: 'mxnhedit1234@gmail.com',
};

const WeverseIcon = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256" 
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M242.1,64.2l-45.6,127.8h-27l-39.6-105l-39.5,105h-27L17.9,64.2h28l28.5,89.5l34.4-89.5h20.4l34.4,89.5l28.5-89.5H242.1z" />
  </svg>
);

const SOCIAL_LINKS = [
  { id: 'youtube', Icon: Youtube, href: 'https://www.youtube.com/@ILLIT_official', label: 'Youtube' },
  { id: 'instagram', Icon: Instagram, href: 'https://www.instagram.com/illit_official/', label: 'Instagram' },
  { id: 'facebook', Icon: Facebook, href: 'https://web.facebook.com/ILLIT.beliftlab', label: 'Facebook' },
  { id: 'weverse', Icon: WeverseIcon, href: 'https://weverse.io/illit/highlight', label: 'Weverse' },
];

const FooterSection = () => {
  return (
    <footer 
      className="w-full bg-[#0a0a0a] backdrop-blur-md text-white py-10 z-50"
      style={{ paddingLeft: '10px', paddingRight: '20px' }}
    >
      
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 transition-all duration-500">
        
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start space-y-2 group">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
            <p className="font-semibold text-lg tracking-wide text-white group-hover:text-pink-400 transition-colors duration-300">
              Author : {AUTHOR.name}
            </p>
          </div>
          <p className="text-white/60 text-sm font-light">
            Contact:{' '}
            <a 
              href={`mailto:${AUTHOR.email}`}
              className="hover:text-pink-400 underline underline-offset-4 decoration-pink-500/30 hover:decoration-pink-500 transition-all duration-300"
            >
              {AUTHOR.email}
            </a>
          </p>
        </div>

        {/* Center: Divider on mobile */}
        <div className="w-16 h-[1px] bg-white/20 block md:hidden" aria-hidden="true"></div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <p className="font-medium text-sm md:text-base uppercase tracking-widest text-white/80 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent text-center md:text-right">
            ILLIT and HYBE label social media
          </p>
          
          <div className="flex items-center gap-4 md:gap-6">
            {SOCIAL_LINKS.map(({ id, Icon, href, label }) => (
              <a 
                key={id}
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/5 shadow-lg shadow-black/20 hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-500/30 hover:scale-110 transition-all duration-300"
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterSection;
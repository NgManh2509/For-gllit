'use client';

import React from 'react';
import { motion } from 'framer-motion';
export default function TextReveal() {
  const textToAnimate = "ILLIT is a 5-member K-pop group (Yunah, Minju, Moka, Wonhee, Iroha) under Belift Lab. Since their 2024 debut, they've become a top 5th-generation act, achieving historic records alongside major media controversies.";
  const words = textToAnimate.match(/[\p{L}\p{N}]+[^\s\p{L}\p{N}]?|[^\s]/gu) || [];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.04 * i
      }
    })
  };
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)"
    }
  };
  return <div className="flex items-center justify-center font-sans p-4">
      <motion.div style={{
      fontSize: 'clamp(5px, 1.5vw, 20px)' /* Chữ tự động thu nhỏ dần khi bề ngang màn hẹp lại */
    }} 
    variants={containerVariants} 
    initial="hidden" 
    animate="visible" 
    
    /* === CHỈNH ĐỘ RỘNG Ở ĐÂY === */
    /* Hãy thay 'max-w-5xl' thành 'max-w-4xl', 'max-w-3xl' hoặc 'max-w-2xl' để bóp chiều rộng lại! */
    className="text-xs sm:text-sm md:text-xl lg:text-2xl font-bold text-left max-w-5xl leading-relaxed flex flex-wrap justify-start gap-x-1.5 gap-y-1 sm:gap-x-2 sm:gap-y-1.5 md:gap-x-3 md:gap-y-2.5 text-white"
    >
        {words.map((word, index) => (
          <React.Fragment key={index}>
            <motion.span variants={childVariants} transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}>
              {word}
            </motion.span>
            {" "}
          </React.Fragment>
        ))}
      </motion.div>
    </div>;
}
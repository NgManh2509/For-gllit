'use client';

import React from 'react';
import { motion } from 'framer-motion';
export default function TextReveal() {
  const textToAnimate = "Created with love by a GLLIT, this website is a strictly non-profit fan project made to celebrate and promote ILLIT. We do not generate any revenue or commercialize their fame in any way. All rights to the music, images, videos, and brand belong exclusively to ILLIT and BELIFT LAB. Please support the girls by streaming their official releases!";
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
      display: "flex",
      flexWrap: "wrap",
      justifyContent: 'center'
    }} variants={containerVariants} initial="hidden" animate="visible" className="text-2xl font-bold text-center max-w-5xl leading-relaxed">
        {words.map((word, index) => <motion.span key={index} variants={childVariants} transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }} style={{
        marginRight: "12px",
        marginTop: "10px"
      }}>
            {word}
          </motion.span>)}
      </motion.div>
    </div>;
}
import React from 'react'

/**
 * IllitLogoAurora — ILLIT logo với gradient aurora động
 * Props:
 *  - height: chiều cao logo (default 36px)
 *  - colors: mảng màu gradient
 *  - speed: tốc độ animation (giây/vòng, nhỏ = nhanh)
 *  - className
 */
const IllitLogoAurora = ({
  height = 36,
  colors = ['#FF8A9D', '#B6B5D8', '#89CFF0', '#FF8A9D'],
  speed = 4,
  className = '',
}) => {
  const gradientId = 'illit-aurora-gradient'
  const width = (height * 126) / 40  // giữ tỉ lệ gốc 126:40

  return (
    <>
      <style>{`
        @keyframes illit-aurora-rotate {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        .illit-aurora-path {
          fill: url(#${gradientId});
        }
      `}</style>

      <svg
        width={width}
        height={height}
        viewBox="0 0 126 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%" y1="0%"
            x2="100%" y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            {colors.map((color, i) => (
              <stop
                key={i}
                offset={`${(i / (colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
            {/* Xoay gradient liên tục quanh tâm logo */}
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              values="0 63 20; 360 63 20"
              dur={`${speed}s`}
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* ILLIT logo paths */}
        <path className="illit-aurora-path" d="M83.4808 0H69.6826V13.3339H83.4808V0Z"/>
        <path className="illit-aurora-path" d="M83.4808 26.666H69.6826V40H83.4808V26.666Z"/>
        <path className="illit-aurora-path" d="M14.4506 26.666H0.652344V40H14.4506V26.666Z"/>
        <path className="illit-aurora-path" d="M14.4506 0H0.652344V13.3339H14.4506V0Z"/>
        <path className="illit-aurora-path" d="M37.4652 0H23.667V40H37.4652V0Z"/>
        <path className="illit-aurora-path" d="M60.4799 0H46.6816V40H60.4799V0Z"/>
        <path className="illit-aurora-path" d="M111.076 13.3339V0H97.2778V13.3339H83.4814V26.6661H97.2778V40H111.076V26.6661H124.872V13.3339H111.076Z"/>
      </svg>
    </>
  )
}

export default IllitLogoAurora

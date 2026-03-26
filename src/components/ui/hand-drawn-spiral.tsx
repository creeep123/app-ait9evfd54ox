import React from 'react';

interface HandDrawnSpiralProps {
  className?: string;
  size?: number;
}

const HandDrawnSpiral: React.FC<HandDrawnSpiralProps> = ({ className = '', size = 240 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'url(#hand-drawn-filter)' }}
    >
      <defs>
        {/* 添加手绘滤镜效果 */}
        <filter id="hand-drawn-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </defs>

      {/* 手绘风格的多层螺旋 */}
      <g stroke="hsl(30, 40%, 45%)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* 外层螺旋 */}
        <path
          d="M 120 120
             C 120 120, 140 100, 160 100
             C 190 100, 200 130, 200 150
             C 200 190, 160 210, 120 210
             C 70 210, 30 170, 30 120
             C 30 60, 80 30, 120 30
             C 160 30, 200 60, 210 100"
          strokeWidth="4.5"
          opacity="0.9"
        />

        {/* 中层螺旋 */}
        <path
          d="M 120 120
             C 120 120, 135 105, 150 105
             C 170 105, 175 125, 175 140
             C 175 170, 150 185, 120 185
             C 85 185, 55 155, 55 120
             C 55 80, 85 50, 120 50
             C 150 50, 180 75, 185 105"
          strokeWidth="3.8"
          opacity="0.8"
        />

        {/* 内层螺旋 */}
        <path
          d="M 120 120
             C 120 120, 130 110, 140 110
             C 155 110, 155 125, 155 135
             C 155 155, 135 165, 120 165
             C 100 165, 80 145, 80 120
             C 80 95, 100 75, 120 75
             C 140 75, 160 90, 162 110"
          strokeWidth="3.2"
          opacity="0.7"
        />

        {/* 核心螺旋 */}
        <path
          d="M 120 120
             C 120 120, 125 115, 130 115
             C 138 115, 138 122, 138 128
             C 138 138, 128 143, 120 143
             C 110 143, 100 133, 100 120
             C 100 107, 110 97, 120 97
             C 132 97, 142 107, 143 115"
          strokeWidth="2.8"
          opacity="0.6"
        />
      </g>
    </svg>
  );
};

export default HandDrawnSpiral;

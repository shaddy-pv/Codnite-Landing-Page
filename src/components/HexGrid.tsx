import React, { useMemo } from 'react';

// Reusable SVG Hex Grid component
export const HexGrid = ({ 
  className = "", 
  hexSize = 30, 
  strokeColor = "rgba(255, 106, 0, 0.2)",
  strokeWidth = 1,
  animated = false 
}) => {
  const width = hexSize * Math.sqrt(3);
  const height = hexSize * 2;
  const yOffset = height * 0.75;

  return (
    <svg className={`w-full h-full ${className}`} width="100%" height="100%">
      <defs>
        <pattern
          id="hex-pattern"
          x="0"
          y="0"
          width={width}
          height={yOffset}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${width/2} 0 L ${width} ${height/4} L ${width} ${height*0.75} L ${width/2} ${height} L 0 ${height*0.75} L 0 ${height/4} Z`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <path
            d={`M 0 ${height*1.5} L ${width/2} ${height*1.25} L ${width} ${height*1.5}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Fill the gaps with translated paths for a continuous grid */}
          <path
            d={`M ${width/2} 0 L ${width} ${height/4} L ${width} ${height*0.75} L ${width/2} ${height} L 0 ${height*0.75} L 0 ${height/4} Z`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            transform={`translate(${width/2}, ${yOffset})`}
          />
           <path
            d={`M ${width/2} 0 L ${width} ${height/4} L ${width} ${height*0.75} L ${width/2} ${height} L 0 ${height*0.75} L 0 ${height/4} Z`}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            transform={`translate(-${width/2}, ${yOffset})`}
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#hex-pattern)" />
    </svg>
  );
};

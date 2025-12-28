
import React from 'react';
import { SnailData, Vector2 } from '../types';

interface SnailProps {
  data: SnailData;
  position: Vector2;
  angle: number;
  isPaused: boolean;
  onClick: (data: SnailData) => void;
}

const Snail: React.FC<SnailProps> = ({ data, position, angle, isPaused, onClick }) => {
  return (
    <div
      className="absolute cursor-pointer select-none transition-transform duration-100 ease-linear"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI)}deg)`,
        zIndex: 10 + data.id,
      }}
      onClick={() => onClick(data)}
    >
      <img
        src={data.image}
        alt={`Snail ${data.id}`}
        onError={(e) => {
          // Fallback if local file is missing
          (e.target as HTMLImageElement).src = 'https://img.icons8.com/color/144/snail.png';
        }}
        className="w-20 h-20 md:w-28 md:h-28 drop-shadow-md pointer-events-none"
        style={{
          animation: isPaused ? 'none' : 'snail-wobble 4s ease-in-out infinite'
        }}
      />
      <style>{`
        @keyframes snail-wobble {
          0%, 100% { transform: scale(1, 1); }
          50% { transform: scale(1.08, 0.92); }
        }
      `}</style>
    </div>
  );
};

export default Snail;

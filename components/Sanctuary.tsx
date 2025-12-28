
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Snail from './Snail.tsx';
import { ASSETS, SNAILS_CONFIG, MOVEMENT_SETTINGS } from '../constants.ts';
import { SnailData, SnailState, Vector2 } from '../types.ts';
import { Volume2, VolumeX } from 'lucide-react';

interface SanctuaryProps {
  activeSnailId: number | null;
  onSnailClick: (data: SnailData) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const Sanctuary: React.FC<SanctuaryProps> = ({ 
  activeSnailId, 
  onSnailClick, 
  isMuted, 
  onToggleMute 
}) => {
  const [snails, setSnails] = useState<SnailState[]>(() => 
    SNAILS_CONFIG.map((cfg) => ({
      id: cfg.id,
      position: { 
        x: Math.random() * window.innerWidth, 
        y: Math.random() * window.innerHeight 
      },
      angle: Math.random() * Math.PI * 2,
      speed: MOVEMENT_SETTINGS.MIN_SPEED + Math.random() * (MOVEMENT_SETTINGS.MAX_SPEED - MOVEMENT_SETTINGS.MIN_SPEED),
      targetAngle: Math.random() * Math.PI * 2,
    }))
  );

  const requestRef = useRef<number | null>(null);
  const lastUpdate = useRef<number>(performance.now());

  const animate = useCallback((time: number) => {
    const deltaTime = time - lastUpdate.current;
    lastUpdate.current = time;

    setSnails((prevSnails) => {
      return prevSnails.map((snail) => {
        if (snail.id === activeSnailId) return snail;

        let { x, y } = snail.position;
        let { angle, targetAngle, speed } = snail;

        if (Math.random() < 0.01) {
          targetAngle += (Math.random() - 0.5) * Math.PI * 0.7;
        }

        prevSnails.forEach((other) => {
          if (snail.id === other.id) return;
          
          const dx = other.position.x - x;
          const dy = other.position.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = MOVEMENT_SETTINGS.SNAIL_RADIUS * 1.5;

          if (distance < minDistance) {
            const angleToOther = Math.atan2(dy, dx);
            targetAngle = angleToOther + Math.PI + (Math.random() - 0.5) * 0.5;
            
            const pushMagnitude = (minDistance - distance) * MOVEMENT_SETTINGS.SEPARATION_FORCE;
            x -= Math.cos(angleToOther) * pushMagnitude;
            y -= Math.sin(angleToOther) * pushMagnitude;
          }
        });

        const pad = MOVEMENT_SETTINGS.BOUNDARY_PADDING;
        if (x < pad || x > window.innerWidth - pad || y < pad || y > window.innerHeight - pad) {
          targetAngle = Math.atan2(window.innerHeight / 2 - y, window.innerWidth / 2 - x);
        }

        const angleDiff = targetAngle - angle;
        const normalizedDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
        angle += normalizedDiff * MOVEMENT_SETTINGS.TURN_SPEED;

        x += Math.cos(angle) * speed;
        y += Math.sin(angle) * speed;

        return {
          ...snail,
          position: { x, y },
          angle,
          targetAngle,
        };
      });
    });

    requestRef.current = requestAnimationFrame(animate);
  }, [activeSnailId]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-emerald-950 select-none">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url('${ASSETS.background}'), url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop')`,
          filter: activeSnailId !== null ? 'brightness(0.4) blur(4px) scale(1.02)' : 'brightness(0.7) blur(0px) scale(1)',
          opacity: 0.8
        }}
      />

      <div className="absolute inset-0 pointer-events-none bg-black/10 mix-blend-overlay" />

      {snails.map((snailState) => {
        const config = SNAILS_CONFIG.find(c => c.id === snailState.id)!;
        return (
          <Snail
            key={snailState.id}
            data={config}
            position={snailState.position}
            angle={snailState.angle}
            isPaused={activeSnailId === snailState.id}
            onClick={onSnailClick}
          />
        );
      })}
      
      <div className="absolute top-10 left-10 z-20 pointer-events-none select-none">
        <h1 className="text-4xl md:text-5xl font-extralight text-white/40 tracking-[0.2em] uppercase">
          The Snail Sanctuary
        </h1>
        <p className="text-white/20 text-xs md:text-sm mt-3 tracking-[0.15em] uppercase italic font-light">
          A haven for the slow and the curious
        </p>
      </div>

      <button 
        onClick={onToggleMute}
        className="absolute bottom-10 left-10 z-30 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white/40 transition-all border border-white/10 backdrop-blur-md group"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} className="group-hover:scale-110 transition-transform" />}
      </button>

      <div className="absolute bottom-10 right-10 z-20 text-white/10 text-[11px] tracking-[0.3em] uppercase font-light hidden sm:block">
        Wandering • Observing • Breathing
      </div>
    </div>
  );
};

export default Sanctuary;

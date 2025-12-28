
import React, { useState, useEffect, useRef } from 'react';
import Sanctuary from './components/Sanctuary.tsx';
import Modal from './components/Modal.tsx';
import { SnailData } from './types.ts';
import { ASSETS } from './constants.ts';

const App: React.FC = () => {
  const [selectedSnail, setSelectedSnail] = useState<SnailData | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(ASSETS.sounds.nature);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    clickAudioRef.current = new Audio(ASSETS.sounds.snailClick);
    clickAudioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.log("Autoplay blocked, waiting for interaction", err);
        setIsMuted(true);
      });
    }
  }, [isMuted]);

  const handleSnailClick = (data: SnailData) => {
    if (!isMuted && clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play();
    }
    setSelectedSnail(data);
  };

  const handleCloseModal = () => {
    setSelectedSnail(null);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full h-full min-h-screen custom-cursor">
      <Sanctuary 
        activeSnailId={selectedSnail ? selectedSnail.id : null}
        onSnailClick={handleSnailClick} 
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />
      
      <Modal 
        isOpen={selectedSnail !== null}
        image={selectedSnail?.cardImage || ''}
        onClose={handleCloseModal}
      />
      
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }
        body {
          background: #022c22;
          overflow: hidden;
        }
        button:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default App;

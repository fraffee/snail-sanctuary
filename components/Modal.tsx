
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  image: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, image, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors z-10"
        >
          <X size={24} />
        </button>
        
        <div className="p-1">
          <img 
            src={image} 
            alt="Snail Art Challenge" 
            className="w-full h-auto object-contain rounded-xl shadow-lg"
          />
        </div>
        
        <div className="p-6 text-center bg-black/10">
          <h2 className="text-2xl font-light text-white tracking-wide">The Artist's Sanctuary</h2>
          <p className="text-white/60 mt-2 text-sm italic">"Time moves slow when beauty blooms."</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;

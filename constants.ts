
import { SnailData } from './types';

export const ASSETS = {
  // These paths look for files in the same folder as your index.html on GitHub
  background: './background.png', 
  snails: [
    './snail_1.png',
    './snail_2.png',
    './snail_3.png',
    './snail_4.png',
    './snail_5.png',
  ],
  cards: [
    './card_1.png',
    './card_2.png',
    './card_3.png',
    './card_4.png',
    './card_5.png',
  ],
  sounds: {
    ambience: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
    nature: 'https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3',
    snailClick: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  }
};

export const SNAILS_CONFIG: SnailData[] = ASSETS.snails.map((url, index) => ({
  id: index,
  image: url,
  cardImage: ASSETS.cards[index]
}));

export const MOVEMENT_SETTINGS = {
  MIN_SPEED: 0.1,
  MAX_SPEED: 0.25,
  TURN_SPEED: 0.008,
  WANDER_STRENGTH: 0.03,
  BOUNDARY_PADDING: 120,
  SNAIL_RADIUS: 80,       // Increased radius slightly for better visual separation
  SEPARATION_FORCE: 0.15, // How firmly they push apart
};

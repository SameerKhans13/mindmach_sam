
export interface ParticleData {
  originalPosition: Float32Array;
  explodedPosition: Float32Array;
  spherePosition: Float32Array;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum Section {
  HERO = 'hero',
  WEARABLE = 'wearable',
  AVATAR = 'avatar'
}

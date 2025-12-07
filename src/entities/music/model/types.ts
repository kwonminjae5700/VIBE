export interface CardData {
  title: string;
  subtitle: string;
  subdesc?: string;
  image?: string;
  overlayText?: string;
  overlayColor?: string;
  isCircle?: boolean;
  bgColor?: string;
  track?: Track;
}

export interface MixCardData {
  title: string;
  type: string;
  gradient?: string;
  image?: string;
  artists: string;
  icon?: string;
  isArtist?: boolean;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number; // seconds
}

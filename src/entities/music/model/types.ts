export interface CardData {
  title: string;
  subtitle: string;
  subdesc?: string;
  image?: string;
  overlayText?: string;
  overlayColor?: string;
  isCircle?: boolean;
  bgColor?: string;
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

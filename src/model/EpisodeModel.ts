/**
 * EpisodeModel.tsx
 * Holds information about an Episode
 */

 interface CardImageSize {
    medium: string;
    original: string;
}

export default interface EpisodeModel {
    id: number;
    name: string;
    number: number;
    season: number; 
    image: CardImageSize;
    summary: string;
}
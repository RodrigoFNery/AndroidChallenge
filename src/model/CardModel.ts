/**
 * CardModel.tsx
 * Holds basic information enough to show the Series Cards
 */

interface CardImageSize {
    medium: string;
    original: string;
}

// export const SHOW_TYPE_SCRIPTED = "SCRIPTED";
// export const SHOW_TYPE_REGULAR = "REGULAR";


export default interface CardModel {
    id: number;
    name: string;
    image: CardImageSize;
}
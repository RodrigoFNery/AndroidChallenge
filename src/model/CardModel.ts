
interface CardImageSize {
    medium: string;
    original: string;
}

export default interface CardModel {
    id: number;
    name: string;
    url: string;
    image: CardImageSize;
}
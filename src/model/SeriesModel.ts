import EpisodeModel from "./EpisodeModel";
import SeasonModel from "./SeasonModel";

interface CardImageSize {
    medium: string;
    original: string;
}

interface Schedule {
    time: string;
    days: string[];
}

export default interface SeriesModel {
    id: number;
    name: string;
    url: string;
    image: CardImageSize;
    schedule: Schedule;
    genres: string[];
    summary: string;
    seasons: SeasonModel[];
}
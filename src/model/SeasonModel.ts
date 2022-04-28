
/**
 * SeasonModel.tsx
 * Holds information about a Season for a specific Serie
 */

import EpisodeModel from "./EpisodeModel";

export default interface SeasonModel {
    number: number;
    serieId: number;
    episodes: EpisodeModel[];
}
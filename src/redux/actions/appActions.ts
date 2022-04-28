//ActionConstants
export enum AppActionConstants {
    SET_SELECTED_SERIE_ID = 'SET_SELECTED_SERIE_ID',
    SET_SELECTED_EPISODE_ID = 'SET_SELECTED_EPISODE_ID',
}

//Interfaces
export interface SetSelectedSerie {
    readonly type: AppActionConstants,
    selectedSerieId: number,
}

export interface SetSelectedEpisode {
    readonly type: AppActionConstants,
    selectedEpisodeId: number,
}


// AppAction definition
export type AppAction = | SetSelectedSerie | SetSelectedEpisode;

//Functions
export function setSelectedSerieId(selectedSerieId: number) {
    return {
        type: AppActionConstants.SET_SELECTED_SERIE_ID,
        selectedSerieId
    };
}

export function setSelectedEpisodeId(selectedEpisodeId: number) {
    return {
        type: AppActionConstants.SET_SELECTED_EPISODE_ID,
        selectedSerieId: selectedEpisodeId
    };
}
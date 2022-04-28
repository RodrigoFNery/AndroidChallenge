/**
 * appActions.ts
 * Holds the app Redux Actions
 */

//ActionConstants
export enum AppActionConstants {
    SET_SELECTED_SERIE_ID = 'SET_SELECTED_SERIE_ID',
    SET_SELECTED_EPISODE_ID = 'SET_SELECTED_EPISODE_ID',
    SET_SELECTED_SEASON_NUMBER = 'SET_SELECTED_SEASON_NUMBER',
    SET_SHOW_SERIE_DETAIL = 'SET_SHOW_SERIE_DETAIL',
    SET_SHOW_EPISODE_DETAIL = 'SET_SHOW_EPISODE_DETAIL',
}

//Interfaces
export interface SetSelectedSerieId {
    readonly type: AppActionConstants,
    selectedSerieId: number,
}

export interface SetSelectedEpisodeId {
    readonly type: AppActionConstants,
    selectedEpisodeId: number,
}

export interface SetSelectedSeasonNumber {
    readonly type: AppActionConstants,
    selectedSeasonNumber: number,
}

export interface SetShowSerieDetail {
    readonly type: AppActionConstants,
    showSerieDetail: boolean,
}

export interface SetShowEpisodeDetail {
    readonly type: AppActionConstants,
    showEpisodeDetail: boolean,
}

// AppAction definition
export type AppAction = | SetSelectedSerieId | SetSelectedEpisodeId | SetSelectedSeasonNumber | SetShowSerieDetail | SetShowEpisodeDetail;

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
        selectedEpisodeId: selectedEpisodeId
    };
}

export function setSelectedSeasonNumber(selectedSeasonNumber: number) {
    return {
        type: AppActionConstants.SET_SELECTED_EPISODE_ID,
        selectedSeasonNumber: selectedSeasonNumber
    };
}

export function setShowSerieDetail(showSerieDetail: boolean) {
    return {
        type: AppActionConstants.SET_SHOW_SERIE_DETAIL,
        showSerieDetail: showSerieDetail
    };
}


export function setShowEpisodeDetail(showEpisodeDetail: boolean) {
    return {
        type: AppActionConstants.SET_SHOW_EPISODE_DETAIL,
        showEpisodeDetail: showEpisodeDetail
    };
}

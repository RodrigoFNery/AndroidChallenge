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

    SET_FAVORITE_SELECTED_SERIE_ID = 'SET_FAVORITE_SELECTED_SERIE_ID',
    SET_FAVORITE_SELECTED_EPISODE_ID = 'SET_FAVORITE_SELECTED_EPISODE_ID',
    SET_FAVORITE_SELECTED_SEASON_NUMBER = 'SET_FAVORITE_SELECTED_SEASON_NUMBER',
    SET_FAVORITE_SHOW_SERIE_DETAIL = 'SET_FAVORITE_SHOW_SERIE_DETAIL',
    SET_FAVORITE_SHOW_EPISODE_DETAIL = 'SET_FAVORITE_SHOW_EPISODE_DETAIL',

    SET_FAVORITE_SERIES_IDS = 'SET_FAVORITE_SERIES_IDS',
}

//Interfaces for All Series screen
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

export interface SetShowSeriesDetail {
    readonly type: AppActionConstants,
    showSeriesDetail: boolean,
}

export interface SetShowEpisodeDetail {
    readonly type: AppActionConstants,
    showEpisodeDetail: boolean,
}

//Interfaces for Favorite screen
export interface SetFavoriteSelectedSerieId {
    readonly type: AppActionConstants,
    favoriteSelectedSerieId: number,
}

export interface SetFavoriteSelectedEpisodeId {
    readonly type: AppActionConstants,
    favoriteSelectedEpisodeId: number,
}

export interface SetFavoriteSelectedSeasonNumber {
    readonly type: AppActionConstants,
    favoriteSelectedSeasonNumber: number,
}

export interface SetFavoriteShowSeriesDetail {
    readonly type: AppActionConstants,
    favoriteShowSeriesDetail: boolean,
}

export interface SetFavoriteShowEpisodeDetail {
    readonly type: AppActionConstants,
    favoriteShowEpisodeDetail: boolean,
}

export interface SetFavoriteSeriesIds {
    readonly type: AppActionConstants,
    favoriteSeriesIds: string[],
}

// AppAction definition
export type AppAction = | SetSelectedSerieId | SetSelectedEpisodeId | SetSelectedSeasonNumber | SetShowSeriesDetail | SetShowEpisodeDetail
    | SetFavoriteSelectedEpisodeId | SetFavoriteSelectedSeasonNumber | SetFavoriteSelectedSerieId | SetFavoriteShowEpisodeDetail | SetFavoriteShowSeriesDetail | SetFavoriteSeriesIds;

//Functions for All Series screen
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

export function setShowSeriesDetail(showSeriesDetail: boolean) {
    return {
        type: AppActionConstants.SET_SHOW_SERIE_DETAIL,
        showSeriesDetail: showSeriesDetail
    };
}


export function setShowEpisodeDetail(showEpisodeDetail: boolean) {
    return {
        type: AppActionConstants.SET_SHOW_EPISODE_DETAIL,
        showEpisodeDetail: showEpisodeDetail
    };
}

//Functions for Favorite screen
export function setFavoriteSelectedSerieId(favoriteSelectedSerieId: number) {
    return {
        type: AppActionConstants.SET_FAVORITE_SELECTED_SERIE_ID,
        favoriteSelectedSerieId: favoriteSelectedSerieId
    };
}

export function setFavoriteSelectedEpisodeId(favoriteSelectedEpisodeId: number) {
    return {
        type: AppActionConstants.SET_FAVORITE_SELECTED_EPISODE_ID,
        favoriteSelectedEpisodeId: favoriteSelectedEpisodeId
    };
}

export function setFavoriteSelectedSeasonNumber(favoriteSelectedSeasonNumber: number) {
    return {
        type: AppActionConstants.SET_FAVORITE_SELECTED_EPISODE_ID,
        favoriteSelectedSeasonNumber:favoriteSelectedSeasonNumber
    };
}

export function setFavoriteShowSeriesDetail(favoriteShowSeriesDetail: boolean) {
    return {
        type: AppActionConstants.SET_FAVORITE_SHOW_SERIE_DETAIL,
        favoriteShowSeriesDetail:favoriteShowSeriesDetail
    };
}


export function setFavoriteShowEpisodeDetail(favoriteShowEpisodeDetail: boolean) {
    return {
        type: AppActionConstants.SET_FAVORITE_SHOW_EPISODE_DETAIL,
        favoriteShowEpisodeDetail: favoriteShowEpisodeDetail
    };
}

export function setFavoriteSeriesIds(favoriteSeriesIds: string[]) {
    return {
        type: AppActionConstants.SET_FAVORITE_SERIES_IDS,
        favoriteSeriesIds: favoriteSeriesIds
    };
}

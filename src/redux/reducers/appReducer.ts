/**
 * appReducers.ts
 * Holds the app Redux Reducers
 */

//Redux
import * as AppActions from "../actions/appActions"

//Interfaces
export interface AppState {
    selectedSerieId: number,
    selectedSeasonNumber: number,
    selectedEpisodeId: number,
    showSeriesDetail: boolean,
    showEpisodeDetail: boolean,

    favoriteSelectedSerieId: number,
    favoriteSelectedSeasonNumber: number,
    favoriteSelectedEpisodeId: number,
    favoriteShowSeriesDetail: boolean,
    favoriteShowEpisodeDetail: boolean,

    favoriteSeriesIds: string[],
}

//INITIAL_STATE definition
const INITIAL_STATE: AppState = {
    selectedSerieId: 0,
    selectedEpisodeId: 0,
    selectedSeasonNumber: 0,
    showSeriesDetail: false,
    showEpisodeDetail: false,

    favoriteSelectedSerieId: 0,
    favoriteSelectedEpisodeId: 0,
    favoriteSelectedSeasonNumber: 0,
    favoriteShowSeriesDetail: false,
    favoriteShowEpisodeDetail: false,

    favoriteSeriesIds: [],
}

const AppReducer = (appState: AppState = INITIAL_STATE, action: AppActions.AppAction) => {
    switch (action.type) {
        //All Series screen
        case AppActions.AppActionConstants.SET_SELECTED_SERIE_ID:
            const selectedSerieId = (action as AppActions.SetSelectedSerieId).selectedSerieId;
            return {
                ...appState,
                selectedSerieId: selectedSerieId
            };
        case AppActions.AppActionConstants.SET_SELECTED_EPISODE_ID:
            const selectedEpisodeId = (action as AppActions.SetSelectedEpisodeId).selectedEpisodeId;
            return {
                ...appState,
                selectedEpisodeId: selectedEpisodeId
            };
        case AppActions.AppActionConstants.SET_SELECTED_SEASON_NUMBER:
            const selectedSeasonNumber = (action as AppActions.SetSelectedSeasonNumber).selectedSeasonNumber;
            return {
                ...appState,
                selectedSeasonNumber: selectedSeasonNumber
            };
        case AppActions.AppActionConstants.SET_SHOW_SERIE_DETAIL:
            const showSeriesDetail = (action as AppActions.SetShowSeriesDetail).showSeriesDetail;
            return {
                ...appState,
                showSeriesDetail: showSeriesDetail
            };
        case AppActions.AppActionConstants.SET_SHOW_EPISODE_DETAIL:
            const showEpisodeDetail = (action as AppActions.SetShowEpisodeDetail).showEpisodeDetail;
            return {
                ...appState,
                showEpisodeDetail: showEpisodeDetail
            };

        //Favorite screen
        case AppActions.AppActionConstants.SET_FAVORITE_SELECTED_SERIE_ID:
            const favoriteSelectedSerieId = (action as AppActions.SetFavoriteSelectedSerieId).favoriteSelectedSerieId;
            return {
                ...appState,
                favoriteSelectedSerieId: favoriteSelectedSerieId
            };
        case AppActions.AppActionConstants.SET_FAVORITE_SELECTED_EPISODE_ID:
            const favoriteSelectedEpisodeId = (action as AppActions.SetFavoriteSelectedEpisodeId).favoriteSelectedEpisodeId;
            return {
                ...appState,
                favoriteSelectedEpisodeId: favoriteSelectedEpisodeId
            };
        case AppActions.AppActionConstants.SET_FAVORITE_SELECTED_SEASON_NUMBER:
            const favoriteSelectedSeasonNumber = (action as AppActions.SetFavoriteSelectedSeasonNumber).favoriteSelectedSeasonNumber;
            return {
                ...appState,
                favoriteSelectedSeasonNumber: favoriteSelectedSeasonNumber
            };
        case AppActions.AppActionConstants.SET_FAVORITE_SHOW_SERIE_DETAIL:
            const favoriteShowSeriesDetail = (action as AppActions.SetFavoriteShowSeriesDetail).favoriteShowSeriesDetail;
            return {
                ...appState,
                favoriteShowSeriesDetail: favoriteShowSeriesDetail
            };
        case AppActions.AppActionConstants.SET_FAVORITE_SHOW_EPISODE_DETAIL:
            const favoriteShowEpisodeDetail = (action as AppActions.SetFavoriteShowEpisodeDetail).favoriteShowEpisodeDetail;
            return {
                ...appState,
                favoriteShowEpisodeDetail: favoriteShowEpisodeDetail
            };
        case AppActions.AppActionConstants.SET_FAVORITE_SERIES_IDS:
            const favoriteSeriesIds = (action as AppActions.SetFavoriteSeriesIds).favoriteSeriesIds;
            return {
                ...appState,
                favoriteSeriesIds: favoriteSeriesIds
            };
        default:
            return appState;
    }
}

export { AppReducer };
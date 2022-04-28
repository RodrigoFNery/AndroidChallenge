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
    showSerieDetail: boolean,
    showEpisodeDetail: boolean,
}

//INITIAL_STATE definition
const INITIAL_STATE: AppState = {
    selectedSerieId: 0,
    selectedEpisodeId: 0,
    selectedSeasonNumber: 0,
    showSerieDetail: false,
    showEpisodeDetail: false,
}

const AppReducer = (appState: AppState = INITIAL_STATE, action: AppActions.AppAction) => {
    switch (action.type) {
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
            const showSerieDetail = (action as AppActions.SetShowSerieDetail).showSerieDetail;
            return {
                ...appState,
                showSerieDetail: showSerieDetail
            };
        case AppActions.AppActionConstants.SET_SHOW_EPISODE_DETAIL:
            const showEpisodeDetail = (action as AppActions.SetShowEpisodeDetail).showEpisodeDetail;
            return {
                ...appState,
                showEpisodeDetail: showEpisodeDetail
            };
        default:
            return appState;
    }
}

export { AppReducer };
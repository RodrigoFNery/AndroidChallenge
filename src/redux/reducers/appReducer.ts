//Redux
import * as AppActions from "../actions/appActions"

//Interfaces
export interface AppState {
    selectedSerieId: number,
    selectedEpisodeId: number,
}

//INITIAL_STATE definition
const INITIAL_STATE: AppState = {
    selectedSerieId: 0,
    selectedEpisodeId: 0,
}

const AppReducer = (appState: AppState = INITIAL_STATE, action: AppActions.AppAction) => {
    switch (action.type) {
        case AppActions.AppActionConstants.SET_SELECTED_SERIE_ID:
            const selectedSerieId = (action as AppActions.SetSelectedSerie).selectedSerieId;
            return {
                ...appState,
                selectedSerieId: selectedSerieId
            };
        case AppActions.AppActionConstants.SET_SELECTED_EPISODE_ID:
            const selectedEpisodeId = (action as AppActions.SetSelectedEpisode).selectedEpisodeId;
            return {
                ...appState,
                selectedEpisodeId: selectedEpisodeId
            };
        default:
            return appState;
    }
}

export { AppReducer };
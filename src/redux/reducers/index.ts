//Redux
import { combineReducers } from '@reduxjs/toolkit';
import { AppReducer } from './appReducer';

const rootReducer = combineReducers({
  AppReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer };

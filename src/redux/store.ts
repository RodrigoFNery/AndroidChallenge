/**
 * store.ts
 * Creates Redux store
 */

//Redux
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';

import { AppReducer } from './reducers/appReducer'; // root reducer
const store = configureStore({
    reducer: AppReducer,
    middleware: [thunk]
});

// TODO Configure rootReducer for when we have more reducers
// import { rootReducer } from './reducers'; // root reducer

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: [thunk]
// });

export {store};


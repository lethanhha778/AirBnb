import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import AuthReducer from "./reducer/AuthReducer";
import { LocationReducer } from './reducer/LocationReducer';

const RootReducer = combineReducers({
    // reducer 
    LocationReducer,
    AuthReducer
})

export const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
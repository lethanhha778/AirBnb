import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import AuthReducer from "./reducer/AuthReducer";
import { BookingReducer } from './reducer/BookingReducer';
import { LocationReducer } from './reducer/LocationReducer';

const RootReducer = combineReducers({
    // reducer 
    LocationReducer,
    AuthReducer,
    BookingReducer,
})

export const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
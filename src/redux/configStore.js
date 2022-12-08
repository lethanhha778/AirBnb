import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import AuthReducer from "./reducer/AuthReducer";
import { BookingReducer } from './reducer/BookingReducer';
import LoadingReducer from './reducer/LoadingReducer';
import { LocationReducer } from './reducer/LocationReducer';
import { RoomReducer } from './reducer/RoomReducer';

import { bookingReducer } from './reducer/BookingReducer';
import { locationReducer } from './reducer/LocationReducer';
import { roomReducer } from './reducer/RoomReducer';
import { userReducer } from "./reducer/UserReducer";

const RootReducer = combineReducers({
    
    // reducer 
    LocationReducer,
    AuthReducer,
    BookingReducer,
    RoomReducer,
    LoadingReducer,

    // reducer admin 
    userReducer, 
    locationReducer,
    roomReducer,
    bookingReducer
})

export const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
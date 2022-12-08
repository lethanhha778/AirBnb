import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { bookingReducer } from './reducer/BooklingReducer';
import { locationReducer } from './reducer/LocationReducer';
import { roomReducer } from './reducer/RoomReducer';
import { userReducer } from "./reducer/UserReducer";

import AuthReducer from "./reducer/AuthReducer";
import { BookingReducer } from './reducer/BookingReducer';
import LoadingReducer from './reducer/LoadingReducer';
import { LocationReducer } from './reducer/LocationReducer';
import { RoomReducer } from './reducer/RoomReducer';

const RootReducer = combineReducers({
<<<<<<< HEAD
    
    // reducer admin 
    userReducer, 
    locationReducer,
    roomReducer,
    bookingReducer
=======
    // reducer 
    LocationReducer,
    AuthReducer,
    BookingReducer,
    RoomReducer,
    LoadingReducer
>>>>>>> main
})

export const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
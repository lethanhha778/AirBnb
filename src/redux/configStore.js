import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import AuthReducer from "./reducer/AuthReducer";
import { BookingReducer } from './reducer/BookingReducer';
import LoadingReducer from './reducer/LoadingReducer';
import { LocationReducer } from './reducer/LocationReducer';
import { RoomReducer } from './reducer/RoomReducer';

import { bookingAdminReducer } from './reducer/BookingReducer';
import { locationAdminReducer } from './reducer/LocationReducer';
import { roomAdminReducer } from './reducer/RoomReducer';
import { userAdminReducer } from "./reducer/UserReducer";
import { commentAdminReducer } from './reducer/CommentReducer';


const RootReducer = combineReducers({
    
    // reducer 
    LocationReducer,
    AuthReducer,
    BookingReducer,
    RoomReducer,
    LoadingReducer,

    // reducer admin 
    userAdminReducer, 
    locationAdminReducer,
    roomAdminReducer,
    bookingAdminReducer,
    commentAdminReducer,
})

export const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
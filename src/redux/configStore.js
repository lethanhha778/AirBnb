import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import AuthReducer from "./reducer/AuthReducer";
import { bookingAdminReducer, BookingReducer } from './reducer/BookingReducer';
import LoadingReducer from './reducer/LoadingReducer';
import { locationAdminReducer, LocationReducer } from './reducer/LocationReducer';
import { roomAdminReducer, RoomReducer } from './reducer/RoomReducer';
import { commentAdminReducer, CommentReducer } from './reducer/CommentReducer';
import { userAdminReducer } from './reducer/UserReducer';

const RootReducer = combineReducers({

    // reducer 
    LocationReducer,
    AuthReducer,
    BookingReducer,
    RoomReducer,
    LoadingReducer,
    CommentReducer,

    // reducer admin 
    userAdminReducer, 
    locationAdminReducer,
    roomAdminReducer,
    bookingAdminReducer,
    commentAdminReducer

})

export const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
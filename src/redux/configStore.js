import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { bookingReducer } from './reducer/BooklingReducer';
import { locationReducer } from './reducer/LocationReducer';
import { roomReducer } from './reducer/RoomReducer';
import { userReducer } from "./reducer/UserReducer";


const RootReducer = combineReducers({
    
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
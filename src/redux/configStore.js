import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import AuthReducer from "./reducer/AuthReducer";
import { BookingReducer } from './reducer/BookingReducer';
import LoadingReducer from './reducer/LoadingReducer';
import { LocationReducer } from './reducer/LocationReducer';
import { RoomReducer } from './reducer/RoomReducer';
import { CommentReducer } from './reducer/CommentReducer';
import { UserReducer } from './reducer/UserReducer';

const RootReducer = combineReducers({
    // reducer 
    LocationReducer,
    AuthReducer,
    BookingReducer,
    RoomReducer,
    LoadingReducer,
    CommentReducer,
    UserReducer,
})

export const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
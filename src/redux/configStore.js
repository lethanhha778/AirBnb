import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import AuthReducer from "./reducer/AuthReducer";

const RootReducer = combineReducers({
    // reducer
    AuthReducer
})

export const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
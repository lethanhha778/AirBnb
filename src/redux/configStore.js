import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { LocationReducer } from './reducer/LocationReducer';


const RootReducer = combineReducers({
    // reducer 
    LocationReducer,
})

export const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
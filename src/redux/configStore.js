import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';


const RootReducer = combineReducers({
    // reducer 
})

export const store = createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
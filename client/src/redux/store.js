import thunk from "redux-thunk";
import {
    AuthReducer
} from "./reducer"
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from "redux"
const rootReducer = combineReducers({
    Auth: AuthReducer
})

export const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))
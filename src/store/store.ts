import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./auth/authReducer";
import projectReducer from "./project/projectReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer
})

const middlewares = applyMiddleware(thunk)
const store = createStore(rootReducer, middlewares)


export default store

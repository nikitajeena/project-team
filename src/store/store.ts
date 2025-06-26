import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import authReducer from "./auth/authReducer";
import projectReducer from "./project/projectReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer
})

const middlewares = applyMiddleware(thunk)
const store = createStore(rootReducer, middlewares)
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, any>;

export default store

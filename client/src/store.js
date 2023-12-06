import { configStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

let store;

try {
    store = configStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
} catch (error) {
    store = configStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
}

export default store;
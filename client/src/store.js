import {applyMiddleware, compose} from "redux";
import { legacy_createStore as createStore} from 'redux'

import {thunk} from 'redux-thunk';

import rootReducer from "./reducers"
const initialState = {};
const middleware = [thunk];

let store;
try {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));
} catch (error) {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));
}

export default store;
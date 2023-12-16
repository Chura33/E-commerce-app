import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productsReducer";
export default combineReducers({
    auth: authReducer,
    products: productReducer
});
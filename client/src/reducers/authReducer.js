import { isEmpty } from "lodash";
import { SET_CURRENT_USER, SUCCESSFUL_REGISTER, ERRORS, FAILURE_REGISTER, AUTH_ERROR } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem("token"),
    user: {},
    errrors: []
}

export default fuction(state = initialState, action); {
    const {paylad}= action
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: true,
                user: payload
            }
        case SUCCESSFUL_REGISTER:
            localStorage.setItem("token", payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated: true
            }
        case FAILURE_REGISTER:
        case AUTH_ERROR:
            localStorage.removeItem("token")
            return{
                ...state,
                token: null,
                isAuthenticated: false
            }
        case ERRORS:
            return{
                ...state,
                errrors: paylad
            }
        default:
                return state
    };
};
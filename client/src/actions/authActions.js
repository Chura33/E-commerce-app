import axios from "axios"
import {getServer} from "../util"
import {
    SET_CURRENT_USER,
    SUCCESSFUL_REGISTER,
    FAILURE_REGISTER,
    ERRORS,
    AUTH_ERROR,
    SUCCESSFUL_LOGIN,
    FAILURE_LOGIN,
    LOGOUT,
} from "./types"
import setAuthToken from "../util/setAuthToken"

// FOR SETTING A USER
export const setCurrentUser = (user)=> async dispatch=>{
    if (localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res =  await (axios.get(`${getServer()}/api/auth`))
        dispatch({
            type: SET_CURRENT_USER,
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
    return {
        type: SET_CURRENT_USER,
        payload: user
}    
}
// FOR REGISTERING A USER
export const register = (userData)=>   async (dispatch) =>{
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    try {
        const res = await axios.post(`${getServer()}/api/user`, userData, config);
        dispatch({
            type:SUCCESSFUL_REGISTER,
            payload: res.data
        });
        dispatch(setCurrentUser());
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors){
            dispatch({
                type:ERRORS,
                payload: errors,
            })
        }

        else{
            dispatch({
                type:FAILURE_REGISTER,
            })
        }
    }
}
// FOR LOGGING IN
export const login = (userData)=>   async (dispatch) =>{
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    try {
        const res = await axios.post(`${getServer()}/api/auth`, userData, config);
        dispatch({
            type:SUCCESSFUL_LOGIN,
            payload: res.data
        });

        dispatch(setCurrentUser());
    } catch (err) {
        const errors = err.response.data.errors;
        // console.log(errors)
        if (errors){
            dispatch({
                type:ERRORS,
                payload: errors,
            })
        } else{
            dispatch({
                type:FAILURE_LOGIN,
            })
        }
    }
}

export const logout = () => (dispatch) => dispatch({ type: LOGOUT });
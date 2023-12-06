import { axios } from "axios";
import { 
    SET_CURRENT_USER, 
    SUCCESSFUL_REGISTER,
    FAILURE_REGISTER,
    ERRORS,
    AUTH_ERROR,
} from "./types";
import {getServer} from "../util"
import {setAuthToken} from "..util/setAuthToken"

//set a user
export const setCurrentUser = (user) => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${getServer}/api/auth`);
        dispatch ({
            type: SET_CURRENT_USER,
            payload: res.data,

        });
    } catch (err) {}
    dispatch({
        type: AUTH_ERROR,
    });
};

//resgitser a user
export const regiser =(userData) => async (dispatch) => {
    const config = {
        headers: {
            "content-type": "application/json"
        }
    }
    try {
        const res = axios.post(`${getServer}/api/users`, userData, config)
        dispatch({
            type: SUCCESSFUL_REGISTER,
            payload: res.data,
        });
    } catch (err) {
        const error = err.response.data.errors;
        if(error) {
            dispatch({
                type: ERRORS,
                payload: error,
            });
        }else {
            dispatch({
                type: FAILURE_REGISTER,
            });
        }
        
    }
};
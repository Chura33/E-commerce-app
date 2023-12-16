import React from "react";
import Login from "../auth/Login";
import { useNavigate, useLocation } from "react-router-dom";

const ParentComponentForLogin = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    console.log("parent component mounted");

    return(
        <Login location = {location} navigate = {navigate}/>
    )
}

export default ParentComponentForLogin;
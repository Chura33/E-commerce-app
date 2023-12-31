import React from "react";
import Register from "../auth/Register";
import { useNavigate, useLocation } from "react-router-dom";

const ParentComponent = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    console.log("parent component mounted");

    return(
        <Register location = {location} navigate = {navigate}/>
    )
}

export default ParentComponent;
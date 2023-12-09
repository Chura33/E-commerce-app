import React from "react";
import { Link } from "react-router-dom"; 

const NavBar = () => {
    return (
        <nav className="navbar bg-main">
            <h1>
                <a href=""><i className="fa fa-store"></i> E-Shop</a>
            </h1>
            <ul>
                <li><a href="">Merchants</a></li>
                <li><a href="">Register</a></li>
                <li><a href="">Login</a></li>
            </ul>
        </nav>
    )
}

export default NavBar;
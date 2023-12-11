import React from "react";
import { Link } from "react-router-dom"; 

const NavBar = () => {
    return (
        <nav className="main-navbar bg-main">
            <h1>
                <Link to=""><i className="fa fa-store"></i>E-Shop</Link>
            </h1>
            <ul>
                <li><Link to="">Merchants</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;
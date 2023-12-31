import React from 'react'
import { Link } from 'react-router-dom'
// import '../../App.css'
const NavBar = () => {
  return (
    <nav class='main-navbar bg-main'>
        <h1>
            <Link to=''>
                <i class='fas fa-store'></i> e-Shop
            </Link>
        </h1>
        <ul>
            <li>
                <Link to='/register?role=merchant'>Merchants</Link>
            </li>
            <li>
                <Link to='/register?role=customer'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>     
    </nav>
  )
}

export default NavBar

import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'

const Navbar = () => {
    return(
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <NavLink class="navbar-brand" to="#">Navbar</NavLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2">
                    <li class="nav-item">
                     <NavLink class="nav-link" to="/">Home</NavLink>
                    </li>
                    <li class="nav-item">
                     <NavLink class="nav-link" to="/about">About</NavLink>
                    </li>
                    <li class="nav-item">
                     <NavLink class="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li class="nav-item">
                     <NavLink class="nav-link" to="/register">Register</NavLink>
                    </li>
                </ul>

                </div>
            </div>
            </nav>
        </div>
    )
}

export default Navbar
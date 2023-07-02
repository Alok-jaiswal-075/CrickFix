import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => {
    return(
    
      
        <nav>
        <ul className="flex">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/newTeam">New Team</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">All Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/allplayers">All Players</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/match/creatematch">New Match</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">TeamDashboard</NavLink>
              </li>
            </ul>
      </nav>
        
    )
}

export default Navbar
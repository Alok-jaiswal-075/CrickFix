import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";


const SideBar = (props) => {
    
    // console.log(visible)
    let isVisible = "bg-col-bg-dark w-full block sm:hidden child:bg-transparent h-screen h-[100svh] z-1 float-left absolute ease duration-300 top-0"
    let isNotVisible = "bg-col-bg-dark w-full block sm:hidden child:bg-transparent h-screen h-[100svh] z-1 float-left absolute ease duration-300 top-0 -left-[100%]"
    
    let classList = props.visible ? isVisible : isNotVisible;

    return (
        <div id="sidebar" className={classList}>
            <ul className="flex flex-col items-center justify-center child:bg-inherit h-full">
				<li className="nav-item my-4">
					<NavLink className="nav-link text-lg bg-transparent text-col-link-inactive" to="/">Home</NavLink>
				</li>
				<li className="nav-item my-4">
					<NavLink className="nav-link text-lg bg-transparent text-col-link-inactive" to="/about">About</NavLink>
				</li>
				<li className="nav-item my-4">
					<NavLink className="nav-link text-lg bg-transparent text-col-link-inactive" to="/newTeam">New Team</NavLink>
				</li>
				<li className="nav-item my-4">
					<NavLink className="nav-link text-lg bg-transparent text-col-link-inactive" to="/teams">All Teams</NavLink>
				</li>
				<li className="nav-item my-4">
					<NavLink className="nav-link text-lg bg-transparent text-col-link-inactive" to="/allplayers">All Players</NavLink>
				</li>
				<li className="nav-item my-4">
					<NavLink className="nav-link text-lg bg-transparent text-col-link-inactive" to="/match/creatematch">New Match</NavLink>
				</li>
				<li className="nav-item my-4">
					<NavLink className="nav-link text-lg bg-transparent text-col-link-inactive" to="/login">Login</NavLink>
				</li>
				<li className="nav-item my-4">
					<NavLink className="nav-link text-lg bg-transparent text-col-link-inactive" to="/register">Register</NavLink>
				</li>
				<li className="nav-item my-4">
					<NavLink className="nav-link text-lg bg-transparent text-col-link-inactive" to="/dashboard">TeamDashboard</NavLink>
				</li>
            </ul>
        </div>
    )
}

export default SideBar
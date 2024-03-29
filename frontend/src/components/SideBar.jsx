import React from "react";
import { NavLink } from "react-router-dom";


const SideBar = (props) => {

	// const closeSideBar = ()=>{
	// 	props.setIsOpen(false)

	// }

	// console.log(visible)
	const isVisible = "bg-col-bg-dark w-full block sm:hidden child:bg-transparent h-screen h-[100svh] z-40 float-left absolute ease duration-300 top-0"
	const isNotVisible = "bg-col-bg-dark w-full block sm:hidden child:bg-transparent h-screen h-[100svh] z-40 float-left absolute ease duration-300 top-0 -translate-x-full"

	let sideClassList = props.visible ? isVisible : isNotVisible;

	const inactive = 'text-lg bg-transparent text-col-link-inactive'
	const active = 'text-lg bg-transparent text-col-btn'

	const returnLinkCode = (link, key) => {
		if (link.linkName === 'Login' && props.isLoggedIn) {
			return
		}
		else {
			return (
				<>
					{/* <li className="nav-item bg-transparent">
						<NavLink index={index} to={link.link} content={link.linkName} isActive={pathname === link.link ? true : false} ></NavLink>
					</li> */}
					<li className="nav-item my-4">
						<NavLink onClick={() => { props.setIsOpen(false) }} id={key} className={props.currentPath === link.link ? active : inactive} to={link.link}>{link.linkName}</NavLink>
					</li>
				</>
			)
		}
	}

	return (
		<div id="sidebar" className={sideClassList}>
			<ul className="flex flex-col items-center justify-center child:bg-inherit h-full">
				{/* <li className="nav-item my-4">
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
				</li> */}
				{
					<>
						{
							props.linkList.map((link, key) => (
								returnLinkCode(link, key)
								// <li className="nav-item my-4">
								// 	<NavLink onClick={() => { props.setIsOpen(false) }} id={key} className={props.currentPath === link.link ? active : inactive} to={link.link}>{link.linkName}</NavLink>
								// </li>
							))
						}
						{
							props.isLoggedIn ?
								<button onClick={props.handleLogout} className="text-col-link-inactive hover:text-col-text ease duration-200 bg-transparent mx-2 text-lg">Logout</button>
								:
								<></>
						}
					</>
				}
			</ul>
		</div>
	)
}

export default SideBar
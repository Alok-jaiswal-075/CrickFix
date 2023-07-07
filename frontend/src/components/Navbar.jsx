import React, { useState } from "react";
import NavBarLink from "./Utility/NavBarLink";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

// DIFFERENT ANIMATIONS FOR HAMBURGER ICON :
// import { Divide as Hamburger } from 'hamburger-react'
// import { Squash as Hamburger } from 'hamburger-react'
import { Sling as Hamburger } from 'hamburger-react'

const Navbar = () => {
	// state for hiding and revealing sidebar
	const [isOpen, setIsOpen] = useState(false)

	// array containing link objects
	const linkList = [
		{
			link: '/',
			linkName: 'Home'
		},
		{
			link: '/about',
			linkName: 'About'
		},
		{
			link: '/newTeam',
			linkName: 'New Team'
		},
		{
			link: '/teams',
			linkName: 'Teams'
		},
		{
			link: '/allplayers',
			linkName: 'All Players'
		},
		{
			link: '/match/creatematch',
			linkName: 'New Match'
		},
		{
			link: '/login',
			linkName: 'Login'
		},
		{
			link: '/dashboard',
			linkName: 'Team Dashboard'
		},
	]

	// getting current path for highlighting navbar and sidebar links
	const {pathname} = useLocation()
	console.log(pathname)

	return (
		<div className="ease duration-500 sticky top-0">
			<nav className="sticky top-0 flex items-center justify-between p-2 px-4 bg-col-bg-dark drop-shadow-lg z-50">
				<NavBarLink to="/" content={<img className="w-[70%] sm:w-[40%] lg:w-[70%] bg-inherit" src="./img/logo.png" alt="LOGO" />}></NavBarLink>

				<ul className="hidden sm:flex items-center justify-between bg-inherit w-[70%]">
					{
						linkList.map((link, index) =>
						<li className="nav-item bg-transparent">
							<NavBarLink index={index} to={link.link} content={link.linkName} isActive={pathname === link.link ? true:false} ></NavBarLink>
						</li>
					)
					}
				</ul>

				<span className="inline-block sm:hidden"><Hamburger className="inline-block sm:hidden" toggled={isOpen} rounded onToggle={
					toggled => {
						if (toggled) {
							setIsOpen(true)
						} else {
							setIsOpen(false)
						}
					}
				} /></span>
			</nav>
			<SideBar currentPath={pathname} visible={isOpen} linkList={linkList} setIsOpen={setIsOpen}/>
		</div>
	)
}

export default Navbar
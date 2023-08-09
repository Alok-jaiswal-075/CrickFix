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
			linkName: 'Player Dashboard'
		},
		// {
		// 	link: '/newTeam',
		// 	linkName: 'New Team'
		// },
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
		}
	]

	// getting current path for highlighting navbar and sidebar links
	const {pathname} = useLocation()

	return (
		<div className="ease duration-500 sticky top-0 z-50">
			<nav className="sticky top-0 flex items-center justify-between p-2 px-4 bg-col-bg-dark drop-shadow-lg z-50">
				<NavBarLink to="/" content={<img className="w-[40%] sm:w-[35%] lg:w-[45%] bg-inherit" src="./img/logo-2.png" alt="LOGO" />}></NavBarLink>

				<ul className="hidden md:flex items-center justify-end gap-6 bg-inherit w-fit">
					{
						linkList.map((link, index) =>
						<li className="nav-item bg-transparent">
							<NavBarLink index={index} to={link.link} content={link.linkName} isActive={pathname === link.link ? true:false} ></NavBarLink>
						</li>
					)
					}
				</ul>

				<span className="inline-block md:hidden"><Hamburger className="inline-block sm:hidden" toggled={isOpen} rounded onToggle={
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
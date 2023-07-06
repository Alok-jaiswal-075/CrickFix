import React, { useState } from "react";
// import { Divide as Hamburger } from 'hamburger-react'
// import { Squash as Hamburger } from 'hamburger-react'
import { Sling as Hamburger } from 'hamburger-react'
import NavBarLink from "./Utility/NavBarLink";
import SideBar from "./SideBar";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)

	const linkList = [
		{
			id : 0,
			link: '/',
			linkName: 'Home'
		},
		{
			id : 1,
			link: '/about',
			linkName: 'About'
		},
		{
			id : 2,
			link: '/newTeam',
			linkName: 'New Team'
		},
		{
			id : 3,
			link: '/teams',
			linkName: 'Teams'
		},
		{
			id : 4,
			link: '/allplayers',
			linkName: 'All Players'
		},
		{
			id : 5,
			link: '/match/creatematch',
			linkName: 'New Match'
		},
		{
			id : 6,
			link: '/login',
			linkName: 'Login'
		},
		{
			id : 7,
			link: '/register',
			linkName: 'Register'
		},
		{
			id : 8,
			link: '/dashboard',
			linkName: 'Team Dashboard'
		},
	]

	const renderLinks = linkList.map((link, index) =>
		<li className="nav-item bg-transparent">
			<NavBarLink index={index} to={link.link} content={link.linkName} isActive={false} ></NavBarLink>
		</li>
	);

	return (
		<div className="ease duration-500">
			<nav className="sticky top-0 flex items-center justify-between p-2 bg-col-bg-dark drop-shadow-lg z-10">
				<NavBarLink to="/" content={<img className="w-[70%] bg-inherit" src="./img/logo.png" alt="LOGO" />}></NavBarLink>

				<ul className="hidden sm:flex bg-inherit">
					{renderLinks}
				</ul>

				<span className="inline-block sm:hidden"><Hamburger className="inline-block sm:hidden" rounded onToggle={
					toggled => {
						if (toggled) {
							setIsOpen(true)
						 } else {
							setIsOpen(false)
						 }
					}
				} /></span>
			</nav>
			<SideBar visible={isOpen} linkList={linkList} setIsOpen={setIsOpen}/>
		</div>
	)
}

export default Navbar
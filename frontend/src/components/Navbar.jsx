import React, { useState } from "react";
// import { Divide as Hamburger } from 'hamburger-react'
// import { Squash as Hamburger } from 'hamburger-react'
import { Sling as Hamburger } from 'hamburger-react'
import NavBarLink from "./Utility/NavBarLink";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)

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

	// const handleNavbarLinkClick = (id)=>{
	// 	const renderLinks = linkList.map((link, index) =>
	// 	<li className="nav-item bg-transparent">
	// 		<NavBarLink index={index} to={link.link} content={link.linkName} isActive={false} clickHandler={handleNavbarLinkClick} ></NavBarLink>
	// 	</li>
	// );
	// }

	const {pathname} = useLocation()
	console.log(pathname)

	const renderLinks = linkList.map((link, index) =>
		<li className="nav-item bg-transparent">
			<NavBarLink index={index} to={link.link} content={link.linkName} isActive={pathname == link.link ? true:false} ></NavBarLink>
		</li>
	);

	return (
		<div className="ease duration-500 sticky top-0">
			<nav className="sticky top-0 flex items-center justify-between p-2 px-4 bg-col-bg-dark drop-shadow-lg z-10">
				<NavBarLink to="/" content={<img className="w-[70%] sm:w-[40%] lg:w-[70%] bg-inherit border" src="./img/logo.png" alt="LOGO" />}></NavBarLink>

				<ul className="hidden sm:flex items-center justify-between bg-inherit w-[70%] border">
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
			<SideBar currentPath={pathname} visible={isOpen} linkList={linkList} setIsOpen={setIsOpen}/>
		</div>
	)
}

export default Navbar
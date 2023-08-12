import React, { useState } from "react";
import NavBarLink from "./Utility/NavBarLink";
import SideBar from "./SideBar";
import { useLocation, useNavigate } from "react-router-dom";

// DIFFERENT ANIMATIONS FOR HAMBURGER ICON :
// import { Divide as Hamburger } from 'hamburger-react'
// import { Squash as Hamburger } from 'hamburger-react'
import { Sling as Hamburger } from 'hamburger-react'

const Navbar = (props) => {
	// state for hiding and revealing sidebar
	const [isOpen, setIsOpen] = useState(false)
	// const [isLoggedIn, setIsLoggedIn] = useState(false)
	const navigate = useNavigate()

	const checkLoggedIn = async () => {
		try {
			const res = await fetch('api/players/isloggedin', {
				method: "GET",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				credentials: "include"
			})
			const data = await res.json();
			props.setIsLoggedIn(data.isLoggedIn);
			console.log(props.isLoggedIn)
		}
		catch (err) {
			// window.location.reload();
		}
	}

	if (!props.isLoggedIn) {
		checkLoggedIn();
	}
	// console.log(isLoggedIn)

	const handleLogout = async () => {
		let opt = window.confirm(`Are you sure you want to logout?`)
		if (opt) {
		try {
			const res = await fetch('/api/players/logout', {
				method: "POST",
				headers: {
				},
				credentials: "include"
			})

			const data = await res.json();
			if (data) {
				window.alert(data.msg)
				props.setIsLoggedIn(false)
				navigate('/')
			}

		} catch (error) {
			window.alert(error.msg)
			// window.alert('sahi se code likh bsdk')
		}
		}
	}


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

	const returnLinkCode = (link, index) => {
		if (link.linkName === 'Login' && props.isLoggedIn) {
			return
		}
		else {
			return (
				<>
					<li className="nav-item bg-transparent">
						<NavBarLink index={index} to={link.link} content={link.linkName} isActive={pathname === link.link ? true : false} ></NavBarLink>
					</li>
				</>
			)
		}
	}

	// getting current path for highlighting navbar and sidebar links
	const { pathname } = useLocation()

	return (
		<div className="ease duration-500 sticky top-0 z-50">
			<nav className="sticky top-0 flex items-center justify-between p-2 px-4 bg-col-bg-dark drop-shadow-lg z-50">
				<NavBarLink to="/" content={<img className="w-[40%] sm:w-[35%] lg:w-[45%] bg-inherit" src="./img/logo-4.png" alt="LOGO" />}></NavBarLink>

				<ul className="hidden md:flex items-center justify-end gap-6 bg-inherit w-fit">
					{
						<>
							{linkList.map((link, index) => (returnLinkCode(link, index)


								// <li className="nav-item bg-transparent">
								// 	<NavBarLink index={index} to={link.link} content={link.linkName} isActive={pathname === link.link ? true : false} ></NavBarLink>
								// </li>
							)
							)}

							{
								props.isLoggedIn ? 
								<button onClick={handleLogout} className="text-col-link-inactive hover:text-col-text ease duration-200 bg-transparent mx-2 text-base">Logout</button>
								:
								<></>
							}
						</>
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
			<SideBar currentPath={pathname} visible={isOpen} linkList={linkList} setIsOpen={setIsOpen} />
		</div>
	)
}

export default Navbar
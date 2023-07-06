// import React, {useState} from 'react'
import { Link, NavLink } from "react-router-dom";


function NavBarLink(props) {
  let inactiveClassList = "nav-link text-col-link-inactive hover:text-col-text ease duration-200 bg-transparent mx-2 text-base"
  let activeClassList = "nav-link text-white bg-transparent mx-2 text-base"

  let classList = props.isActive ? activeClassList : inactiveClassList;

  return (
    <NavLink className={classList} to={props.to}>{props.content}</NavLink>
  )
}

export default NavBarLink
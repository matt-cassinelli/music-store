import './Navbar.css';
import React from "react";
import { NavLink, Link } from 'react-router-dom';
import logo from './logo.svg';
import MenuButton from './MenuButton';
import ThemeButton from './ThemeButton';
import BasketButton from './BasketButton';

export default function Navbar() {

    return (
        <header>
            <div className='header-left-side'>
                <Link to="/">
                    <img className="logo" src={logo} alt="Home"/>
                </Link>
            </div>
            <ul className="nav-links hide-under-width-breakpoint">
                <li key={1}> <NavLink to='/sounds'> Sounds </NavLink> </li>
                <li key={2}> <NavLink to='/services'> Services </NavLink> </li>
                <li key={3}> <NavLink to='/contact'> Contact </NavLink> </li>
            </ul>
            <div className='header-right-side'>
                <ThemeButton className="hide-under-width-breakpoint"/>
                <BasketButton className="hide-under-width-breakpoint"/>
                <MenuButton/>
            </div>
        </header>
    )
}
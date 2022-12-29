import './Navbar.css';
import React from "react";
import { Link } from 'react-router-dom';
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
            
            <ul className="nav-links hide-under-max-width">
                <li key={1}> <Link to='/sounds'> Sounds </Link> </li>
                <li key={2}> <Link to='/services'> Services </Link> </li>
                <li key={3}> <Link to='/contact'> Contact </Link> </li>
            </ul>

            <div className='header-right-side'>
                <ThemeButton />
                <BasketButton className="hide-under-max-width"/>
                <MenuButton/>
            </div>

        </header>
    )
}
import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
//import CartButton from './CartButton';
import logo from '../logo.svg';
// import menu from '../assets/img-app/menu.svg';
import { ReactComponent as MenuIcon } from './menu.svg';
import ThemeButton from './ThemeButton';
import BasketButton from './BasketButton';


export default function Navbar() {
    return (
        <header>

            <div className='header-side'>
                <Link to="/"> <img id="logo" src={logo} alt="Home"/> </Link>
            </div>
            
            <ul className="nav-links">
                <li key={1}> <Link to='/sounds'> Sounds </Link> </li>
                <li key={2}> <Link to='/services'> Services </Link> </li>
                <li key={3}> <Link to='/contact'> Contact </Link> </li>
            </ul>

            <div className='header-side'>
                <ThemeButton />
                <BasketButton />
                <button type='button' className='menu-button'> {/* Can I use a <button> for the theme btn too? */}
                    {/* <img src={menu} alt="Menu"/> */}
                    <MenuIcon className='menu-svg' alt="Menu"/>
                </button>
            </div>

        </header>
    )
}
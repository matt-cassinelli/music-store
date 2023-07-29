import React from "react";
import Link from 'next/link';
import logo from './logo.svg';
import MenuButton from './MenuButton';
import ThemeButton from './ThemeButton';
import BasketButton from './BasketButton';

export default function Navbar() {

    return (
        <header>
            <div className='header-left-side'>
                <Link href="/">
                    <img className="logo" src={logo} alt="Home"/>
                </Link>
            </div>
            <ul className="nav-links hide-under-width-breakpoint">
                <li key={1}> <Link href='/sounds'> Sounds </Link> </li>
                <li key={2}> <Link href='/services'> Services </Link> </li>
                <li key={3}> <Link href='/contact'> Contact </Link> </li>
            </ul>
            <div className='header-right-side'>
                <ThemeButton className="hide-under-width-breakpoint"/>
                <BasketButton className="hide-under-width-breakpoint"/>
                <MenuButton/>
            </div>
        </header>
    )
}
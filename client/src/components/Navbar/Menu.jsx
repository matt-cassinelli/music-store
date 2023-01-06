import './Menu.css';
import React from "react";
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import CloseButton from './CloseButton';
import ThemeButton from './ThemeButton';
import BasketButton from './BasketButton';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMenu, selectMenuState } from '../../redux/menuSlice';

export default function Menu() {

    const visibility = useSelector(selectMenuState);
    const dispatch = useDispatch();

    return (
        <aside className={`${visibility ? 'menu show-menu' : 'menu'}`}>
            <div className="menu-top">
                <img src={logo} className="logo" alt="Sound Store" />
                <CloseButton onClick={() => dispatch(toggleMenu())} />
            </div>
            <ul className='menu-links'>
                <li key={1}> <Link to='/sounds'   onClick={() => dispatch(toggleMenu())}> Sounds   </Link> </li>
                <li key={2}> <Link to='/services' onClick={() => dispatch(toggleMenu())}> Services </Link> </li>
                <li key={3}> <Link to='/contact'  onClick={() => dispatch(toggleMenu())}> Contact  </Link> </li>
                <li key={4}> <Link to='/checkout' onClick={() => dispatch(toggleMenu())}> Checkout </Link> </li>
            </ul>
            <div className='menu-lower'>
                <ThemeButton />
                <BasketButton />
            </div>
        </aside>
    )
}
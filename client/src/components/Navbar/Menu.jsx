import './Menu.css';
import React from "react";
import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import CloseButton from './CloseButton'
import BasketButton from './BasketButton'
import { useSelector, useDispatch } from 'react-redux';
import { toggle, selectMenuState } from '../../redux/menuSlice';

export default function Menu() {

    const visibility = useSelector(selectMenuState);
    const dispatch = useDispatch();

    return (
        <aside className={`${visibility ? 'menu show-menu' : 'menu'}`}>
            <div className="menu-header">
                <img src={logo} className="logo" alt="Sound Store" />
                <CloseButton onClick={() => dispatch(toggle())}/>
            </div>
            <ul className='menu-links'>
                <li key={1}> <Link to='/sounds'   onClick={() => dispatch(toggle())}> Sounds   </Link> </li>
                <li key={2}> <Link to='/services' onClick={() => dispatch(toggle())}> Services </Link> </li>
                <li key={3}> <Link to='/contact'  onClick={() => dispatch(toggle())}> Contact  </Link> </li>
                <li key={4}> <Link to='/checkout' onClick={() => dispatch(toggle())}> Checkout </Link> </li>
            </ul>
            <div className='menu-lower-btns'>
                <BasketButton />
                {/* [todo] Add theme btn */}
            </div>

        </aside>
    )
}
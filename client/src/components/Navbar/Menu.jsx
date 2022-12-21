import './Menu.css';
import React from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'
//import { useProductsContext } from '../context/products_context'
//import { FaTimes } from 'react-icons/fa'
//import { links } from '../utils/constants'
//import styled from 'styled-components'
import BasketButton from './BasketButton'
import CloseButton from './CloseButton'
//import { useUserContext } from '../context/user_context'

export default function Menu() {
    const isOpen = true;
    return (
        <aside className={`${isOpen ? 'menu show-menu' : 'menu'}`}>
            <div className="menu-header">
                <img src={logo} className="logo" alt="Sound Store" />
                <CloseButton />
            </div>
            <ul className='menu-links'>
                <li key={1}> <Link to='/sounds'> Sounds </Link> </li>
                <li key={2}> <Link to='/services'> Services </Link> </li>
                <li key={3}> <Link to='/contact'> Contact </Link> </li>
                <li key={4}> <Link to='/checkout'> Checkout </Link> </li>
            </ul>
            <div className='menu-lower-btns'>
                <BasketButton />
                {/* [todo] Add theme btn */}
            </div>

        </aside>
    )
}
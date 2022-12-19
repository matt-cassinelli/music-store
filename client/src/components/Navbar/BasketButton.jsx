import { ReactComponent as BasketIcon } from './basket.svg';
import { Link } from 'react-router-dom';
import './BasketButton.css';

export default function BasketButton() {
    return (
        <Link to="/basket" className='basket-btn-container'>
            {/* <img src={basket} alt="basket" /> */}
            <BasketIcon className='basket-svg'/>
            <span>7</span>
        </Link>
    )
}
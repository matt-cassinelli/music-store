import { ReactComponent as BasketIcon } from './basket.svg';
import { Link } from 'react-router-dom';
import './BasketButton.css';

// CSS className can be passed through as a prop, allowing the component to be extended/customised.

export default function BasketButton({className}) {
    // [dbg] console.log(className)
    return (
        <Link to="/basket" className={'basket-btn-container ' + (className || "")}>
            {/* <img src={basket} alt="basket" /> */}
            <BasketIcon className='basket-svg'/>
            <span>7</span>
        </Link>
    )
}
import './Header.css';
import logo from '../assets/img-app/logo.svg';

export default function Header() {
    return (
        <header>
            <div id="header-left">
                <img id="logo" src={logo} alt="logo" />
            </div>
            <div id="nav">
                <a href="index.html" id="nav-active">SOUNDS</a>
                <a href="services.html">SERVICES</a>
                <a href="contact.html">CONTACT</a>
            </div>
            <div id="header-right">
                <input id="theme-checkbox" type="checkbox"/>
                <label id="theme-label" htmlFor="theme-checkbox"></label>
            </div>
        </header>
        /* <nav>
            <h1 className='header'>blabla</h1>
        </nav> */
    )
}

// [old]
// const themeCheckboxElem = document.querySelector('#theme-checkbox');
// themeCheckboxElem.addEventListener('change', switchTheme, false);

// function switchTheme(e) {
//     if (e.target.checked) {
//         document.documentElement.setAttribute('data-theme', 'dark');
//     }
//     else {
//         document.documentElement.setAttribute('data-theme', 'light');
//     }    
// }
import {useEffect} from "react"; // [idea] ChangeEventHandler
import './Header.css';
import logo from '../assets/img-app/logo.svg';

export default function Header() {

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            document.documentElement.setAttribute("data-theme", storedTheme);
        }
        else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, []);

    const toggleTheme = (e) => {
        if (e.target.checked) {
            localStorage.setItem("theme", "light");
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
            document.documentElement.setAttribute("data-theme", "dark");
        }
    };

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
                <label id="theme-label" htmlFor="theme-checkbox"></label>
                <input
                    id="theme-checkbox"
                    type="checkbox"
                    onChange={toggleTheme}
                />
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
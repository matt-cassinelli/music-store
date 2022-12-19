import {useEffect, useState} from "react"; // [idea] ChangeEventHandler
import './ThemeButton.css';
// import {ReactComponent as SunIcon} from '../assets/img-app/sun.svg';
// import {ReactComponent as MoonIcon} from '../assets/img-app/moon.svg';


export default function ThemeButton() {

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
        <div id="theme-btn-container">
            <label id="theme-label" htmlFor="theme-checkbox"></label>
            <input
                id="theme-checkbox"
                type="checkbox"
                onChange={toggleTheme}
            />
        </div>
    )
}
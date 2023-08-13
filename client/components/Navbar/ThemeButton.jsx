// import Image from "next/image";
import classNames from "@/utils/classNames";
import {useEffect, useState} from "react";
// import {ReactComponent as SunIcon} from '../assets/img-app/sun.svg';
// import {ReactComponent as MoonIcon} from '../assets/img-app/moon.svg';

export default function ThemeButton({className}) {

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
    <button type='button' className={classNames("flex items-center", className)}>
      <label
        htmlFor="theme-checkbox"
        className="cursor-pointer w-7 h-7 bg-[url('/moon.svg')] dark:bg-[url('/sun.svg')] bg-no-repeat text-primary"
      >
      </label>
      <input
        id="theme-checkbox"
        type="checkbox"
        className="hidden"
        onChange={toggleTheme}
      />
    </button>
  );
}
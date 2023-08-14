import classNames from "@/utils/classNames";
import {useEffect, useState} from "react";

export default function ThemeButton({className}) {
  const [theme, setTheme] = useState("");

  // When component mounts
  useEffect(() => {
    const storedPreference = localStorage.getItem("theme");
    if (storedPreference) {
      setTheme(storedPreference);
    }
    else {
      setTheme(getSystemPreference());
    }
  }, []);

  // When theme state changes
  useEffect(() => {
    if (theme !== undefined) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  function getSystemPreference() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  return (
    <button
      type='button'
      className={classNames("flex items-center cursor-pointer w-7 h-7 text-primary fill-primary", className)}
      onClick={handleClick}
    >
      {theme === "dark" ?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 486">
          <g>
            <circle cx="243" cy="243" r="119"/>
            <path d="M16 227h54a15 15 0 0 1 15 16 15 15 0 0 1-15 15H16a15 15 0 0 1-16-15 15 15 0 0 1 16-16Z"/>
            <path d="M417 227h54a15 15 0 0 1 15 16 15 15 0 0 1-15 15h-54a15 15 0 0 1-16-15 15 15 0 0 1 16-16Z"/>
            <path d="M259 417v54a15 15 0 0 1-15 15 15 15 0 0 1-16-15v-54a15 15 0 0 1 16-16 15 15 0 0 1 15 16Z"/>
            <path d="M259 16v54a15 15 0 0 1-15 15 15 15 0 0 1-16-15V16a15 15 0 0 1 16-16 15 15 0 0 1 15 16Z"/>
            <path d="m415 93-36 35a15 15 0 0 1-22 0 15 15 0 0 1 0-22l36-35a15 15 0 0 1 22 0 16 16 0 0 1 0 22Z"/>
            <path d="m381 358 35 35a15 15 0 0 1 0 22 15 15 0 0 1-22 0l-35-35a15 15 0 0 1 0-22 16 16 0 0 1 22 0Z"/>
            <path d="m128 380-35 35a15 15 0 0 1-22 0 15 15 0 0 1 0-22l35-35a15 15 0 0 1 22 0 16 16 0 0 1 0 22Z"/>
            <path d="m93 70 35 35a15 15 0 0 1 0 22 15 15 0 0 1-22 0L71 92a15 15 0 0 1 0-22 16 16 0 0 1 22 0Z"/>
          </g>
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 436 464">
          <path d="M205 260c45 64 119 103 230 85a233 233 0 0 1-389 24A232 232 0 0 1 208 1c-64 88-48 195-3 259z"/>
        </svg>
      }
    </button>
  );
}
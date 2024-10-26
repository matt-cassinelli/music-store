import MoonIcon from "icons/MoonIcon";
import SunIcon from "icons/SunIcon";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function ThemeButton({ className }) {
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
      className={clsx("flex items-center cursor-pointer w-7 h-7 fill-fg", className)}
      onClick={handleClick}
    >
      {theme === "dark" ?
        <SunIcon />
        :
        <MoonIcon />
      }
    </button>
  );
}

import React from "react";
import logo from "./logo.svg";
import Link from "next/link";
import CloseButton from "./CloseButton";
import ThemeButton from "./ThemeButton";
import BasketButton from "./BasketButton";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu, selectMenuState } from "../../redux/menuSlice";
import { links } from "./links";
import classNames from "@/utils/classNames";

export default function Menu() {

  const visibility = useSelector(selectMenuState);
  const dispatch = useDispatch();

  return (
    <aside className={classNames(
      "fixed top-0 left-0 w-full h-full bg-panel transition-all text-center lg:hidden",
      (visibility ? "translate-x-0 translate-y-0 z-50" : "translate-x-full translate-y-full -z-10")
    )}>
      <div className="flex justify-between items-center p-4">
        <img src={logo} className="logo" alt="Sound Store"/>
        <CloseButton onClick={() => dispatch(toggleMenu())} />
      </div>
      <ul className='mb-8'>

        {links.map((link) =>
          <li key={link.key}>
            <Link
              className="block text-left capitalize p-5 text-primary transition-all tracking-wider no-underline hover:pl-8 hover:text-bg hover:bg-primary"
              href={link.href}
              onClick={() => dispatch(toggleMenu())}
            >
              {link.title}
            </Link>
          </li>
        )}
      </ul>
      <div className='flex justify-center gap-12'>
        <ThemeButton />
        <BasketButton />
      </div>
    </aside>
  );
}
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "./logo.svg";
import MenuButton from "./MenuButton";
import ThemeButton from "./ThemeButton";
import BasketButton from "./BasketButton";
import { links } from "./links";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 h-12">
      <Link href="/">
        <Image className="h-9 w-9" src={logo} alt="Home"/>
      </Link>
      <ul className="hidden md:flex gap-7">
        {links.map((link) =>
          <li key={link.key}>
            <Link
              className="tracking-widest font-semibold text-xl hover:underline"
              href={link.href}
            >
              {link.title}
            </Link>
          </li>
        )}
        <li>
          <ThemeButton className="hidden md:flex"/>
        </li>
        <li>
          <BasketButton className="hidden md:flex"/>
        </li>
        <li>
          <MenuButton/>
        </li>
      </ul>
    </header>
  );
}
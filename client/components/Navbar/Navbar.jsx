import { Disclosure, Transition } from '@headlessui/react';
import Link from "next/link";
import Image from "next/image";
import ThemeButton from "./ThemeButton";
import BasketButton from "./BasketButton";
import CloseIcon from "./CloseIcon";
import MenuIcon from "./MenuIcon";
import logo from "./logo.svg";
import { links } from "./links";

export default function Navbar() {
  return (
    <Disclosure as="nav">
      {({ open, close }) => (<>
        <header className="flex justify-between items-center p-4 h-12">
          <Link href="/">
            <Image className="h-9 w-9" src={logo} alt="Home"/>
          </Link>
          <ul className="flex gap-7">
            {links.map((link) =>
              <li key={link.key}>
                <Link
                  className="hidden md:flex tracking-widest font-semibold text-xl hover:underline"
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
              {/* Mobile menu button*/}
              <Disclosure.Button className="flex md:hidden p-2 rounded-md text-primary focus:ring-2 focus:ring-accent1">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <MenuIcon/>
                ) : (
                  <CloseIcon/>
                )}
              </Disclosure.Button>
            </li>
          </ul>
        </header>
        <Transition
          show={open}
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel static className="md:hidden h-screen">
            <div className="py-4 space-y-1 text-center text-base">
              {links.map((link) => (
                <Disclosure.Button
                  key={link.key}
                  className='w-full block px-3 py-4 font-medium border-b border-grey'
                >
                  <Link
                    href={link.href}
                    passHref
                    className='hover:text-palette-dark'
                    onClick={close}
                  >
                    {link.title}
                  </Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </Transition>
      </>)}
    </Disclosure>
  );
}
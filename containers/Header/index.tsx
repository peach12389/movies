import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import SideNav from '../SideNav';
import { Fragment, useState, useEffect } from 'react';
import { MdMenu, MdRestaurantMenu } from 'react-icons/md';
import { useWindowSize } from '../../hooks';

const Header = () => {
  const routes = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Search',
      href: '#search',
    },
    {
      name: 'Map',
      href: '#map',
    },
    {
      name: 'Profile',
      href: '#profile',
    },
  ];

  const socials = [
    {
      Icon: FaFacebookF,
      href: 'https://www.facebook.com/katchkw/',
    },
    {
      Icon: FaInstagram,
      href: 'https://www.instagram.com/katchkw/?hl=en',
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { width } = useWindowSize();

  useEffect(() => {
    if (isOpen && width > 640) {
      toggleMenu();
    }
  }, [width]);

  const MenuIcon = isOpen ? MdRestaurantMenu : MdMenu;

  return (
    <Fragment>
      <header className="bg-brand-green px-5 py-2 overflow-hidden z-[2] sticky top-0 left-0 right-0 h-[62px]">
        <div className="flex">
          <div className="min-w-[100px] cursor-pointer">
            <Link passHref href="/" aria-label="katch home">
              <Image unoptimized alt="katch logo" src="/assets/images/katch-logo-white.svg" height="40" width="100" />
            </Link>
          </div>
          <nav className="hidden sm:block mx-auto my-auto">
            <ul className="flex text-white items-center">
              {routes.map((route) => {
                return (
                  <li key={route.name} className=" text-center w-24">
                    <span className="w-1 cursor-pointer" title={route.name}>
                      <Link href={route.href} aria-label={route.name}>
                        {route.name}
                      </Link>
                    </span>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="justify-center items-center ml-auto sm:ml-0 hidden sm:flex">
            {socials.map((social) => {
              const Icon = social.Icon;
              return (
                <a target="blank" className="ml-2" key={social.href} href={social.href}>
                  <Icon className="text-white" />
                </a>
              );
            })}
          </div>
          <div
            onClick={() => toggleMenu()}
            className="flex ml-auto items-center justify-center cursor-pointer sm:hidden">
            <MenuIcon className="text-white text-3xl" />
          </div>
        </div>
      </header>
      <SideNav routes={routes} isOpen={isOpen} toggleMenu={toggleMenu} />
    </Fragment>
  );
};
export default Header;

import { Fragment } from 'react';
import { FaMap, FaPhone, FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  const socials = [
    {
      name: 'facebook',
      color: 'text-social-facebook',
      href: 'https://www.facebook.com/katchkw/',
      icon: FaFacebook,
    },
    {
      name: 'instagram',
      color: 'text-social-instagram',
      href: 'https://www.instagram.com/katchkw/?hl=en',
      icon: FaInstagram,
    },
    {
      name: 'linkedin',
      color: 'text-social-linkedin',
      href: 'https://www.linkedin.com/company/katch-kuwait/',
      icon: FaLinkedinIn,
    },
  ];

  const appLinks = [
    {
      link: 'https://play.google.com/store/apps/details?id=com.aktech.katch',
      image: '/assets/images/android.webp',
    },
    {
      link: 'https://apps.apple.com/us/app/katch-kw/id1531865963',
      image: '/assets/images/apple.webp',
    },
  ];

  return (
    <footer className="bg-gray-50 shadow-inner">
      <div className="flex border-b-2 border-gray-200 pb-6 px-5 flex-wrap">
        {/* item 1 */}
        <div className="logo flex-1 mt-6">
          <Image unoptimized src="/assets/images/katch-logo-color.svg" height="30" width="110" alt="katch logo" />
          <p className="text-gray-600 leading-6 w-48 mt-1">
            We bring the restaurant community closer to you! Order now on katch!
          </p>
        </div>
        {/* item 1 ^*/}
        {/* item 2 */}
        <div className="flex-1 mt-6">
          <span className="text-lg font-bold">Contact:</span>
          <div className="">
            <span className="text-sm text-gray-600 items-center">
              <FaPhone className="mr-2  text-brand-green text-base inline" />
              +965 2297 4411
            </span>
            <br />
            <div className="flex text-sm text-gray-600 mt-3">
              <FaMap className="mr-2 text-brand-green text-xl inline" />
              <span className="w-48">Al Hamad Tower A, 5th Floor, Abu Bakr St, Kuwait City</span>
            </div>
          </div>
        </div>
        {/* item 2 ^*/}
        {/* item 3 */}
        <div className="flex-1 mt-6">
          <span className="text-lg font-bold">Social links:</span>
          <ul className="flex">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <li key={social.name} className="mr-2">
                  <a href={social.href} target="blank">
                    <Icon className={`text-2xl ${social.color}`} />
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="pt-2 w-56">
            {appLinks.map((app) => {
              return (
                <a key={app.link} href={app.link} className="inline-block">
                  <Image unoptimized src={app.image} height="45" width="165" alt="app links" />
                </a>
              );
            })}
          </div>
        </div>
        {/* item 3 ^*/}
      </div>
      <Bottom />
    </footer>
  );
};

const Bottom = () => {
  const links = [
    {
      name: 'Help',
      href: '#help',
    },
    {
      name: 'Terms and Conditions',
      href: '#tc',
    },
    {
      name: 'Privacy',
      href: '#p',
    },
  ];
  return (
    <Fragment>
      <div className="my-2 flex items-center px-5">
        <span className="text-gray-400 text-sm">© 2020 Katch!</span>
        <ul className="flex flex-1 justify-end">
          {links.map((link) => {
            return (
              <li key={link.name} className="ml-5">
                <a className="text-sm text-gray-600" href={link.href}>
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default Footer;

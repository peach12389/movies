import { FC } from 'react';
import router from 'next/router';

type TProps = {
  routes: Array<Record<string, string>>;
  toggleMenu: CallableFunction;
  isOpen: boolean;
};
const SideNav: FC<TProps> = ({ routes, toggleMenu, isOpen }) => {
  const openedStyle = 'w-[100%]';
  const closedStyle = 'w-[0] opacity-0';
  const defaultStyle = 'fixed top-0 right-0 bottom-0 z-[100] mt-[62px]';

  return (
    <div
      id="side-nav"
      onClick={(event) => {
        const target = event.target as HTMLDivElement;
        const id = target.id;
        if (id === 'side-nav') {
          toggleMenu();
        }
      }}
      style={{
        transition: 'all ease 300ms',
        backgroundColor: '#00000030',
      }}
      className={`${defaultStyle} ${isOpen ? openedStyle : closedStyle} transition-all`}>
      <div className="bg-gray-50 drop-shadow-lg w-[200px] h-full ml-auto">
        <ul className="flex flex-col text-black">
          {routes.map((route) => {
            return (
              <li
                onClick={() => {
                  router.push(route);
                  toggleMenu();
                }}
                key={route.name}
                className="hover:border-brand-green border-b-2 px-5 py-2 text-right text-gray-400 hover:text-brand-green cursor-pointer">
                <span className="w-1 cursor-pointer" title={route.name}>
                  {route.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;

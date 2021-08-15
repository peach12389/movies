import { Dispatch, SetStateAction, useEffect } from 'react';

type TProps = {
  tabs: string[];
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
};

const RestaurantTopNav = ({ tabs, tabIndex, setTabIndex }: TProps) => {
  function handleScroll() {
    const rootElement = document.documentElement;
    const nav = document.querySelector('#top-nav');
    const navText = document.querySelectorAll('.nav-text');
    if (rootElement.scrollTop > 100) {
      nav?.classList.add('bg-white');
      navText?.forEach((x) => x.classList.remove('text-white'));
    } else {
      nav?.classList.remove('bg-white');
      navText?.forEach((x) => x.classList.add('text-white'));
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="top-nav"
      className="transition-all fixed top-0 right-0 left-0 flex justify-center items-center pt-0.5 z-10">
      {tabs.map((x, i) => {
        const isSelected = i === tabIndex;
        return (
          <span
            className={`text-lg text-white nav-text mx-10 uppercase font-bold border-b-2 ${
              isSelected ? 'border-brand-green' : ''
            } px-2 cursor-pointer`}
            key={x}
            onClick={() => {
              if (!isSelected) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => setTabIndex(i), 100);
              }
            }}>
            {x}
          </span>
        );
      })}
    </div>
  );
};

export default RestaurantTopNav;

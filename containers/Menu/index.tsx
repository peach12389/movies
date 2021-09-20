import { Fragment, useState } from 'react';
import Modal from '../Modal';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useEffect } from 'react';

type TProps = {
  categories: Record<string, any>;
};

const goToViolation = (id: string, callBack?: CallableFunction) => {
  const catItem = document.getElementById(id);

  if (catItem) {
    const b = document.getElementById('store-info');
    //const c = document.getElementById('head');
    const h = b?.clientHeight;
    //const h1 = c.clientHeight * 2;
    //  console.log(h1);
    // console.log(h);
    const itemOffset = catItem?.offsetTop + h;

    window.scrollTo({
      top: itemOffset,
      behavior: 'smooth',
    });
  }
  if (callBack) callBack();
};

export const Menu = ({ categories }: TProps) => {
  const onResize = () => {
    const storeInfoDiv = document.getElementById('store-info');
    if (storeInfoDiv) {
      const divH = storeInfoDiv.offsetHeight;
      const menuUl = document.getElementById('store-side-menu');
      if (menuUl) {
        menuUl.style.top = `${divH + 62 + 5}px`;
        menuUl.style.height = `${window.innerHeight - (divH + 62 + 20)}px`;
      }
    }
  };
  useEffect(() => {
    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div id="store-side-menu" className="scrollbar-hide flex-[1] hidden sm:block overflow-scroll sticky">
      <ul className="rounded-lg border-4">
        {categories.map((x: Record<string, any>, index: number) => {
          const name = x.name;
          const count = x.count;
          const isFirstItem = index === 0;
          const onClick = () => {
            goToViolation(name);
          };
          return (
            <button
              key={name}
              onClick={onClick}
              className={`${
                isFirstItem ? 'border-t-0-' : 'border-t-4'
              } ${'text-gray-400 text-sm w-full min-h-[44px] text-left px-4 flex items-center'}`}>
              <span className="line-clamp-1">
                {name} ({count})
              </span>
              <HiOutlineChevronRight className="ml-auto " />
            </button>
          );
        })}
      </ul>
    </div>
  );
};

export const MenuModal = ({ categories }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <Modal isOpen={isOpen} requestClose={toggleModal} className="sm:hidden">
        <div className=" fixed bottom-16 right-5 bg-white flex flex-col px-5 py-3 items-start rounded-lg max-h-80 overflow-y-scroll">
          {categories.map((x: Record<string, any>) => {
            const name = x.name;
            const count = x.count;
            const onClick = () => {
              goToViolation(name, toggleModal);
            };
            return (
              <button className="text-gray-400 mb-2" key={name} onClick={onClick}>
                {name} ({count})
              </button>
            );
          })}
        </div>
      </Modal>
      <div
        onClick={toggleModal}
        className="sm:hidden fixed bottom-5 right-5 bg-black px-4 py-1 text-white rounded-lg cursor-pointer">
        {isOpen ? 'Close' : 'Menu'}
      </div>
    </Fragment>
  );
};

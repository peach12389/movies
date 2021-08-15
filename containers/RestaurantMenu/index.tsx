import { Fragment, useState } from 'react';
import Img from 'react-cool-img';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from '../Modal';

type TProps = {
  data: Record<string, any>;
};

export const RestaurantMenu = ({ data }: TProps) => {
  const storeId = data._id;
  const categories = data.products.map((x: Record<any, any>) => x._id);
  const products = data.products.reduce((acc: Record<any, any>[], item: any) => {
    acc.push(...[{ catName: item._id }, ...item.products]);
    return acc;
  }, []);

  const limit = 50;

  const [list, setList] = useState({
    data: products.slice(0, limit),
    prev: 0,
    next: limit,
    hasMore: true,
  });

  const getMoreData = () => {
    if (!list.hasMore) {
      return;
    }
    setList((state) => {
      state.data = state.data.concat(products.slice(state.prev + limit, state.next + limit));
      state.prev = state.prev + limit;
      state.next = state.next + limit;
      if (state.data.length === products.length) {
        state.hasMore = false;
      }

      return { ...state };
    });
  };

  const renderListHeader = (item: Record<string, string>) => {
    return (
      <div key={item.catName} id={item.catName} className="h-8 sticky top-0">
        <h2 className="font-bold">{`${item.catName}`}</h2>
      </div>
    );
  };

  const renderListItem = (item: Record<string, any>) => {
    const src = `https://img.katchkw.com/images/${storeId}/productImages/${item.image}`;

    return (
      <div key={item._id} className="my-5 flex">
        <div
          id={item._id}
          style={{ maxWidth: 120, maxHeight: 100 }}
          className="w-0 overflow-hidden h-full bg-brand-green rounded-lg transition-all">
          <Img
            className="object-cover transition-all"
            onLoad={() => {
              const doc = document.getElementById(`${item._id}`);
              if (doc) {
                doc.classList.remove('w-0');
                doc.classList.add('w-30');
              }
            }}
            src={src}
            alt={src}
            debounce={2000}
            observerOptions={{
              threshold: 1,
              rootMargin: '0px',
            }}
            retry={{ count: 0 }}
          />
        </div>
        <div className="ml-2 flex-1">
          <p className="font-bold text-md">{item.name}</p>
          {item.description && (
            <p className="text-sm text-gray-400 line-clamp-2 max-w-xs sm:max-w-md">{`${item.description}`}</p>
          )}
          <div className="mt-2 flex flex-wrap">
            {item.tags.map((x: string, index: number) => {
              const colors = ['bg-brand-red', 'bg-brand-green', 'bg-brand-blue', 'bg-brand-yellow'];
              const color = colors[index % colors.length];
              const isMax = index > 5;
              return isMax ? null : (
                <span key={x} className={`mr-2 mb-2 text-xs ${color} text-white uppercase px-2 py-0.5 rounded-md`}>
                  {x}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex-shrink flex justify-end items-start">
          <span className="text-sm text-brand-green bg-green-light rounded-lg px-2 py-1 border">{item.price} KD</span>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <InfiniteScroll dataLength={list.data.length} next={getMoreData} hasMore={list.hasMore} loader={''}>
        {list.data && (
          <ul className="mx-5 sm:mx-auto sm:max-w-xl">
            {products.map((item: any) => {
              const isCat = item.catName;
              return isCat ? renderListHeader(item) : renderListItem(item);
            })}
          </ul>
        )}
      </InfiniteScroll>
      <Menu categories={categories} />
    </Fragment>
  );
};

type TMenuProps = {
  categories: Array<string>;
};

const Menu = ({ categories }: TMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const goToViolation = (id: string) => {
    const violation = document.getElementById(id);
    if (violation) {
      window.scrollTo({
        top: violation.offsetTop - 50,
        behavior: 'smooth',
      });
      toggleModal();
    }
  };

  return (
    <Fragment>
      <Modal isOpen={isOpen} requestClose={toggleModal}>
        <div className=" fixed bottom-16 right-5 bg-white flex flex-col px-5 py-3 items-start rounded-lg max-h-80 overflow-y-scroll">
          {categories.map((x) => {
            const onClick = () => {
              goToViolation(x);
            };
            return (
              <button className="text-gray-400 mb-2" key={x} onClick={onClick}>
                {x}
              </button>
            );
          })}
        </div>
      </Modal>
      <div
        onClick={toggleModal}
        className="fixed bottom-5 right-5 bg-black px-4 py-1 text-white rounded-lg cursor-pointer">
        {isOpen ? 'Close' : 'Menu'}
      </div>
    </Fragment>
  );
};

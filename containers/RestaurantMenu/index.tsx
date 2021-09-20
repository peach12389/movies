import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Fragment } from 'react';
import { useInView } from 'react-intersection-observer';
import { Menu, MenuModal } from '../Menu';

type TProps = {
  data: Record<string, any>;
};

export const RestaurantMenu = ({ data }: TProps) => {
  const storeId = data._id;
  const categories = data.products.map((x: Record<any, any>) => ({ name: x._id, count: x.products.length }));
  const products = data.products.reduce((acc: Record<any, any>[], item: any) => {
    acc.push(...[{ catName: item._id }, ...item.products]);
    return acc;
  }, []);

  return (
    <div className="mt-3">
      <div className="flex w-full relative">
        <Menu categories={categories} />
        <ul id="item-list" className=" scrollbar-hide px-5 flex-[4] overflow-y-scroll bg-white">
          {products.map((item: any) => {
            const isCat = item.catName;
            return isCat ? (
              <RenderListHeader item={item} />
            ) : (
              <RenderListItem storeId={storeId} item={item} key={item._id} />
            );
          })}
        </ul>
        <MenuModal categories={categories} />
      </div>
    </div>
  );
};

type TRenderListProps = {
  storeId?: string;
  item: Record<string, any>;
};

const RenderListHeader = ({ item }: TRenderListProps) => {
  return (
    <Fragment key={item.catName}>
      <div className="sticky top-0 h-8 bg-white z-[1] py-1">
        <h2 className="font-bold">{`${item.catName}`}</h2>
      </div>
      <div id={item.catName} className="h-0" />
    </Fragment>
  );
};

const RenderListItem = ({ item, storeId }: TRenderListProps) => {
  const src = `https://img.katchkw.com/images/${storeId}/productImages/${item.image}`;
  const [image, setImage] = useState({
    loaded: false,
    src: src,
  });
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const isIn = useRef(false);

  const setPreloader = () => {
    const preloader = new Image();

    preloader.onload = () => {
      setImage({
        loaded: true,
        src,
      });
    };

    preloader.src = src;
  };

  useEffect(() => {
    if (inView && !isIn.current) {
      isIn.current = inView;
      setPreloader();
    }
  }, [inView]);

  return (
    <div className="bg-white min-h-[100px]" key={item._id} ref={ref}>
      {(inView || isIn.current === true) && (
        <div className="my-5 flex bg-white animate-fade-in">
          <div
            id={item._id}
            style={{ maxWidth: 120, maxHeight: 100 }}
            className={`${image.loaded ? 'w-30' : 'w-0'} overflow-hidden h-full bg-brand-green rounded-lg`}>
            <img className="object-cover" src={image.src} alt={`${item.name} image`} />
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
      )}
    </div>
  );
};

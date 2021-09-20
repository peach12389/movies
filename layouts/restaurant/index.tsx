/* eslint-disable @next/next/no-img-element */
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import converter from 'number-to-words';
import { Filled_Star } from '../../assets/images/icons';
import Meta from '../../components/Meta';
import { RestaurantInfoStar } from '../../components/RestaurantInfoStar';
import moment from 'moment';
import StoreHoursModal from '../../components/StoreHoursModal';
import Breadcrumbs from 'nextjs-breadcrumbs';
import Image from 'next/image';
import { AiOutlineInfoCircle, AiFillPhone } from 'react-icons/ai';

type TProps = {
  children?: ReactNode;
  data: Record<string, any>;
  tabs: string[];
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
};

export const convertOpeningTime = (nextOpening: { time: string }) => {
  const opening = nextOpening;
  if (!opening) {
    return null;
  }
  let hour = parseInt(opening.time.substring(0, 2));
  const min = opening.time.substring(2, 4);

  if (hour < 12) {
    if (hour < 10) {
      opening.time = `0${hour}:${min} AM`;
    } else {
      opening.time = `${hour}:${min} AM`;
    }
  } else {
    hour = hour - 12;
    if (hour < 10) {
      opening.time = `0${hour}:${min} PM`;
    } else {
      opening.time = `${hour}:${min} PM`;
    }
  }

  return opening;
};

const getStoreHours = (storeHours: { opening: string[]; closing: string[] }) => {
  const opening = storeHours.opening;
  const closing = storeHours.closing;

  return [...Array(7)].reduce((acc, _, i) => {
    const openTime = opening[i];
    const closeTime = closing[i];
    const isClosedForTheDay = openTime === '' || closeTime === '';
    if (!isClosedForTheDay) {
      const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const todaysIndex = (moment().local().day() + 1) % 7;
      const currentTime = moment().local().format('HHmm');
      const openingTime = !isClosedForTheDay ? convertOpeningTime({ time: openTime }) : { time: '' };
      const closingTime = !isClosedForTheDay ? convertOpeningTime({ time: closeTime }) : { time: '' };
      const isToday = todaysIndex === i;
      const isOpenNow = isToday ? currentTime >= openTime && currentTime < closeTime : false;
      if (openingTime && closingTime) {
        acc.push({
          isToday,
          isOpenNow,
          day: daysOfWeek[i],
          time: `${openingTime.time} - ${closingTime.time}`,
        });
      }
    }
    return acc;
  }, []);
};

const getCost = (estimatedCost: { customerInteger?: number; cost?: string }) => {
  if (estimatedCost.customerInteger && estimatedCost.cost) {
    const numOfCustomers = converter.toWords(estimatedCost.customerInteger);
    return `Cost for ${numOfCustomers} - ${estimatedCost.cost} KD (approx.)`;
  }
};

const RestaurantLayout = (props: TProps) => {
  const { children, data, tabIndex, setTabIndex, tabs } = props;

  const [image, setImage] = useState({
    src: `https://img.katchkw.com/images/${data._id}/${data.image}`,
    imageClass: 'w-full h-full object-cover',
    containerClass: 'w-full',
    width: '1000',
    height: '300',
    objectFit: 'cover',
  });

  const onImageError = () => {
    setImage((state) => {
      return {
        ...state,
        src: 'default-rest-img_lqZlEFwiEbN.png',
        imageClass: 'w-96 h-40 object-contain',
        containerClass: 'bg-green-light w-full flex justify-center items-center',
        objectFit: 'contain',
        width: '300',
        height: '300',
      };
    });
  };

  const storeID = data._id;
  const storeName = data.shopName;
  const phoneNumber = data.phone;
  const tags = data.tags;
  const pickUpRating = data.rating.toFixed(1);
  const pickUpRatingCount = data.reviewsCount;
  const restaurantRating = data.restaurantRating.toFixed(1);
  const restaurantRatingCount = data.restaurantReviewsCount;
  const category = data.category;
  const address = data.address;
  const estimatedCost = getCost(data.estimatedCost);
  const todaysIndex = (moment().local().day() + 1) % 7;
  const storeHours = getStoreHours(data.storeHours);
  const todayStoreHours = storeHours[todaysIndex];
  const isOpenNow = todayStoreHours?.isOpenNow;
  const [showTiming, setShowTiming] = useState(false);

  const toggleModal = () => {
    setShowTiming(!showTiming);
  };

  const transformLabel = (label: string) => {
    if (label === 'restaurant') {
      return null;
    }

    if (label === storeID) {
      return `restaurant / ${storeName}`;
    }

    return label;
  };

  return (
    <main className="bg-gray-50 px-5 pb-3">
      <Meta title={storeName} keywords={tags} />

      <div className="max-w-[1000px] mx-auto relative">
        <Breadcrumbs
          useDefaultStyle
          rootLabel="Home /"
          transformLabel={transformLabel}
          activeItemClassName="text-gray-300 ml-1 text-sm"
          inactiveItemClassName="text-black ml-1 hover:text-brand-green text-sm"
          listStyle={{
            display: 'flex',
          }}
          containerClassName="py-3"
        />
        <div className={`${image.containerClass}`}>
          <Image
            unoptimized
            className={image.imageClass}
            src={image.src}
            objectFit={image.objectFit as any}
            width={image.width}
            height={image.height}
            alt="restaurant image"
            onError={onImageError}
          />
        </div>
        {/* up image */}
        {/* bottom info */}
        <div className="mx-auto z-[1]">
          <div id="store-info" className="p-2 bg-white sticky top-[62px] z-[2]">
            <div className="flex flex-col md:flex-row">
              <p className="font-bold text-2xl mr-auto mt-1">{storeName}</p>
              <div className="flex">
                <RestaurantInfoStar
                  image={Filled_Star}
                  stars={pickUpRating}
                  reviwesCount={pickUpRatingCount}
                  message="Restaurant Review"
                />
                <span className="w-9" />
                <RestaurantInfoStar
                  image={Filled_Star}
                  stars={restaurantRating}
                  reviwesCount={restaurantRatingCount}
                  message="Katch! Pickup Review"
                />
              </div>
            </div>
            <div className="mt-2 md:-mt-5 mb-2 ">
              <p className="p-0 text-lg">{category}</p>
              <p className="p-0 text-xs text-gray-400 mt-1">{address}</p>
              {todayStoreHours ? (
                <div className="cursor-pointer flex items-center" onClick={toggleModal}>
                  <span className={`p-0 text-xs text-${isOpenNow ? 'brand-green' : 'gray-400'} mt-1`}>
                    {isOpenNow ? 'Open now ' : 'Closed '}
                  </span>
                  <span className="p-0 text-xs text-gray-400 mt-1">
                    - {`${todayStoreHours.time} ${todayStoreHours.isToday ? '(Today)' : ''}`}
                  </span>
                  <AiOutlineInfoCircle className="mt-1 ml-2 text-gray-600" style={{ height: 20, width: 20 }} />
                </div>
              ) : (
                <span className="p-0 text-xs text-gray-400 mt-1">Closed for the day</span>
              )}
              <div className="flex">
                <p className="p-0 text-xs text-gray-400  mt-1">{estimatedCost}</p>
                <div className="ml-auto cursor-pointer">
                  <a href={`tel:${phoneNumber}`} className="flex items-center">
                    <AiFillPhone className="text-brand-green mr-1 h-4 w-4" />
                    <span className="text-brand-green text-sm">{phoneNumber}</span>
                  </a>
                </div>
              </div>
            </div>
            <MenuNav active={tabIndex} setActive={setTabIndex} tabs={tabs} />
          </div>

          {children}
        </div>
      </div>
      <StoreHoursModal storeHours={storeHours} toggleModal={toggleModal} isOpen={showTiming} />
    </main>
  );
};

type TTabsProps = {
  tabs: string[];
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
};

const MenuNav = ({ active, setActive, tabs }: TTabsProps) => {
  return (
    <div className="flex border-b-4 border-gray-400 -mb-2 -mx-2">
      {tabs.map((item, index) => {
        const onClick = () => {
          setActive(index);
        };

        const activeStyle = 'border-brand-green';
        const inActiveStyle = 'border-gray-400 text-gray-400';

        const isActive = active === index;
        const defaultStyle = 'flex-1 text-center border-b-4 -mb-1 px-5 cursor-pointer text-xl py-1';
        return (
          <span
            className={`${defaultStyle} ${isActive ? activeStyle : inActiveStyle} capitalize`}
            key={item}
            onClick={onClick}>
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default RestaurantLayout;

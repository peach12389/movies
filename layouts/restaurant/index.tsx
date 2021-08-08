/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import converter from "number-to-words";
import { Filled_Star } from "../../assets/images/icons";
import Meta from "../../components/Meta";
import { RestaurantInfoStar } from "../../components/RestaurantInfoStar";
import moment from "moment";

type TProps = {
  children?: ReactNode;
  data: Record<string, any>;
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
    const isClosedForTheDay = openTime === "" || closeTime === "";
    if (!isClosedForTheDay) {
      const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      const todaysIndex = (moment().local().day() + 1) % 7;
      const currentTime = moment().local().format("HHmm");
      const openingTime = !isClosedForTheDay ? convertOpeningTime({ time: openTime }) : { time: "" };
      const closingTime = !isClosedForTheDay ? convertOpeningTime({ time: closeTime }) : { time: "" };
      const isToday = todaysIndex === i;
      const isOpenNow = currentTime >= openTime && currentTime < closeTime;
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

export const RestaurantLayout = ({ children, data }: TProps) => {
  const imageSrc = `https://img.katchkw.com/images/${data._id}/${data.image}`;
  const storeName = data.shopName;
  const tags = data.tags;
  const pickUpRating = data.rating.toFixed(1);
  const pickUpRatingCount = data.reviewsCount;
  const restaurantRating = data.restaurantRating.toFixed(1);
  const restaurantRatingCount = data.restaurantReviewsCount;
  const category = data.category;
  const address = data.address;
  const estimatedCost = getCost(data.estimatedCost);
  const todaysIndex = (moment().local().day() + 1) % 7;
  const todayStoreHours = getStoreHours(data.storeHours)[todaysIndex];
  return (
    <main>
      <Meta title={storeName} keywords={tags} />
      <div className="h-52 relative">
        <img className="w-full h-full object-cover" src={imageSrc} alt={imageSrc} height="100%" width="100%" />
        <div className="h-full bg-gradient-to-t from-white absolute top-0 bottom-0 left-0 right-0" />
      </div>
      <div className="md:w-9/12 sm:w-full  ml-auto mr-auto">
        <div className=" bg-white sm:ml-auto sm:mr-auto mr-3 ml-3 rounded-lg p-3 shadow-md bottom-10 relative max-w-xl">
          <p className="text-2xl font-bold">{storeName}</p>
          <div className="flex mt-2">
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
          <div className="mt-2 mb-2">
            <p className="p-0 text-lg">{category}</p>
            <p className="p-0 text-xs text-gray-400 mt-1">{address}</p>
            {todayStoreHours ? (
              <div>
                <span className="p-0 text-xs text-gray-400 mt-1">
                  {todayStoreHours.isOpenNow ? "Open now " : "Closed "}
                </span>
                <span className="p-0 text-xs text-gray-400 mt-1">
                  - {`${todayStoreHours.time} ${todayStoreHours.isToday ? "(Today)" : ""}`}
                </span>
              </div>
            ) : (
              <span className="p-0 text-xs text-gray-400 mt-1">Closed for the day</span>
            )}
            <p className="p-0 text-xs text-gray-400  mt-1">{estimatedCost}</p>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

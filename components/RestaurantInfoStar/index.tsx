import { Empty_Star } from "../../assets/images/icons";
import Image from "next/image";

type TProps = {
  message?: string;
  stars: number;
  reviwesCount: number;
  image?: any;
};

export const RestaurantInfoStar = ({ stars, reviwesCount, image = Empty_Star, message }: TProps) => {
  const rating = 5;

  return (
    <div className="mt-1 mb-1">
      <div className="items-center flex">
        {[...Array(rating)].map((_, x) => {
          const isRating = stars > x + 1;
          const alt = isRating ? "filled star" : "empty star";
          const starImage = isRating ? image : Empty_Star;
          return (
            <span className="mr-0.5 h-5 w-5" key={x}>
              <Image alt={alt} src={starImage} height="30" width="30" />
            </span>
          );
        })}
        <span className="ml-1 mr-1 text-base">{stars}</span>
        <span className="text-gray-400 text-xs">({reviwesCount} Reviews)</span>
      </div>
      {message && <span className="text-xs border-b pl-2 pr-2 pb-1 border-black">{message}</span>}
    </div>
  );
};

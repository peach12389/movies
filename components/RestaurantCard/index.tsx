import Image from 'next/image';
import React, { FC, useState } from 'react';
import { Filled_Star } from '../../assets/images/icons';
import { Restaurant } from '../../types';
import { RestaurantInfoStar } from '../../components/RestaurantInfoStar';
import { generateImgScr, distance } from '../../helpers';
import { Location_Pin, TTP } from '../../assets/images/icons';
import { useGeoLocation } from '../../hooks';
import { useRouter } from 'next/dist/client/router';

type RestaurantCardProps = {
  data: Restaurant;
};

const RestaurantCard: FC<RestaurantCardProps> = (props) => {
  const { data } = props;
  const router = useRouter();
  const userLocation = useGeoLocation();
  const [image, setImage] = useState({
    src: generateImgScr(data.image),
    imageClass: 'w-full h-full object-cover',
    containerClass: 'w-full',
    width: '700',
    height: '250',
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

  const onNav = () => {
    router.push(`/restaurant/${data._id}`);
  };

  return (
    <article
      onClick={onNav}
      className="flex flex-col rounded-md w-[488px] overflow-hidden shadow-md my-4 cursor-pointer">
      <div className={`h-[175px] ${image.containerClass}`}>
        <Image
          className={image.imageClass}
          src={image.src}
          objectFit={image.objectFit as any}
          width={image.width}
          height={image.height}
          alt="restaurant image"
          onError={onImageError}
        />
      </div>
      <section className="px-3 py-2 flex flex-col">
        <h4 className="text-lg text-gray-800 font-semibold">{data.shopName}</h4>
        <div className="flex justify-between">
          <div className="flex flex-col flex-grow">
            <RestaurantInfoStar
              image={Filled_Star}
              stars={parseFloat(data.rating.toFixed(1))}
              reviwesCount={data.reviewsCount}
            />
            <p className="text-gray-600 text-sm">{data.category}</p>
          </div>
          <div className="flex flex-col pr-4 overflow-hidden flex-shrink">
            <div className="flex flex-row justify-end">
              <div className="flex items-center">
                <Image src={Location_Pin} height="17" width="16" layout="fixed" alt="restaurant location pin" />
                <span className="ml-1 text-xs font-extrabold text-gray-500 tracking-wide">{`${distance(
                  data.location,
                  userLocation,
                )} KM`}</span>
              </div>
              <div className="flex items-center ml-2">
                <Image src={TTP} height="17" width="17.3" layout="fixed" alt="restaurant location pin" />
                <span className="ml-1 text-xs font-extrabold text-gray-500 tracking-wide">{`${data.ttp} mins`}</span>
              </div>
            </div>
            <div className="mt-1 w-48 text-sm truncate overflow-ellipsis text-gray-500">{data.address}</div>
          </div>
        </div>
        <Tags tags={data.tags} />
      </section>
    </article>
  );
};
export default RestaurantCard;

type TagsProps = {
  tags: [string];
};
const Tags: FC<TagsProps> = (props) => {
  return (
    <ul className="flex flex-wrap">
      {props.tags.map((tag) => (
        <li className="bg-gray-100 text-sm text-gray-500 font-semibold mr-2 p-1 rounded-sm" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
};

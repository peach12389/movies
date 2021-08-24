import Image from 'next/image';
import React, { FC } from 'react';
import { Filled_Star } from '../../assets/images/icons';
import { Restaurant, GeoLocation } from '../../types';
import { RestaurantInfoStar } from '../../components/RestaurantInfoStar';
import { generateImgScr, distance } from '../../helpers';
import { Location_Pin, TTP } from '../../assets/images/icons';

// import { useRouter } from 'next/router';

type RestaurantCardProps = {
  data: Restaurant;
  userLocation: GeoLocation | null;
};

const RestaurantCard: FC<RestaurantCardProps> = (props) => {
  const { data, userLocation } = props;
  // const router = useRouter();

  // const [image, setImage] = useState({
  //   src: generateImgScr(data.image),
  //   imageClass: 'w-full h-full object-cover',
  //   containerClass: 'w-full',
  //   width: '700',
  //   height: '250',
  //   objectFit: 'cover',
  // });

  // const onImageError = () => {
  //   setImage((state) => {
  //     return {
  //       ...state,
  //       src: 'default-rest-img_lqZlEFwiEbN.png',
  //       imageClass: 'w-96 h-40 object-contain',
  //       containerClass: 'bg-green-light w-full flex justify-center items-center',
  //       objectFit: 'contain',
  //       width: '700',
  //       height: '250',
  //     };
  //   });
  // };
  // console.log('image', image);

  // const onNav = () => {
  //   router.push(`/restaurant/${data._id}`);
  // };

  return (
    <article
      // onClick={onNav}
      className="flex flex-col h-[300px] rounded-md w-full max-w-lg overflow-hidden shadow-md my-4 cursor-pointer">
      <div className="max-h-[175px] w-full">
        <Image
          className="w-full h-full object-cover"
          src={'tr:di-default-rest-img_lqZlEFwiEbN.png,w-500,h-auto' + generateImgScr(data.image)}
          objectFit="cover"
          width={700}
          height={250}
          alt="restaurant image"
          blurDataURL="../../assets/images/default-rest-img.png"
          placeholder="blur"
        />
      </div>
      <section className="px-3 py-1 flex flex-col">
        <h4 className="m-0 p text-md text-gray-800 font-semibold">{data.shopName}</h4>

        <div className="flex items-start">
          <RestaurantInfoStar
            image={Filled_Star}
            stars={parseFloat(data.rating.toFixed(1))}
            reviwesCount={data.reviewsCount}
          />
          <div className="flex flex-row ml-auto mt-2">
            <div className="flex items-center">
              <Image src={Location_Pin} height="15" width="15" layout="fixed" alt="restaurant location pin" />
              <span className="ml-1 text-xs font-bold text-gray-500 tracking-wide">{`${distance(
                data.location,
                userLocation,
              )} KM`}</span>
            </div>
            <div className="flex items-center ml-2">
              <Image src={TTP} height="17" width="17" layout="fixed" alt="restaurant location pin" />
              <span className="ml-1 text-xs font-bold text-gray-500 tracking-wide">{`${data.ttp} mins`}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">{data.category}</span>
          <span className="mt-1 w-48 text-sm text-right truncate overflow-ellipsis text-gray-500 tranc">
            {data.address}
          </span>
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
        <li className="bg-gray-100 text-xs text-gray-500 font-semibold mr-2 p-1 rounded-lg" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
};

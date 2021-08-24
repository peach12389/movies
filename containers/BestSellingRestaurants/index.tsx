import Image from 'next/image';

import Slider, { LazyLoadTypes } from 'react-slick';

import Meta from '../../components/Meta';
import { RES } from '../../assets/images/icons';
import { useBestSellingStores, useGeoLocation } from '../../hooks';

import RestaurantCard from '../../components/RestaurantCard';

import { Restaurant, GeoLocation } from '../../types';

export default function BestSellingRestaurants() {
  const { data, error, loading, more } = useBestSellingStores();
  const userLocation = useGeoLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Meta title="...loading" />
        ...loading
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Meta title="Oooops" />
        <div>Oooops</div>
        <div>{JSON.stringify(error)}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <BestSellingTitle />
      <RestaurantSlider data={data.getBestSellingStoresCursor.data} userLocation={userLocation} more={more} />
    </div>
  );
}

const BestSellingTitle = () => (
  <div className="flex items-center">
    <div className="w-12 h-12">
      <Image src={RES} height="37.4" width="38.6" layout="responsive" alt="restaurant icon" />
    </div>
    <h5 className="ml-3 text-2xl font-bold"> Best Selling Restaurants</h5>
  </div>
);

type RestaurantSliderProps = {
  data: Restaurant[];
  userLocation: GeoLocation | null;
  more: () => void;
};

const RestaurantSlider = ({ data, userLocation, more }: RestaurantSliderProps) => {
  const settings = {
    infinite: false,
    onEdge: () => {
      more();
    },
    slidesToShow: 4,
    slidesToScroll: 4,
    lazyLoad: 'ondemand' as LazyLoadTypes,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data.map((x: Restaurant) => (
        <div key={x._id} className="px-1">
          <RestaurantCard data={x} userLocation={userLocation} />
        </div>
      ))}
    </Slider>
  );
};

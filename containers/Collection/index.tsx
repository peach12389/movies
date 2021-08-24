import React, { FC, useState } from 'react';
import Slider, { LazyLoadTypes } from 'react-slick';
import CollectionTitle from '../../components/CollectionTitle';
import RestaurantCard from '../../components/RestaurantCard';
import { Restaurant, GeoLocation, PaginatedRestaurants } from '../../types';
import { useLazyQuery } from '@apollo/client';

import { GET_STORES_COLLECTION_ID } from '../../gql/seller/query';

type CollectionProps = {
  name: string;
  description: string;
  userLocation: GeoLocation | null;
  sellers: PaginatedRestaurants;
};

const Collection: FC<CollectionProps> = (props) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [getStoresByCollectionID, { data, loading, error, fetchMore }] = useLazyQuery(GET_STORES_COLLECTION_ID);

  const more = () => {
    console.log('more');
  };
  return (
    <div className="flex flex-col overflow-hidden">
      <CollectionTitle name={props.name} />
      <RestaurantSlider data={props.sellers.data} userLocation={props.userLocation} more={more} />
    </div>
  );
};

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

export default Collection;

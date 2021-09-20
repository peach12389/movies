import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import Meta from '../../components/Meta';
import FSL from '../../components/Loading/fullScreen';
import FetchMore from '../../components/Loading/fetchMore';
import { GET_STORES_BY_DISTANCE } from '../../gql/seller/query';
import { GeoLocation, Restaurant } from '../../types';
import RestaurantCard from '../../components/RestaurantCard';
import CollectionTitle from '../../components/CollectionTitle';
import { useGeoLocation } from '../../hooks';

type StoresNearByProps = {};
const StoresNearBy: FC<StoresNearByProps> = (props) => {
  const userLocation = useGeoLocation();
  const { data, loading, error, fetchMore } = useQuery(GET_STORES_BY_DISTANCE, {
    variables: {
      options: { page: 1, limit: 8 },
      serviceTypes: [],
      location: userLocation ? { longitude: userLocation.longitude, latitude: userLocation.latitude } : null,
    },
  });

  const [isFetchingMore, setIsFetchingMore] = useState(true);

  // useBottomScrollListener(
  //   () => {
  //     setIsFetchingMore(true);
  //     fetchMore({
  //       variables: { options: { page: data.getStoresByUserLocation.nextPage, limit: 8 } },
  //       updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
  //         setIsFetchingMore(false);
  //         return {
  //           getStoresByUserLocation: {
  //             hasNextPage: fetchMoreResult?.getStoresByUserLocation?.hasNextPage,
  //             nextPage: fetchMoreResult?.getStoresByUserLocation?.nextPage,
  //             totalDocs: fetchMoreResult?.getStoresByUserLocation?.totalDocs,
  //             data: [
  //               ...previousResult?.getStoresByUserLocation?.data,
  //               ...fetchMoreResult?.getStoresByUserLocation?.data,
  //             ],
  //           },
  //         };
  //       },
  //     });
  //   },
  //   {
  //     debounce: 100,
  //     debounceOptions: {
  //       leading: false,
  //       trailing: true,
  //       maxWait: 300,
  //     },
  //   },
  // );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Meta title="...loading" />
        <FSL />
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
    <div>
      <CollectionTitle name="Stores Near By" showSeeAll={false} />
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {data?.getStoresByUserLocation?.data.map((restaurant: Restaurant) => {
          return <RestaurantCard key={restaurant._id} data={restaurant} />;
        })}
      </div>
      {isFetchingMore && (
        <div className="flex items-center justify-center py-5 w-full bg-green-light rounded-lg mb-4">
          <FetchMore />
        </div>
      )}
    </div>
  );
};

/*
  data: {,…}
  getStoresByUserLocation: {data: [{_id: "h2jNnBX1IjXQJc8LO2poJ9ou7yp2", shopName: "Lutong Pinoy",…},…], hasNextPage: true,…}
  data: [{_id: "h2jNnBX1IjXQJc8LO2poJ9ou7yp2", shopName: "Lutong Pinoy",…},…]
  hasNextPage: true
  nextPage: 2
  totalDocs: 429*/

export default StoresNearBy;

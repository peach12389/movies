import React, { FC } from 'react';
import { useQuery } from '@apollo/client';

import Collection from '../Collection';
import { PaginatedRestaurants, GeoLocation } from '../../types';
import { GET_COLLECTIONS } from '../../gql/seller/query';
import Meta from '../../components/Meta';

import FSL from '../../components/Loading/fullScreen';

type CollectionsProps = {
  userLocation: GeoLocation;
};
const Collections: FC<CollectionsProps> = (props) => {
  const { data, loading, error } = useQuery(GET_COLLECTIONS);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen my-5">
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
    <>
      {data.getAllCollections.map(
        (collection: { _id: string; description: string; name: string; sellers: PaginatedRestaurants }) => {
          return (
            <Collection
              key={collection._id}
              description={collection.description as string}
              name={collection.name as string}
              userLocation={props.userLocation}
              sellers={collection.sellers as PaginatedRestaurants}
            />
          );
        },
      )}
    </>
  );
};

export default Collections;

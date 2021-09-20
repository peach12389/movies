import React, { FC } from 'react';
import { useQuery } from '@apollo/client';

import Collection from '../Collection';
import { PaginatedRestaurants, GeoLocation } from '../../types';
import { GET_COLLECTIONS } from '../../gql/seller/query';
import Meta from '../../components/Meta';

import FSL from '../../components/Loading/fullScreen';
import { TCollection } from '../../types/collection';

type CollectionsProps = {};

const Collections: FC<CollectionsProps> = () => {
  const { data, loading, error } = useQuery(GET_COLLECTIONS);
  if (loading || error) return null;

  return (
    <>
      {data.getAllCollections.map((collection: TCollection) => {
        return (
          <Collection
            key={collection._id}
            collectionId={collection._id}
            description={collection.description as string}
            name={collection.name as string}
            sellers={collection.sellers as PaginatedRestaurants}
          />
        );
      })}
    </>
  );
};

export default Collections;

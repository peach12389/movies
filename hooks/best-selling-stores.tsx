import { useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';
import { GET_BEST_SELLING_STORES } from '../gql/seller/query';

/*
    Hook that returns best selling stores
*/
const useBestSellingStores = () => {
  const { data, error, loading, fetchMore } = useQuery(GET_BEST_SELLING_STORES, {
    variables: { cursor: null, limit: 10, serviceTypes: [] },
  });

  const currentCursor = useMemo(() => data?.getBestSellingStoresCursor?.nextCursor, [data]);

  const more = useCallback(() => {
    fetchMore({
      variables: {
        cursor: currentCursor,
      },
      updateQuery: (previousResult: any = {}, { fetchMoreResult = {} }: any) => {
        return {
          getBestSellingStoresCursor: {
            next: fetchMoreResult.getBestSellingStoresCursor.next,
            nextCursor: fetchMoreResult.getBestSellingStoresCursor.nextCursor,
            data: [
              ...previousResult.getBestSellingStoresCursor.data,
              ...fetchMoreResult.getBestSellingStoresCursor.data,
            ],
          },
        };
      },
    });
  }, [currentCursor]);

  return { data, error, loading, more };
};

export default useBestSellingStores;

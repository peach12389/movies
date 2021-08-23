import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { Shop } from '../../assets/images/icons';
import FetchMore from '../../components/Loading/fetchMore';
import { GET_SIMILAR_STORE } from '../../gql/seller/query';
import { Restaurant } from '../../types';
import StoreCard from './storeCard';

type TProps = {
  storeID: string;
};

const RestaurantSimilarStores = ({ storeID }: TProps) => {
  const variables = {
    storeId: storeID,
    useTags: true,
    useCategory: true,
    options: { limit: 10, page: 1 },
  };
  const { loading, error, data, fetchMore } = useQuery(GET_SIMILAR_STORE, {
    variables: variables,
  });

  if (loading) {
    return null;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  const hasNextPage: boolean = data.getSimilarStores.hasNextPage;
  const nextPage: number = data.getSimilarStores.nextPage;

  const getMore = async () => {
    if (hasNextPage) {
      const featchMoreVar = variables;
      featchMoreVar.options.page = nextPage;

      await fetchMore({
        variables: featchMoreVar,
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const data = [...prev.getSimilarStores.data, ...fetchMoreResult.getSimilarStores.data];
          const obj = Object.assign({}, prev, {
            getSimilarStores: {
              ...prev.getSimilarStores,
              data,
              nextPage: fetchMoreResult.getSimilarStores.nextPage,
              hasNextPage: fetchMoreResult.getSimilarStores.hasNextPage,
            },
          });

          return obj;
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <Image unoptimized src={Shop} alt="shop icon" height="35" width="35" />
        <span className="mx-3 text-xl font-bold">Similar Restaurants</span>
      </div>
      <ul className="flex overflow-x-scroll">
        {data.getSimilarStores.data.map((x: Restaurant, i: number) => {
          return <StoreCard key={x._id + i} data={x} />;
        })}
        {hasNextPage && (
          <ul>
            <FetchMore fetchMore={getMore} />
          </ul>
        )}
      </ul>
    </div>
  );
};

export default RestaurantSimilarStores;

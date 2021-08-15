import { useQuery } from '@apollo/client';
import { GET_SIMILAR_STORE } from '../../gql/seller/query';

const SimilarRestaurants = ({ data: store }: { data: any }) => {
  const { loading, error, data } = useQuery(GET_SIMILAR_STORE, {
    variables: {
      storeId: store._id,
      useTags: true,
      useCategory: true,
      options: { limit: 10, page: 1 },
    },
  });
  console.log(data);

  if (loading) {
    return <p>...loading</p>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div className="flex flex-col">
      {data.getSimilarStores.data.map((x: any) => {
        return <span key={x._id}>{x.shopName}</span>;
      })}
    </div>
  );
};

export default SimilarRestaurants;

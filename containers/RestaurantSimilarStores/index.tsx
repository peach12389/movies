import { Suspense } from 'react';
import dynamic from 'next/dynamic';

function loading() {
  return <div />;
}

const List = dynamic(() => import('./list'), {
  loading: loading,
});

type TProps = {
  storeID: string;
};

const RestaurantSimilarStores = ({ storeID }: TProps) => {
  return (
    <Suspense fallback={null}>
      <List storeID={storeID} />
    </Suspense>
  );
};

export default RestaurantSimilarStores;

import RestaurantCard from '../../components/RestaurantCard';
import { Restaurant } from '../../types';

type TProps = {
  data: Restaurant;
};

const StoreCard = ({ data }: TProps) => {
  return (
    <div className="flex-1">
      <RestaurantCard data={data} userLocation={null} />
    </div>
  );
};

export default StoreCard;

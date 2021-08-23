import RestaurantAddress from './address';
import RestaurantDetails from './details';
import RestaurantReviewTags from './reviewtags';
import SimilarRestaurants from '../RestaurantSimilarStores';
import { RWebShare } from 'react-web-share';
type TProps = {
  data: Record<string, any>;
};
const Example = ({ data }: TProps) => {
  return (
    <div>
      <RWebShare
        data={{
          text: `Checkout ${data.storeName}`,
          url: `http://katchkw.com/restaurant/${data._id}`,
          title: 'Flamingos',
        }}
        onClick={() => console.log('shared successfully!')}>
        <button>Share 🔗</button>
      </RWebShare>
    </div>
  );
};

export const RestaurantOverView = ({ data }: TProps) => {
  return (
    <div className="pt-4">
      {/* <Example data={`${data}`} /> */}
      <RestaurantReviewTags data={data} />
      <div className="flex flex-col md:flex-row">
        <RestaurantDetails data={data} />
        <RestaurantAddress data={data} />
      </div>
      <SimilarRestaurants storeID={data._id} />
    </div>
  );
};

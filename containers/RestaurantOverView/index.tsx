import RestaurantAddress from "./address";
import RestaurantDetails from "./details";
import Map from "./map";
import RestaurantReviewTags from "./reviewtags";

type TProps = {
  data: Record<string, any>;
};

export const RestaurantOverView = ({ data }: TProps) => {
  const location = data.location;

  return (
    <div>
      <RestaurantAddress data={data} />
      <Map
        center={{
          lat: location.latitude,
          lng: location.longitude,
        }}
      />
      <RestaurantReviewTags data={data} />
      <RestaurantDetails data={data} />
    </div>
  );
};

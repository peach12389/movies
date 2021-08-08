type TProps = {
  data: Record<string, any>;
};

const RestaurantReviewTags = ({ data }: TProps) => {
  const tags: string[] = data.userCustomTags;

  return tags && tags.length > 0 ? (
    <div className="px-5 py-2 mb-2 bg-green-light border border-gray-200">
      <p className="font-bold">Review Highlights</p>
      <p className="mb-2 text-sm">People say this place is known for</p>
      <div className="flex flex-wrap">
        {tags.map((x) => {
          return (
            <span key={x} className="text-sm mr-3 border rounded-full px-3 py-0.5 mb-3 bg-white">
              {x}
            </span>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default RestaurantReviewTags;

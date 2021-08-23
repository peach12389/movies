import { Fragment } from 'react';

type TProps = {
  data: Record<string, any>;
};

const RestaurantDetails = ({ data }: TProps) => {
  const categories = data.category;
  const estimatedCost = data.estimatedCost;
  const paymentMethods = data.paymentMethods;
  const tags: string[] = data.tags;

  const renderTags = () => {
    if (tags && tags.length > 0) {
      return (
        <Fragment>
          <p className="text-sm text-gray-400 mt-4 mb-2">OTHER TAGS</p>
          <div className="flex flex-wrap">
            {tags.map((x) => {
              return (
                <span key={x} className="text-sm mr-3 border rounded-full px-3 py-0.5 mb-3">
                  {x}
                </span>
              );
            })}
          </div>
        </Fragment>
      );
    } else {
      return null;
    }
  };

  const renderPaymentMethods = () => {
    let text = null;

    if (paymentMethods && paymentMethods.length > 0) {
      text = paymentMethods.length > 1 ? 'Cash and Card accepted' : 'Cash accepted only';
    }

    return text ? <p className="text-sm mt-px">{text}</p> : null;
  };

  return (
    <div className="flex-[2]">
      <p className="font-bold">DETAILS</p>
      <p className="text-sm text-gray-400 mt-px">CUISINES</p>
      <p className="text-sm text-brand-green mt-px">{categories}</p>
      {estimatedCost ? (
        <Fragment>
          <p className="text-sm text-gray-400 mt-4">AVERAGE COST</p>

          <p className="text-sm  mt-px">
            {estimatedCost.cost} KD for {estimatedCost.customerInteger} people (approx).
          </p>
          <p className="text-sm text-gray-400 mt-px">Exclusive of applicable taxes and charges, if any</p>
        </Fragment>
      ) : null}
      {renderPaymentMethods()}
      {renderTags()}
    </div>
  );
};

export default RestaurantDetails;

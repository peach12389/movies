import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { RestaurantLayout } from "../../layouts/restaurant";

export const GET_STORE = gql`
  query GetStore($id: String) {
    getStore(id: $id) {
      _id
      shopName
      tags
      userCustomTags
      address
      rating
      restaurantRating
      category
      logo
      image
      phone
      ttp
      isOpen
      reviewsCount
      restaurantReviewsCount
      paymentMethods
      services
      estimatedCost {
        cost
        customerInteger
      }
      deliveryServices {
        name
        icon
        url
        label
        value
      }
      deliveryRadius {
        _id
        radiusKm
        customerDeliveryCharge
        vendorDeliveryCharge
      }
      mashkorMaxRadius
      minDeliveryOrderValue
      location {
        _id
        longitude
        latitude
      }
      storeHours {
        opening
        closing
      }
      socialMedia {
        facebook
        instagram
        twitter
        snapchat
      }
      socialId
      deliveryETA {
        min
        max
      }
      comingSoon
      products {
        _id
        shopName
        products {
          _id
          category
          image
          name
          tags
          price
          description
          options {
            _id
            category
            maxSelect
            minSelect
            optionsList {
              _id
              name
              price
            }
          }
        }
      }
    }
  }
`;

export default function Restaurant({}: AppProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_STORE, {
    variables: { id: router.query.id },
  });
  if (loading) {
    return <div>...loading</div>;
  }

  if (error) {
    return (
      <div>
        <div>Oooops</div>
        <div>{JSON.stringify(error)}</div>
      </div>
    );
  }
  return <RestaurantLayout data={data.getStore}></RestaurantLayout>;
}

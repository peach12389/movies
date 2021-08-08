import Meta from "../../components/Meta";
import { RestaurantLayout } from "../../layouts/restaurant";
import { RestaurantOverView } from "../../containers/RestaurantOverView";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const GET_STORE = `
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

const useGetSeller = (id: string) => {
  const initObj: {
    data: Record<any, any>;
    loading: boolean;
    error: any | null;
  } = {
    data: Object(),
    loading: true,
    error: null,
  };
  const [store, setStore] = useState(initObj);

  useEffect(() => {
    fetch("https://api.katchkw.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_STORE,
        variables: { id: id },
      }),
    })
      .then((res) => res.json())
      .then((result) =>
        setStore((state) => {
          console.log(result);
          return { ...state, data: result.data, loading: false };
        }),
      )
      .catch((err) => setStore({ ...store, loading: false, error: JSON.stringify(err) }));
  }, []);

  return store;
};

export default function Restaurant({ query }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, loading, error } = useGetSeller(query.id as string);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Meta title="...loading" />
        ...loading
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Meta title="Oooops" />
        <div>Oooops</div>
        <div>{JSON.stringify(error)}</div>
      </div>
    );
  }
  return (
    <RestaurantLayout data={data?.getStore}>
      <RestaurantOverView data={data?.getStore} />
    </RestaurantLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;
  return {
    props: { query: { id } },
  };
};

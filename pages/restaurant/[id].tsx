// import { gql, useQuery } from "@apollo/client/";
import Meta from "../../components/Meta";
import { RestaurantLayout } from "../../layouts/restaurant";
import { RestaurantOverView } from "../../containers/RestaurantOverView";
import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GET_STORE } from "../../gql/seller/query";

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

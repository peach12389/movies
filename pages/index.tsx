import { useQuery } from "@apollo/client";
import Link from "next/link";
import Meta from "../components/Meta";
import { GET_BEST_SELLING_STORES } from "../gql/seller/query";

export default function Home() {
  const { data, error, loading } = useQuery(GET_BEST_SELLING_STORES, {
    variables: { cursor: null, limit: 20, serviceTypes: [] },
  });
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
    <div>
      <Meta title="Home" />
      <ul>
        {data.getBestSellingStoresCursor.data.map((x: Record<any, any>) => (
          <li key={x._id}>
            <Link href={`/restaurant/${x._id}`}>
              <a>{x.shopName}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

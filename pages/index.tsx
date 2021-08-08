import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Meta from "../components/Meta";

export const GET_BEST_SELLING_STORES = gql`
  query GetBestSellingStoresCursor($cursor: String, $limit: Int) {
    getBestSellingStoresCursor(cursor: $cursor, limit: $limit) {
      data {
        _id
        shopName
        address
        rating
        reviewsCount
        category
        isOpen
        image
        tags
        ttp
        location {
          longitude
          latitude
        }
        comingSoon
        promoCodes {
          _id
          type {
            name
            value
          }
        }
      }
      next
      nextCursor
    }
  }
`;

export const GET_SIMILAR_STORE = gql`
  query getSimilarStores($storeId: String!, $useTags: Boolean, $useCategory: Boolean, $options: PaginationOptions) {
    getSimilarStores(storeId: $storeId, useTags: $useTags, useCategory: $useCategory, options: $options) {
      data {
        shopName

        _id
        address
        rating
        reviewsCount
        category
        isOpen
        image
        tags
        ttp
        location {
          longitude
          latitude
        }
        comingSoon
        promoCodes {
          _id
          type {
            name
            value
          }
        }
      }
      nextPage
      hasNextPage
    }
  }
`;

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

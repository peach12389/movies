import React, { FC, useEffect, useState } from 'react';
import CollectionTitle from '../../components/CollectionTitle';
import RestaurantCard from '../../components/RestaurantCard';
import { Restaurant, PaginatedRestaurants } from '../../types';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import FetchMore from '../../components/Loading/fetchMore';
import { useLazyQuery } from '@apollo/client';
import { GET_STORES_COLLECTION_ID } from '../../gql/seller/query';

type CollectionProps = {
  name: string;
  description: string;
  sellers: PaginatedRestaurants;
  collectionId: String;
};

const Collection: FC<CollectionProps> = (props) => {
  const { collectionId, sellers, name } = props;
  return (
    <div className="flex flex-col">
      <CollectionTitle name={name} />
      <RestaurantSlider name={name} seller={sellers} collectionId={collectionId} />
    </div>
  );
};

type RestaurantSliderProps = {
  seller: PaginatedRestaurants;
  name: string;
  collectionId: String;
};

const RestaurantSlider: FC<RestaurantSliderProps> = (props) => {
  const { seller, name, collectionId } = props;
  const [collection, setCollection] = useState(seller);
  const [hidden, setHidden] = useState(false);

  const [getStoresByCollectionID] = useLazyQuery(GET_STORES_COLLECTION_ID, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: (query) => {
      const { getStoresByCollectionID } = query;

      setCollection((stores) => {
        return {
          next: getStoresByCollectionID.next,
          nextCursor: getStoresByCollectionID.nextCursor,
          data: [...(stores?.data ? [...stores.data] : []), ...getStoresByCollectionID.data],
        };
      });
    },
  });

  const onLeft = () => {
    const list = document.getElementById(`${name}-list`);
    const wWidth = window.innerWidth;

    if (list) {
      list.scrollTop;
      list.scrollTo({
        left: list.scrollLeft - wWidth,
        behavior: 'smooth',
      });
    }
  };

  const onRight = () => {
    const list = document.getElementById(`${name}-list`);
    const wWidth = window.innerWidth;

    if (list) {
      list.scrollTo({
        left: list.scrollLeft + wWidth,
        behavior: 'smooth',
      });
    }
  };

  const fetchMore = () => {
    getStoresByCollectionID({
      variables: {
        limit: 5,
        cursor: collection.nextCursor,
        collectionID: collectionId,
      },
    });
  };

  const onResize = () => {
    const list = document.getElementById(`${name}-list`);
    const wWidth = window.innerWidth;

    if (list) {
      if (list.scrollWidth > wWidth) {
        setHidden(false);
      } else {
        true;
        setHidden(true);
      }
    }
  };
  useEffect(() => {
    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [collection]);

  return (
    <div id={`${name}-list-container`} className="relative flex items-center">
      <SliderButton onClick={onLeft} hidden={hidden} />

      <ul id={`${name}-list`} className="py-2 flex w-screen overflow-scroll">
        {collection.data.map((x: Restaurant) => (
          <li key={x._id} className="px-3">
            <RestaurantCard data={x} />
          </li>
        ))}
        {collection.next ? (
          <li className="mr-16 pb-2">
            <FetchMore fetchMore={fetchMore} />
          </li>
        ) : null}
      </ul>
      <SliderButton isRight={true} onClick={onRight} hidden={hidden} />
    </div>
  );
};

type SliderButtonProps = {
  isRight?: boolean;
  onClick: Function;
  hidden: boolean;
};

const SliderButton: FC<SliderButtonProps> = (props) => {
  const { onClick, isRight = false, hidden } = props;

  const Icon = isRight ? HiOutlineChevronRight : HiOutlineChevronLeft;

  return hidden ? null : (
    <button
      onClick={() => onClick()}
      className={`hidden sm:block list-button z-[1] absolute ${
        isRight ? 'right-0' : 'left-0'
      } bg-black bg-opacity-50 p-3`}>
      <Icon size={30} color="white" />
    </button>
  );
};

export default Collection;

import React, { FC } from 'react';
import Image from 'next/image';
import { RES } from '../../assets/images/icons';

type CollectionTitleProps = {
  name: string;
  showSeeAll?: boolean;
};

const CollectionTitle: FC<CollectionTitleProps> = ({ name, showSeeAll = true }) => (
  <div className="flex items-center px-5">
    <span className="w-10 h-10">
      <Image src={RES} height="20" width="20" layout="responsive" alt="restaurant icon" />
    </span>
    <h5 className="ml-3 text-lg font-bold flex-1">{name}</h5>
    {showSeeAll && (
      <a href="#" className="text-brand-red font-semibold leading-3">
        See all &gt;&gt;
      </a>
    )}
  </div>
);

export default CollectionTitle;

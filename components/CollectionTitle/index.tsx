import React, { FC } from 'react';
import Image from 'next/image';
import { RES } from '../../assets/images/icons';

type CollectionTitleProps = {
  name: string;
  showSeeAll?: boolean;
};

const CollectionTitle: FC<CollectionTitleProps> = ({ name, showSeeAll = true }) => (
  <div className="flex items-center">
    <div className="w-12 h-12">
      <Image src={RES} height="37.4" width="38.6" layout="responsive" alt="restaurant icon" />
    </div>
    <h5 className="ml-3 text-2xl font-bold flex-1">{name}</h5>
    {showSeeAll && (
      <a href="#" className="text-brand-red font-semibold leading-3">
        See all &gt;&gt;
      </a>
    )}
  </div>
);

export default CollectionTitle;

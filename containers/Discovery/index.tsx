import Collections from './Collections';
import StoresNearBy from './StoresNearBy';
import { Fragment } from 'react';
import FSL from '../../components/Loading/fullScreen';

export default function Discovery() {
  return (
    <Fragment>
      <Collections />
      <StoresNearBy />
      {/* <div className="flex-grow flex justify-center items-center h-full">
        <FSL />
      </div> */}
    </Fragment>
  );
}

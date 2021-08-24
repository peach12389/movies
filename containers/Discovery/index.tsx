import Collections from './Collections';
import StoresNearBy from './StoresNearBy';

import { useGeoLocation } from '../../hooks';

export default function Discovery() {
  const userLocation = useGeoLocation();
  return (
    <div>
      {userLocation && (
        <>
          <Collections userLocation={userLocation} />
          <StoresNearBy userLocation={userLocation} />
        </>
      )}
    </div>
  );
}

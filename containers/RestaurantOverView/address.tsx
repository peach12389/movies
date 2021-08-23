import Image from 'next/image';
import { Copy_Location, Get_Directions } from '../../assets/svg';
import Map from './map';

type TProps = {
  data: Record<string, any>;
};

const RestaurantAddress = ({ data }: TProps) => {
  const address = data.address;
  const storeName = data.shopName;
  const location = data.location;
  const urlSchema = (): string => {
    const { latitude, longitude } = location;
    const scheme = 'http://maps.google.com/maps?q=';
    const latLng = `${latitude},${longitude}`;
    const label = storeName;
    const url = `${scheme}${latLng}+(${label})`;
    return url;
  };
  const onGetLocation = () => {
    const url = urlSchema();
    window.open(url, '_blank');
  };

  const onCopyLocation = () => {
    const url = urlSchema();

    navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex-[1] min-w-[400px] sticky top-[400px]">
      <p className="font-bold">ADDRESS</p>
      <p className="text-sm text-gray-400 mt-3">{address}</p>
      <div className="flex items-center mt-3">
        <span className="cursor-pointer mr-5 flex items-center" onClick={onCopyLocation}>
          <Image src={Copy_Location} alt="copy svg" unoptimized={true} height={20} width={20} />
          <span className="ml-2 text-brand-green">COPY LOCATION</span>
        </span>
        <span />
        <span className="cursor-pointer mr-5 flex items-center" onClick={onGetLocation}>
          <Image src={Get_Directions} alt="copy svg" unoptimized={true} height={20} width={20} />
          <span className="ml-2 text-brand-green">GET DRIECTION</span>
        </span>
      </div>
      <Map
        center={{
          lat: location.latitude,
          lng: location.longitude,
        }}
      />
    </div>
  );
};

export default RestaurantAddress;

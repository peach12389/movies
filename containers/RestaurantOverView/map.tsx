import GoogleMapReact from 'google-map-react';

type TMarkerProp = {
  lat: number;
  lng: number;
};

const Marker = ({}: TMarkerProp) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '40px',
      height: '40px',
      marginTop: -20,
      transform: 'translate(-50%, -50%)',
    }}>
    <img height="100%" width="100%" src="http://localhost:4000/assets/images/icons/map-pin.png" alt="" />
  </div>
);

type TProps = {
  center: TMarkerProp;
  zoom: number;
};

const Map = ({ center, zoom }: TProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;
  return (
    <div className="w-full h-48 py-2">
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
        center={center}
        yesIWantToUseGoogleMapApiInternals>
        <Marker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  zoom: 11,
};

export default Map;

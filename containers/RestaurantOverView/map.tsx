import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";

type TMarkerProp = {
  lat: number;
  lng: number;
};

type TProps = {
  center: TMarkerProp;
  zoom: number;
};

const GMap = withScriptjs(
  withGoogleMap(({ center, zoom }: TProps) => {
    return (
      <GoogleMap
        defaultOptions={{ streetViewControl: false, fullscreenControl: false, mapTypeControl: false }}
        defaultZoom={zoom}
        defaultCenter={center}>
        <Marker position={center} />
      </GoogleMap>
    );
  }),
);

const Map = ({ center, zoom }: TProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;
  const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  return (
    <GMap
      loadingElement={<div className="w-screen sm:w-auto my-5 h-72" />}
      googleMapURL={googleMapUrl}
      containerElement={<div className="w-screen sm:w-auto my-5 h-72" />}
      mapElement={<div className="h-full" />}
      center={center}
      zoom={zoom}
    />
  );
};

Map.defaultProps = {
  zoom: 11,
};

export default Map;

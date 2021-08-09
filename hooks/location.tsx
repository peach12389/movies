import { useState, useEffect } from "react";
import { GeoLocation } from "../types";

/*
    Hook that returns the user's current location
    null if there is not permission
*/
const useGeoLocation = (): GeoLocation | null => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  }, []);
  return location;
};

export default useGeoLocation;

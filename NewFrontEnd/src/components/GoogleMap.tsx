import React, { useEffect, useState } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { mapIcons } from '../assets/icons/all';

const MapPin: React.FC<Coords> = () => <mapIcons.mapPin />;

interface PathProps {
  address: string;
}

const GoogleMap: React.FC<PathProps> = ({ address }) => {
  const [center, setCenter] = useState<Coords>({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    // Mounted is needed for React (not always necessary). You can only update a component's
    // state when it is mounted -- we potentially set the state after it is already unmounted
    // because of the async calls. Thus, we need to check if it is mounted before updating the state
    let mounted = true;

    // function that gets and sets the map pin
    const setMapPin = async () => {
      const code = await geocodeByAddress(address);
      const location = await getLatLng(code[0]);
      if (mounted) setCenter(location);
    };
    setMapPin();

    return () => {
      mounted = false;
    };
  }, [address, setCenter]);

  return (
    <div className="google-map-wrapper">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDP7ZDv6xGzfVe7y7Sgb3MsYMqCVLNljeY' }} // TODO put key in an .env
        center={center}
        defaultZoom={zoom}
      >
        <MapPin lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;

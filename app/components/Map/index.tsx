import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import { MapProps } from '@/app/types';

const Map = ({ combinedData, zoom = 4.2 }: MapProps) => {
  // Component to update the map view based on the combined data
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (typeof window !== 'undefined') {
        map.invalidateSize();
        if (combinedData?.length) {
          const bounds = L.latLngBounds(
            combinedData.map(({ latitude, longitude }) => [
              latitude,
              longitude,
            ]),
          );
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: zoom });
        } else {
          map.setView([15, -90], zoom);
        }
      }
    }, [combinedData, zoom, map]);
    return null;
  };

  // Custom icon for the map markers
  const customIcon = L.icon({
    iconUrl: '/pin.png',
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="xs:w-full md:w-[60%] h-[300px]">
      {typeof window !== 'undefined' && (
        <MapContainer
          center={[15, -90]}
          zoom={zoom}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {combinedData?.map(
            (data, index) =>
              data.latitude !== undefined &&
              data.longitude !== undefined && (
                <Marker
                  key={index}
                  position={[data.latitude, data.longitude]}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="flex flex-col text-center text-[0.65rem] font-poppins">
                      <span>{`${data.name} ${data.emoji}`}</span>
                      <span>
                        <span className="font-bold mr-0.5">Capital:</span>{' '}
                        {data.capital}
                      </span>
                      <span>
                        <span className="font-bold mr-0.5">Currency:</span>{' '}
                        {data.currency}
                      </span>
                      <span>
                        <span className="font-bold mr-0.5">Region:</span>{' '}
                        {data.continent?.name}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ),
          )}
          <MapUpdater />
        </MapContainer>
      )}
    </div>
  );
};

export default Map;

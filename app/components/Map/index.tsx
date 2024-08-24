import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type CombinedDataProps = {
  name: string;
  code: string;
  capital: string;
  emoji: string;
  currency: string;
  continent: { name: string };
  languages: { name: string }[];
  latitude: number;
  longitude: number;
};

type MapProps = {
  combinedData?: CombinedDataProps | null;
  zoom?: number;
};

const Map = ({ combinedData, zoom = 3 }: MapProps) => {
  const {
    name,
    capital,
    emoji,
    currency,
    continent,
    latitude = 0,
    longitude = 0,
  } = combinedData || {};

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (typeof window !== 'undefined') {
        map.invalidateSize();
        if (combinedData) {
          map.setView([latitude, longitude], zoom);
        } else {
          map.setView([15, -90], zoom);
        }
      }
    }, [combinedData, zoom, map]);
    return null;
  };

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
          center={[latitude || 15, longitude || -90]}
          zoom={zoom}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {combinedData && (
            <Marker position={[latitude, longitude]} icon={customIcon}>
              <Popup>
                <div className="flex flex-col text-center text-[0.65rem] font-poppins">
                  <span>{`${name} ${emoji}`}</span>
                  <span>
                    <span className="font-bold mr-0.5">Capital:</span> {capital}
                  </span>
                  <span>
                    <span className="font-bold mr-0.5">Currency:</span>
                    {currency}
                  </span>
                  <span>
                    <span className="font-bold mr-0.5">Region:</span>
                    {continent?.name}
                  </span>
                </div>
              </Popup>
            </Marker>
          )}
          <MapUpdater />
        </MapContainer>
      )}
    </div>
  );
};

export default Map;

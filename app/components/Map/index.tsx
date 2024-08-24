import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type MarkerProps = {
  latitude: number;
  longitude: number;
  name: string;
};

type MapProps = {
  markers?: MarkerProps[];
  zoom?: number;
  latitude?: number;
  longitude?: number;
  countryName?: string;
};

const Map = ({ markers = [], zoom = 3, latitude, longitude, countryName }: MapProps) => {
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (typeof window !== 'undefined') {
        map.invalidateSize();
        if (markers.length > 0) {
          const bounds = L.latLngBounds(markers.map(({ latitude, longitude }) => [latitude, longitude]));
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 4 });
        } else if (latitude && longitude) {
          map.setView([latitude, longitude], zoom);
        } else {
          map.setView([15, -90], zoom);
        }
      }
    }, [markers, zoom, map, latitude, longitude]);
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
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map(({ latitude, longitude, name }, index) => (
            <Marker key={index} position={[latitude, longitude]} icon={customIcon}>
              <Popup>
                <div className="flex flex-col text-center">
                  <span>{name}</span>
                  <span>{`${latitude}, ${longitude}`}</span>
                </div>
              </Popup>
            </Marker>
          ))}
          <MapUpdater />
        </MapContainer>
      )}
    </div>
  );
};

export default Map;

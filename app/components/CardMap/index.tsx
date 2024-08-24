import dynamic from 'next/dynamic';
import { CardMapProps } from '@/app/interfaces';

const DynamicMap = dynamic(() => import('@/app/components/Map'), { ssr: false });

const CardMap = ({ data }: CardMapProps) => {
  const {
    name,
    code,
    capital,
    emoji,
    currency,
    languages,
    latitude,
    longitude,
  } = data;

  const markers = latitude && longitude ? [{ latitude, longitude, name }] : [];

  return (
    <div className="grid xs:grid-cols-1 md:grid-cols-2 gap-7 mt-4 xs:w-full lg:w-[600px] rounded border-2 border-primary ">
      <div className="flex flex-col p-[1rem]">
        <h2>Country Information:</h2>
        <ul>
          <li>
            <strong>Name:</strong> {name}
          </li>
          <li>
            <strong>Code:</strong> {code}
          </li>
          <li>
            <strong>Capital:</strong> {capital}
          </li>
          <li>
            <strong>Flag:</strong> {emoji}
          </li>
          <li>
            <strong>Currency:</strong> {currency}
          </li>
          <li>
            <strong>Languages:</strong>
            <ul>
              {languages.map((language) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {markers.length > 0 && (
        <DynamicMap markers={markers} />
      )}
    </div>
  );
};

export default CardMap;

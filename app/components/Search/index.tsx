import { useState, useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';

import client from '@/app/apollo-client';
import { GET_COUNTRY } from '@/app/graphql/queries/getCountry';

import Input from '@/app/components/UI/Form/Input';
import Button from '@/app/components/UI/Button';
const DynamicMap = dynamic(() => import('@/app/components/Map'), { ssr: false });

import countries from '@/app/common/countries.json';
import debounce from '@/app/utils/debounce';
import { CountryProps, CountryDataProps } from '@/app/interfaces';
import dynamic from 'next/dynamic';

const Search = () => {
  const [query, setQuery] = useState<string>('');
  const [combinedData, setCombinedData] = useState<CountryProps | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [getCountry, { data, loading, error }] = useLazyQuery(GET_COUNTRY, {
    client,
  });

  const handleSearch = useCallback(
    debounce((query) => {
      getCountry({ variables: { name: query, code: query, continent: query } });
      setSearchPerformed(true);
    }, 600),
    [],
  );

  useEffect(() => {
    if (!data) {
      setCombinedData(null);
      return;
    }

    const { countriesByName, countriesByCode, countriesByContinent } = data;
    const countryData =
      countriesByName?.[0] || countriesByCode?.[0] || countriesByContinent?.[0];

    if (!countryData) {
      setCombinedData(null);
      return;
    }

    const country = countries.find(
      (c: CountryDataProps) =>
        c.Country?.toLowerCase() === countryData.name?.toLowerCase() ||
        c['ISO Code']?.toLowerCase() === countryData.code?.toLowerCase() ||
        (typeof countryData.continent === 'string' && c.Region?.toLowerCase().includes(countryData.continent?.toLowerCase())),
    );

    setCombinedData(
      country
        ? {
          ...countryData,
          latitude: country.Latitude,
          longitude: country.Longitude,
        }
        : null,
    );
  }, [data]);

  const handleClear = () => {
    setQuery('');
    setCombinedData(null);
    setSearchPerformed(false);
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="mb-4">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search..."
        />
        <Button onClick={handleClear} content="Clear" />
      </div>
      <DynamicMap combinedData={combinedData} />
      {!combinedData && !loading && searchPerformed && (
        <p className="text-[0.8rem] mt-[2rem]">No data found for the search query.</p>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Search;

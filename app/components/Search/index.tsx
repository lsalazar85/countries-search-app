import { useState, useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import client from '@/app/apollo-client';
import dynamic from 'next/dynamic';

import { GET_COUNTRY } from '@/app/graphql/queries/getCountry';
import { GET_COUNTRIES_BY_REGION } from '@/app/graphql/queries/getCountryByRegion';

import Input from '@/app/components/UI/Form/Input';
import Button from '@/app/components/UI/Button';

const DynamicMap = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
});

import countries from '@/app/common/countries.json';
import debounce from '@/app/utils/debounce';

import { CountryProps, CountryDataProps } from '@/app/interfaces';

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [combinedData, setCombinedData] = useState<CountryProps[] | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [lastSearchType, setLastSearchType] = useState<'region' | 'country' | null>(null);

  const [getCountry, { data, loading, error }] = useLazyQuery(GET_COUNTRY, {
    client,
  });

  const [getCountriesByRegion, { data: regionData }] = useLazyQuery(
    GET_COUNTRIES_BY_REGION,
    {
      client,
    },
  );

  const handleSearch = useCallback(
    debounce((query: string) => {
      if (query.length === 2 && (query === 'SA' || query === 'NA')) {
        getCountriesByRegion({ variables: { continentCode: query } });
        setLastSearchType('region');
      } else {
        getCountry({ variables: { name: query, code: query } });
        setLastSearchType('country');
      }
      setSearchPerformed(true);
    }, 600),
    [],
  );

  useEffect(() => {
    const fetchCountryDetails = async (countryCode: string) => {
      const { data } = await getCountry({ variables: { code: countryCode } });
      return data?.countriesByCode?.[0] || null;
    };

    const fetchRegionCountries = async () => {
      if (regionData && lastSearchType === 'region') {
        const { continent } = regionData;
        const countriesByRegion = continent?.countries || [];

        const detailedCountries = await Promise.all(
          countriesByRegion.map(async (country: { code: string }) => {
            const countryDetails = await fetchCountryDetails(country.code);
            const countryInfo = countries.find(
              (c: CountryDataProps) =>
                c['ISO Code']?.toLowerCase() === country.code?.toLowerCase(),
            );
            return countryDetails && countryInfo
              ? {
                ...countryDetails,
                latitude: countryInfo.Latitude,
                longitude: countryInfo.Longitude,
              }
              : null;
          }),
        );

        setCombinedData(detailedCountries.filter(Boolean) as CountryProps[]);
      } else if (data && lastSearchType === 'country') {
        const { countriesByName, countriesByCode } = data;
        const countryData = countriesByName?.[0] || countriesByCode?.[0];

        if (!countryData) {
          setCombinedData(null);
          return;
        }

        const country = countries.find(
          (c: CountryDataProps) =>
            c.Country?.toLowerCase() === countryData.name?.toLowerCase() ||
            c['ISO Code']?.toLowerCase() === countryData.code?.toLowerCase(),
        );

        setCombinedData(
          country
            ? [
              {
                ...countryData,
                latitude: country.Latitude,
                longitude: country.Longitude,
              },
            ]
            : null,
        );
      }
    };

    fetchRegionCountries();
  }, [regionData, data, lastSearchType]);

  const handleClear = () => {
    setQuery('');
    setCombinedData(null);
    setSearchPerformed(false);
    setLastSearchType(null);
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

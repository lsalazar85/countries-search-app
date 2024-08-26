import { useState, useEffect, useCallback } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

import Input from '@/app/components/UI/Form/Input';
import Button from '@/app/components/UI/Button';

const DynamicMap = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
});

import countries from '@/app/common/countries.json';
import debounce from '@/app/utils/debounce';
import { capitalizeFirstLetter } from '@/app/utils/capitalizeFirstLetter';

import { useGetCountry, useGetCountriesByRegion } from '@/app/graphql/hooks';

import { CountryProps } from '@/app/interfaces';

const Search = () => {
  const [query, setQuery] = useState<string>('');
  const [combinedData, setCombinedData] = useState<CountryProps[] | null>(null);
  const [lastSearchType, setLastSearchType] = useState<
    'region' | 'country' | null
  >(null);

  const [getCountry, { data, error }] = useGetCountry();
  const [getCountriesByRegion, { data: regionData }] =
    useGetCountriesByRegion();

  const handleSearch = useCallback(
    debounce((query: string) => {
      // Check if the query is a region code (SA or NA)
      const isRegion = query.length === 2 && (query === 'SA' || query === 'NA');
      if (isRegion) {
        getCountriesByRegion({ variables: { continentCode: query } });
        setLastSearchType('region');
      } else {
        getCountry({ variables: { name: query, code: query } });
        setLastSearchType('country');
      }
    }, 600),
    [],
  );

  useEffect(() => {
    // Fetch country details
    const fetchCountryDetails = async (countryCode: string) => {
      try {
        const { data } = await getCountry({ variables: { code: countryCode } });
        return data?.countriesByCode?.[0] || null;
      } catch {
        toast.error('Failed to fetch country details');
        return null;
      }
    };

    // Fetch region countries
    const fetchRegionCountries = async () => {
      try {
        if (regionData && lastSearchType === 'region') {
          const countriesByRegion = regionData.continent?.countries || [];

          const detailedCountries = await Promise.all(
            countriesByRegion.map(async ({ code }: { code: string }) => {
              const countryDetails = await fetchCountryDetails(code);
              const countryInfo = countries.find(
                (c) => c['ISO Code']?.toLowerCase() === code?.toLowerCase(),
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
          const countryData =
            data.countriesByName?.[0] || data.countriesByCode?.[0];

          if (!countryData) {
            setCombinedData(null);
            toast.error('No data found for the search query.');
            return;
          }

          const country = countries.find(
            (c) =>
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
      } catch {
        toast.error('Failed to fetch region countries');
      }
    };

    fetchRegionCountries();
  }, [regionData, data, lastSearchType]);

  // Error handling
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [error]);

  // Clear search
  const handleClear = () => {
    setQuery('');
    setCombinedData(null);
    setLastSearchType(null);
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      <div className="mb-4">
        <Input
          value={query}
          onChange={(e) => {
            const capitalizedQuery = capitalizeFirstLetter(e.target.value);
            setQuery(capitalizedQuery);
            handleSearch(capitalizedQuery);
          }}
          placeholder="Search..."
        />
        <Button onClick={handleClear} content="Clear" />
      </div>
      <DynamicMap combinedData={combinedData} />
      <Toaster />
    </div>
  );
};

export default Search;

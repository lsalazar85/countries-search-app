import { useLazyQuery } from '@apollo/client';
import { GET_COUNTRY } from '@/app/graphql/queries/getCountry';
import { GET_COUNTRIES_BY_REGION } from '@/app/graphql/queries/getCountryByRegion';
import client from '@/app/graphql/apollo-client';

export const useGetCountry = () => {
  return useLazyQuery(GET_COUNTRY, { client });
};

export const useGetCountriesByRegion = () => {
  return useLazyQuery(GET_COUNTRIES_BY_REGION, { client });
};

import { gql } from '@apollo/client';
import { COUNTRY_FIELDS } from '../fragments/countryFields';

export const GET_COUNTRY = gql`
  query GetCountry($name: String, $code: String) {
    countriesByName: countries(filter: { name: { eq: $name } }) {
      ...CountryFields
    }
    countriesByCode: countries(filter: { code: { eq: $code } }) {
      ...CountryFields
    }
  }
  ${COUNTRY_FIELDS}
`;

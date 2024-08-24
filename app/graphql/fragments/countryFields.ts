import { gql } from '@apollo/client';

export const COUNTRY_FIELDS = gql`
  fragment CountryFields on Country {
    code
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
`;

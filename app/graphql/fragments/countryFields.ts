import { gql } from '@apollo/client';

export const COUNTRY_FIELDS = gql`
  fragment CountryFields on Country {
    code
    name
    native
    capital
    emoji
    continent {
      name
    }
    currency
    languages {
      code
      name
    }
  }
`;

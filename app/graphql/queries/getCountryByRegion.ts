import { gql } from '@apollo/client';

export const GET_COUNTRIES_BY_REGION = gql`
  query GetCountriesByRegion($continentCode: ID!) {
    continent(code: $continentCode) {
      countries {
        code
        name
      }
    }
  }
`;

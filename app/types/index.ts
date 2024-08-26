type CombinedDataProps = {
  name: string;
  code: string;
  capital: string;
  emoji: string;
  currency: string;
  continent: { name: string };
  languages: { name: string }[];
  latitude: number;
  longitude: number;
};

export type MapProps = {
  combinedData?: CombinedDataProps[] | null;
  zoom?: number;
};

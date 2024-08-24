import { ReactNode, ChangeEvent } from 'react';

export interface CountryProps {
  name: string;
  code: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: { name: string }[];
  latitude: number;
  longitude: number;
}

export interface CardMapProps {
  data: CountryProps;
}

export interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export interface CountryDataProps {
  Country: string;
  'ISO Code': string;
  Region: string;
}

export interface TitleProps {
  children: ReactNode;
}

export interface ButtonProps {
  onClick: () => void;
  content: string;
}

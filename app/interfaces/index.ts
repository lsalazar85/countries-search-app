import { ReactNode, ChangeEvent } from 'react';

export interface CountryProps {
  name: string;
  code: string;
  capital: string;
  emoji: string;
  currency: string;
  continent: { name: string };
  languages: { name: string }[];
  latitude: number;
  longitude: number;
}

export interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export interface TitleProps {
  children: ReactNode;
}

export interface ButtonProps {
  onClick?: () => void | undefined;
  content: string;
  styles?: string;
}

export interface TooltipProps {
  text: string;
  children: ReactNode;
}

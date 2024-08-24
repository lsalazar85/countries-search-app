'use client';
import { TitleProps } from '@/app/interfaces';

const Title = ({ children }: TitleProps) => (
  <h1 className="xs:text-2xl md:text-4xl font-bold text-center text-primary">
    {children}
  </h1>
);

export default Title;

'use client';
import { TitleProps } from '@/app/interfaces';

const Subtitle = ({ children }: TitleProps) => {
  return (
    <h2 className="text-center text-gray-500 mt-[0.5rem] xs:text-[0.8rem]">
      {children}
    </h2>
  );
};

export default Subtitle;

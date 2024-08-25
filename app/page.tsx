'use client';
import Search from '@/app/components/Search';
import Title from '@/app/components/UI/Title';
import Subtitle from '@/app/components/UI/Subtitle';

const Page = () => {
  return (
    <section className="flex flex-col flex-1 w-full items-center justify-center lg:pt-[1.5rem]">
      <div className="mb-[1.5rem]">
        <Title>Discover the Americas</Title>
        <Subtitle>You can search by country name, code, or region. 🌎</Subtitle>
      </div>
      <Search />
    </section>
  );
};

export default Page;

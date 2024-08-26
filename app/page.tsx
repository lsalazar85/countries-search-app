'use client';
import Search from '@/app/components/Search';
import Title from '@/app/components/UI/Title';
import Subtitle from '@/app/components/UI/Subtitle';
import Tooltip from '@/app/components/UI/Tooltip';
import Button from '@/app/components/UI/Button';

const Page = () => (
  <section className="flex flex-col flex-1 w-full items-center justify-center lg:pt-[1.5rem]">
    <div className="mb-[1.5rem]">
      <Title>Discover the Americas</Title>
      <Subtitle>You can search by country name, code, or region. 🌎</Subtitle>
      <div className="text-center text-[0.8rem] mt-[0.8rem]">
        <Tooltip text="Search by country name (e.g., Argentina), ISO code (e.g., AR), or region (SA for South America, NA for North America). Find your country, click the pin, and learn more!">
          <Button
            styles="bg-black text-primary"
            content="Click here to learn how to use this tool! 📚"
          />
        </Tooltip>
      </div>
    </div>
    <Search />
  </section>
);

export default Page;

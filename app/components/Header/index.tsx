import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-black text-white p-4 shadow-md z-10">
      <div className="w-full flex justify-between items-center">
        <Image
          src="https://tots.agency/assets/img/logos/logo-horiz.svg"
          alt="Countries App Logo"
          width={120}
          height={40}
        />
        <h1 className="text-lg text-primary font-poppins font-semibold">
          Countries App
        </h1>
      </div>
    </header>
  );
};

export default Header;

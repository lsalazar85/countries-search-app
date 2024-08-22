import Link from "next/link";
import { SiNextdotjs } from "react-icons/si";
import { FaCode } from "react-icons/fa";

const Footer = () => (
  <footer className="xs:hidden lg:flex items-center justify-center text-[0.688rem] py-[1rem] font-poppins mt-auto">
    <span>Take a look at the code for this project.</span>
    <Link
      href="https://github.com/lsalazar85/countries-app"
      className="flex gap-1 ml-[0.5rem] text-[1rem] cursor-pointer"
      target="_blank"
    >
      <SiNextdotjs className="text-white" />
      <FaCode className="text-purple" />
    </Link>
  </footer>
);

export default Footer;

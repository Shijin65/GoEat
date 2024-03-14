import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <div className="bg-orange-500 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-white font-bold tracking-tight ">GoEat.com</span>
        <span className="text-white font-bold tracking-tight flex gap-4 text-center">
          <span>Privacy Policy</span>
          <Separator className="md:hidden" orientation="vertical"/>
          <span>Terms Of Services</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;

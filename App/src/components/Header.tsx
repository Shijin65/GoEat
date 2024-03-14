import { Link } from "react-router-dom";
import Mobilenav from "./Mobilenav";
import DesktopNav from "./DesktopNav";
import logo from "../assets/logo.png";
export default function Header() {
  return (
    <div className="border-b-2 border-b-orange-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex md:flex-col items-center justify-center">
          <img src={logo} alt="" className="h-14"/>
          <Link
            to={"/"}
            className="text-3xl font-bold tracking-tight text-orange-500"
          >
            GoEat
          </Link>
        </div>

        <div className="md:hidden">
          <Mobilenav />
        </div>
        <div className="hidden md:block">
          <DesktopNav />
        </div>
      </div>
    </div>
  );
}

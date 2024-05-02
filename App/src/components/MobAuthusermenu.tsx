
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";
import { Link, Navigate, useNavigate } from "react-router-dom";
const MobAuthusermenu = () => {
  const navigate= useNavigate()
    const {  user ,logout } = useAuth0();
  return (
    <SheetContent className="flex flex-col justify-between">
      <SheetHeader className="flex flex-col mt-2 justify-center items-center">
        <SheetTitle className="text-center self-center">
          {user?.email}
        </SheetTitle>
        <Avatar className="size-32 self-center mt-5 ">
          <AvatarImage src={user?.picture} alt="@shadcn" />
          <AvatarFallback>{user?.name?.match(/\b(\w)/g)}</AvatarFallback>
        </Avatar>
        <SheetTitle className="text-center self-center text-lg font-medium tracking-tight">{`Hi,${user?.name}!`}</SheetTitle>
        <Link to="/user-profile"><Button className="bg-orange-500 self-center text-center" >Profile</Button></Link>
      </SheetHeader>

      <SheetHeader className="mt-5 p-5 ">
      <Link to="/manage-restaurant"><Button className="hover:bg-orange-500 w-full" onClick={()=>{<SheetClose/>}}>Manage Restaurant</Button></Link>
      <Link to="/order-status"><Button className="hover:bg-orange-500 w-full" onClick={()=>{<SheetClose/>}}>Order Status</Button></Link>

        <Button className="hover:bg-orange-500 ">Settings</Button>
        <Separator className="my-2" />
        <Button className="hover:bg-orange-500 " onClick={() => logout()}>
          Log out
        </Button>
      </SheetHeader>
    </SheetContent>
  );
};

export default MobAuthusermenu;

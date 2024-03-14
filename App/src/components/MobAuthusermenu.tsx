
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";
const MobAuthusermenu = () => {
    const {  user ,logout } = useAuth0();
  return (
    <SheetContent className="flex flex-col justify-between">
      <SheetHeader className="flex flex-col mt-2 ">
        <SheetTitle className="text-center self-center">
          {user?.email}
        </SheetTitle>
        <Avatar className="size-32 self-center mt-5 ">
          <AvatarImage src={user?.picture} alt="@shadcn" />
          <AvatarFallback>{user?.name?.match(/\b(\w)/g)}</AvatarFallback>
        </Avatar>
        <SheetTitle className="text-center self-center text-lg font-medium tracking-tight">{`Hi,${user?.name}!`}</SheetTitle>
        <Button className="bg-orange-500 ">Profile</Button>
      </SheetHeader>

      <SheetHeader className="mt-5 p-5 ">
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

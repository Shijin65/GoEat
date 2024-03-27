import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

const AuthuserMenu = () => {
  const { user,logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user?.email}
        <Avatar className="size-14">
          <AvatarImage src={user?.picture} alt="@shadcn" />
          <AvatarFallback>{user?.name?.match(/\b(\w)/g)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="container w-96 hidden md:block md:me-10 lg:me-16 shadow-lg">
        <DropdownMenuGroup className="flex flex-col mt-2 ">
          <DropdownMenuLabel className="text-center self-center">
            {user?.email}
          </DropdownMenuLabel>
          <Avatar className="size-32 self-center mt-5 ">
            <AvatarImage src={user?.picture} alt="@shadcn" />
            <AvatarFallback>{user?.name?.match(/\b(\w)/g)}</AvatarFallback>
          </Avatar>
          <DropdownMenuLabel className="text-center self-center text-lg font-medium tracking-tight">{`Hi,${user?.name}!`}</DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuGroup className="mt-5 p-5">
          <Link to={"/user-profile"}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
          <Link to={"/Manage-Restaurant"}><DropdownMenuItem>Manage Restaurant</DropdownMenuItem></Link>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <Separator className="my-2" />
          <DropdownMenuItem onClick={() => logout()}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthuserMenu;

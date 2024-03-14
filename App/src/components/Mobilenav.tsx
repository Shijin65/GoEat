import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { useAuth0 } from "@auth0/auth0-react";

import MobAuthusermenu from "./MobAuthusermenu";

export default function Mobilenav() {
  const { loginWithRedirect ,isAuthenticated  } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>

      {isAuthenticated ? (
        <MobAuthusermenu/>
      ) : (
        <SheetContent>
          <SheetTitle>Welcome to GoEat.com</SheetTitle>
          <Separator className="my-4" />
          <SheetDescription className="flex">
            <Button
              className="flex-1 bg-orange-500 hover:bg-white hover:text-orange-500"
              onClick={async () => await loginWithRedirect()}
            >
              Login
            </Button>
          </SheetDescription>
        </SheetContent>
      )}
    </Sheet>
  );
}

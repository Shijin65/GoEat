import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import AuthuserMenu from "./AuthuserMenu";

const DesktopNav = () => {
  const { loginWithRedirect, isAuthenticated} = useAuth0();
  return (
    <span>
      {isAuthenticated ? (
        <AuthuserMenu/>
      ) : (
        <Button
          variant={"ghost"}
          className="font-bold text-base hover:text-orange-500 hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Login
        </Button>
      )}
    </span>
  );
};

export default DesktopNav;

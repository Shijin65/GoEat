import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserformData,
} from "@/forms/user-profile-form/UserProfileForm";
import { UseGetCurrentUser } from "@/Apis/UserApi";
type props = {
  onCheckOut: (UserFormData: UserformData) => void;
  disabled: boolean;
  isLoading: boolean;
};
const CheckoutButton = ({ onCheckOut, disabled, isLoading }: props) => {
  const {
    isLoading: isAuthloading,
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser } = UseGetCurrentUser();
  const onLogin = async () => {
    await loginWithRedirect({ appState: { returnTo: pathname } });
  };
  if (!isAuthenticated) {
    return (
      <Button className="bg-orange-500 flex-1" onClick={onLogin}>
        Login To CheckOut
      </Button>
    );
  }

  if (isAuthloading || isLoading || !currentUser) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go TO CHECKOUT
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px]">
        <UserProfileForm
          currentUser={currentUser}
          isLoading={isLoading}
          onSave={onCheckOut}
          title="Confirm Delivery Details"
          buttontext="Continue To Payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;

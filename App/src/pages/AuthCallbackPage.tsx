import { UseCreateUser } from "@/Apis/UserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate=useNavigate()
  const hascreateduser = useRef(false);
  const { user } = useAuth0();
  const { CreateUser } = UseCreateUser();
  useEffect(() => {
    console.log(user)
    if (user?.sub && user?.email && !hascreateduser.current) {
      localStorage.setItem("currentUser",JSON.stringify(user))
      CreateUser({ auth0Id: user.sub, email: user.email });
      hascreateduser.current = true;
      
    }
    navigate("/")
  }, [CreateUser,user]);

  return <>loading</>
};

export default AuthCallbackPage;

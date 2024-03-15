import { UseCreateUser } from "@/Apis/UserApi";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

type props={
    children: React.ReactNode
}

const Auth0ProviderNavigate = ({children}:props) => {
const {CreateUser}=UseCreateUser()
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const  clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirecturi = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    if (!domain || !clientId || !redirecturi) {
      throw new Error("unable to initialise auth")
    }
    const onRedirectcallback=(appState?:AppState,user?:User)=>{
      console.log("USER",user)
      if (user?.sub && user?.email) {
        CreateUser({auth0Id: user.sub, email: user.email})
      }
    }
    return(
      <Auth0Provider domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirecturi}} 
      onRedirectCallback={onRedirectcallback}>
        {children}
      </Auth0Provider>
    )
}

export default Auth0ProviderNavigate
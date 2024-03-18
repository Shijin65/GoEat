
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type props={
    children: React.ReactNode
}

const Auth0ProviderNavigate = ({children}:props) => {

const navigate =useNavigate()
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const  clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirecturi = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    if (!domain || !clientId || !redirecturi || !audience) {
      throw new Error("unable to initialise auth")
    }
    const onRedirectcallback=(appState?:AppState,user?:User)=>{
      console.log("USER",user)
      navigate("/auth-callback")
    }
    return(
      <Auth0Provider domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirecturi,audience}} 
      onRedirectCallback={onRedirectcallback}>
        {children}
      </Auth0Provider>
    )
}

export default Auth0ProviderNavigate
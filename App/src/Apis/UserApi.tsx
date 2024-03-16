import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
type createuserrequest = {
  auth0Id: String;
  email: String;
};
export const UseCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createmyuserRequest = async (user: createuserrequest) => {
    const auth0Token = await getAccessTokenSilently();
    const responce = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: { 
        Authorization:`bearer ${auth0Token}`,"Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (responce.status === 201) {
      alert("user created succesfully");
    }
    if (!responce.ok) {
      throw new Error("failed to create user");
    }
  };
  const {
    mutateAsync: CreateUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createmyuserRequest);

  return { CreateUser, isLoading, isSuccess, isError };
};

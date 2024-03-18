import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";


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
        Authorization: `bearer ${auth0Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (responce.status === 201) {
      toast("user created successfuly")
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
type UpdateUserRequest ={
  name: string;
    address1: string;
    city: string;
    country: string;
}
export const UseUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const UpdateUserRequest = async (FormData: UpdateUserRequest) => {
    const AccessToken = await getAccessTokenSilently();
    const responce = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${AccessToken}`,
      "Content-Type": "application/json",
    },
    body:JSON.stringify(FormData)
    });
    if(!responce.ok){
      throw new Error("failed to update user")
    }else{
      
    }

  };


  const {mutateAsync:updateuser,isLoading,error,isSuccess,reset }=useMutation(UpdateUserRequest);

  if(isSuccess){
    toast.success("updated user successfuly")
  }

  if (error){
    toast.error("error occered");
    reset()
  }

  return { updateuser,isLoading}
};

export const UseGetCurrentUser=()=>{
   const {getAccessTokenSilently}=useAuth0()
    const GetCurrentUserRequest =async()=>{
      const AccessToken = await getAccessTokenSilently()
      const responce= await fetch(`${API_BASE_URL}/api/my/user`,{
        method:"GET",
        headers:{
          Authorization:`Bearer ${AccessToken}`,
          "Content-Type": "application/json",
        }
      })
      if(!responce.ok){
        throw new Error("User Not Found")
      }
      return responce.json();
    }

    const {data:currentUser,isLoading,error}=useQuery("fetch current user",GetCurrentUserRequest);
    if(error){
      toast.error(error.toString())
    }
    return {currentUser ,isLoading}
}


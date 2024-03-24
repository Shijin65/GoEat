import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const UseCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const CreateRestaurantRequest = async (restaurantFormData: FormData):Promise<Restaurant> => {
    const AccessToken = getAccessTokenSilently();
    const responce = await fetch(`${API_BASE_URL}/api/goeat/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AccessToken}`,
        "Content-Type": "application/json",
      },
      body: restaurantFormData,
    });

    if (!responce.ok) {
      throw new Error("Failed to create restaurant");
    }
    return responce.json();
  };

  const {
    mutateAsync: CreateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(CreateRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant created successfully");
  }
  if(error){
    toast.error("Some error occered while adding the restaurant")
  }
  return { CreateRestaurant, isLoading };
};

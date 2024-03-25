import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const UseCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const CreateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const AccessToken = await getAccessTokenSilently();
    console.log(restaurantFormData);
    const response = await fetch(`${API_BASE_URL}/api/goeat/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    if (response.status===409) {
      toast.error("restaurant already exisit");
    }
    console.log(response);
    return response.json();
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
  if (error) {
    console.log(error);
  
  }
  return { CreateRestaurant, isLoading };
};
import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//CREATE.....
export const UseCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const CreateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const AccessToken = await getAccessTokenSilently();
    console.log(restaurantFormData);
    const response = await fetch(`${API_BASE_URL}/api/user/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    if (response.status === 409) {
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

//GET UPDATED RESTAURANT
export const UseGetCurrentRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const GetCurrentRestaurant = async (): Promise<Restaurant> => {
    const AccessToken = await getAccessTokenSilently();
    const responce = await fetch(`${API_BASE_URL}/api/user/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    if (!responce.ok) {
      throw new Error("Failed to get restaurant");
    }
    return responce.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchmyRestaurant",
    GetCurrentRestaurant
  );

  return { restaurant, isLoading };
};

//UPDATE RESTAURANT
export const UseUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const UpdateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const AccessToken = await getAccessTokenSilently();
    console.log(restaurantFormData);
    const response = await fetch(`${API_BASE_URL}/api/user/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    if (response.status === 409) {
      toast.error("restaurant already exisit");
    }
    return response.json();
  };

  const {
    mutateAsync: UpdateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(UpdateRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant Updated Successfully");
  }
  if (error) {
    console.log(error);
  }
  return { UpdateRestaurant, isLoading };
};

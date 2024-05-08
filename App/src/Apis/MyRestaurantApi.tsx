import { Order, Restaurant } from "@/types";
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
    const response = await fetch(`${API_BASE_URL}/api/user/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
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

//GET ORDERS OF USER RESTAURANT
export const useGetRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/user/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };
  const { data: orders, isLoading } = useQuery(
    "fetchrestaurantorders",
    getMyRestaurantOrdersRequest
  );
  return { orders, isLoading };
};

type UpdateOrderStatus = {
  orderId: string;
  status: string;
};
export const UseUpdateMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurantRequest = async (
    Updateorderstatus: UpdateOrderStatus
  ) => {
    const AccessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/api/user/restaurant/order/${Updateorderstatus.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${AccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: Updateorderstatus.status }),
      }
    );
    if (!response.ok) {
      throw new Error("failed to update status");
    }
    return response.json();
  };
  const {
    mutateAsync: UpdateRestauraneStatus,
    isError,
    isLoading,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantRequest);

  if (isSuccess) {
    toast.success("status updated Succesfully");
  }

  if (isError) {
    toast.error("unable to update status"), reset();
  }
  return {
    UpdateRestauraneStatus,
    isLoading,
  };
};

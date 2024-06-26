import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
type CheckoutSessiontype = {
  cartItems: {
    menuItemid: string;
    dishname: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    address: string;
    city: string;
    country: string;
  };
  restaurantId: string;
};
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyOrderRequest = async ():Promise<Order[]> => {
    const AccessToken = await getAccessTokenSilently();
    const responce = await fetch(`${VITE_API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    if (!responce.ok) {
      throw new Error("failed to get order");
    }
    return responce.json();
  };
  const { data: orders, isLoading } = useQuery(
    "fetchmyorder",
    getMyOrderRequest,{
      refetchInterval:5000
    }
  );
  return {orders,isLoading}
};
export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const CreateCheckoutRequest = async (
    checkoutsessionrequest: CheckoutSessiontype
  ) => {
    console.log(checkoutsessionrequest);
    const AccessToken = await getAccessTokenSilently();
    const responce = await fetch(
      `${VITE_API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutsessionrequest),
      }
    );
    if (!responce.ok) {
      throw new Error("unable to create checkout Request");
    }
    return responce.json();
  };
  const {
    mutateAsync: CreateCheckoutsession,
    isLoading,
    error,
    reset,
  } = useMutation(CreateCheckoutRequest);
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return { CreateCheckoutsession, isLoading };
};

import { RestaurentSearchResponse } from "@/types";
import { useQuery } from "react-query";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const UseSearchRestaurant = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurentSearchResponse> => {
    const response = await fetch(
      `${VITE_API_BASE_URL}/api/restaurant/search/${city}`
    );
    if (!response.ok) {
      throw new Error("failed to get Restaurant");
    }

    return response.json();
  };
  const { data: results, isLoading } = useQuery(
    ["searchrestaurants"],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};

import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurentSearchResponse } from "@/types";
import { useQuery } from "react-query";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//GET RESTAURANT ......
export const UseGetRestaurant = (restaurantId?: string) => {
  const GetRestaurantById = async (): Promise<Restaurant> => {
    const responce = await fetch(
      `${VITE_API_BASE_URL}/api/restaurant/${restaurantId}`
    );
    if (!responce.ok) {
      throw new Error("failed to get restaurant");
    }
    return responce.json();
  };
  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    GetRestaurantById,
    { enabled: !!restaurantId }
  );
  return { restaurant, isLoading };
};

export const UseSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurentSearchResponse> => {
    const params = new URLSearchParams();

    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisine", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);
    const response = await fetch(
      `${VITE_API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error("failed to get Restaurant");
    }
    return response.json();
  };
  const { data: results, isLoading } = useQuery(
    ["searchrestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};

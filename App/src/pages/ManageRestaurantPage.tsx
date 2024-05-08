import {
  UseCreateRestaurant,
  UseGetCurrentRestaurant,
  UseUpdateRestaurant,
  useGetRestaurantOrders,
} from "@/Apis/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { CreateRestaurant, isLoading: Createloading } = UseCreateRestaurant();
  const { restaurant } = UseGetCurrentRestaurant();
  const { UpdateRestaurant, isLoading: updateloading } = UseUpdateRestaurant();
  const { orders, isLoading } = useGetRestaurantOrders();
  if (isLoading) {
    return <span>...loading</span>
  }
  console.log(orders)

  const Editing = !!restaurant;
  return (
    <>
      <Tabs defaultValue="Orders">
        <TabsList>
          <TabsTrigger value="Orders">Orders</TabsTrigger>
          <TabsTrigger value="ManageRestaurant">ManageRestaurant</TabsTrigger>
        </TabsList>
        <TabsContent value="Orders">
          <h2 className="my-3">{orders?.length} Active Orders</h2>
          {orders?.map((order) => (
            <OrderItemCard order={order} />
          ))}
        </TabsContent>
        <TabsContent value="ManageRestaurant">
          <ManageRestaurantForm
            restaurant={restaurant}
            onsave={Editing ? UpdateRestaurant : CreateRestaurant}
            isloding={Createloading || updateloading}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};
export default ManageRestaurantPage;

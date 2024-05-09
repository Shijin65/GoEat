import { useGetMyOrder } from "@/Apis/OrderApis";
import OrderStatusDetails from "@/components/OrderStatusDetails";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OrderStatuspage = () => {
  const { isLoading, orders } = useGetMyOrder();
  if (isLoading) {
    return "loading";
  }
  if (!orders || orders.length === 0) {
    return "No Orders found ";
  }

  return (
    <div className="space-y-10">
      {orders.map((order,index) => (
        <div key={index} className="space-y-10 bg-gray-50 border-2 p-10 rounded-lg ">
          <OrderStatusHeader order={order} />
          <div className="grid md:grid-cols-2 gap-10 ">
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                alt="restaurant image"
                className="rounded-md object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatuspage;

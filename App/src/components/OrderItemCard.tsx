import { Order, orderstatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { ORDER_STATUS } from "@/config/OrderStatusConfig";
import { UseUpdateMyRestaurantOrders } from "@/Apis/MyRestaurantApi";
import { useState } from "react";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState<orderstatus>(order.status);
  const { UpdateRestauraneStatus, isLoading } = UseUpdateMyRestaurantOrders();

  const handlestatuschange = async (newstatus: orderstatus) => {
    UpdateRestauraneStatus({ orderId: order._id as string, status: newstatus });
    setStatus(newstatus);
  };
  const getTime = () => {
    const OrderDateTime = new Date(order.createdAt);
    const hours = OrderDateTime.getHours();
    const minutes = OrderDateTime.getMinutes();
    const paddedmins = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedmins}`;
  };
  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle className="flex flex-wrap justify-between mb-4 gap-4">
          <div>
            Customer Name :{" "}
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery Address :{" "}
            <span className="ml-2 font-normal">
              {order.deliveryDetails.address}
            </span>
          </div>
          <div>
            Time : <span className="ml-2 font-normal">{getTime()}</span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col gap-6 ">
        <div className="flex flex-col ">
          {order.cartItems.map((cartitem) => (
            <span>
              <Badge variant={"outline"} className="mr-2">
                {cartitem.quantity}
              </Badge>
              {cartitem.dishname}
            </span>
          ))}
        </div>
        <Separator />
        <div className="flex justify-end font-bold">
          Total Amount :{" "}
          <span className="ml-2 font-normal">
            ₹{(order.totalAmount / 100).toFixed(2)}
          </span>
        </div>
        <div>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handlestatuschange(value as orderstatus)}
            
          >
            <SelectTrigger id="status" className="w-[180px]">
              <SelectValue placeholder="status" />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white">
              {ORDER_STATUS.map((status) => (
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;

import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItem: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
  
};

const OrderSummery = ({ cartItem, restaurant, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalcost = cartItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const totalWithdelivery = totalcost + restaurant.deliveryCharge;
    return (totalWithdelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex justify-between tracking-tight ">
          <span>Your Orders</span>
          <span>{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItem.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.dishname}
            </span>
            <span className="flex items-center gap-1">
              ₹{((item.price * item.quantity) / 100).toFixed(2)}
              <Trash
                className="cursor-pointer "
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
            </span>
          </div>
        ))}
        <Separator />

        <div className="flex justify-between">
          <span>delivery</span>
          <span>₹{restaurant.deliveryCharge / 100} </span>
        </div>
        <h4 className="text-sm text-red-600">
          **delivery price only for the surrounding of (10km)
        </h4>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummery;

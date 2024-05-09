import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/OrderStatusConfig";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(created.getMinutes() + order.restaurant.deliveryTime);
    const hours = created.getHours();
    const minutes = created.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${paddedMinutes}`;
  };

  const getorderinfo = () => {
    return (
      ORDER_STATUS.find((Ord) => Ord.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col md:flex-row  gap-5 md:justify-between">
        <span>Order Status : {getorderinfo().label}</span>
        <span>Expected by :{getExpectedDelivery()}</span>
      </h1>
      <Progress
        className={`${
          getorderinfo().label === "Delivered"
            ? "animate-none "
            : "animate-pulse"
        }`}
        value={getorderinfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;

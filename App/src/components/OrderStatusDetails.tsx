import { Order } from "@/types";

import { Separator } from "./ui/separator";

type Props = {
    order:Order
 }

const OrderStatusDetails = ({ order}: Props ) => {
    if (!order) return null;
return <div className=" space-y-5">
    <div className="flex flex-col">
            <span className="font-bold">Delivery To :</span>
            <span>{order.deliveryDetails.name}</span>
            <span>{order.deliveryDetails.address}</span>
    </div>
    <div className="flex flex-col">
            <span className="font-bold">Your Order:</span>
            <ul>{order.cartItems.map((item)=>(<ol>{item.dishname} x {item.quantity}</ol>))}</ul>
    </div>

    <Separator/>
    <div className="flex ">
            <span className="font-bold">Total : </span>
            <span> ₹ {(order.totalAmount / 100).toFixed(2)}</span>
    </div>
</div>
}

export default OrderStatusDetails;
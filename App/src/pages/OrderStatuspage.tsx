import { useGetMyOrder } from "@/Apis/OrderApis";
import OrderStatusHeader from "@/components/OrderStatusHeader";

const OrderStatuspage = ( ) => {
const {isLoading,orders }=useGetMyOrder();
if(isLoading){
    return "loading"
}
if(!orders || orders.length===0 ){
    return "No Orders found "
}
return <div className="space-y-10">  
    {orders.map((order)=>(
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
            <OrderStatusHeader order={order}/>
        </div>
    )
    
    )}
</div>
}

export default OrderStatuspage;
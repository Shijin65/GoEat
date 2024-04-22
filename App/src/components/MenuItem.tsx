import { menuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MinusCircle, PlusCircle } from "lucide-react";

type Props = {
  menuItem: menuItem;
  AddToCart:()=>void
  removeOne:()=>void
};

const MenuItem = ({ menuItem,AddToCart ,removeOne}: Props) => {
  return (
    <Card >
      <CardHeader>
        <CardTitle>{menuItem.dishname}</CardTitle>
      </CardHeader>
      <CardContent className="text-green-500 font-bold flex justify-between">
        ₹{(menuItem.price/100).toFixed(2)}
        <span className="flex items-center gap-2"><PlusCircle onClick={AddToCart}/><MinusCircle color="red"onClick={removeOne}/></span>
      </CardContent>
    </Card>
  );
};

export default MenuItem;

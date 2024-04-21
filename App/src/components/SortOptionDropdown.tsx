import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type props = {
  onchange: (value:string) => void;
  sortOption: string;
};
const SORT_OPTION = [
  { label: "Best Match", value: "bestmatch" },
  { label: "Delivery Charge", value: "deliveryCharge" },
  { label: "Delivery Time", value: "deliveryTime" },
];
const SortOptionDropdown = ({ onchange, sortOption }: props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant={"outline"} className="bg-transparent">Sort By : {sortOption}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTION.map((option) => (
          <DropdownMenuItem className="cursor-pointer" onClick={()=>onchange(option.value)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SortOptionDropdown;

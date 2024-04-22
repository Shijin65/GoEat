import { Button } from "@/components/ui/button";
import {
    FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-4">
      <FormField
        control={control}
        name={`menuItems.${index}.dishname`}
        render={({field}) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
            Dishname <FormMessage />
            </FormLabel>
            <FormControl>
                <Input {...field} placeholder="chees pizza" className="bg-white"/>
            </FormControl>
            <FormMessage/>
          </FormItem>

        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({field}) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price (₹)<FormMessage />
            </FormLabel>
            <FormControl>
                <Input {...field} placeholder="8.00" className="bg-white"/>
            </FormControl>
            <FormMessage/>
          </FormItem>

        )}
      />
      <Button type="button" className="bg-red-500 max-h-fit" onClick={removeMenuItem}>Remove</Button>
    </div>
  );
};

export default MenuItemInput;

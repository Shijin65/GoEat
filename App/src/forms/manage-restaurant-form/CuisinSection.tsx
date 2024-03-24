import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/Restaurant-options-config";
import { useFormContext } from "react-hook-form";

import CuisinCheckbox from "./CuisinCheckbox";


const CuisinSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisins</h2>
      </div>
      <FormDescription>Select any of the cuisin!</FormDescription>
      <FormField
        control={control}
        name="cuisin"
        render={({ field }) => (
          <FormItem className="grid md:grid-cols-5 sm:grid-cols-2  gap-1">
            {cuisineList.map((cuisinItem) => (
              <CuisinCheckbox cuisin={cuisinItem} field={field} />
            ))}
            <FormMessage/>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinSection;

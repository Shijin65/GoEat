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

import CuisineCheckbox from "./CuisineCheckbox";


const CuisineSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
      </div>
      <FormDescription>Select any of the cuisine!</FormDescription>
      <FormField
        control={control}
        name="cuisine"
        render={({ field }) => (
          <FormItem className="grid md:grid-cols-5 sm:grid-cols-2  gap-1">
            {cuisineList.map((cuisineItem) => (
              <CuisineCheckbox cuisine={cuisineItem} field={field} />
            ))}
            <FormMessage/>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisineSection;

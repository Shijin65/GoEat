import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisin: string;
  field: ControllerRenderProps<FieldValues, "cuisin">;
};

const CuisinCheckbox = ({ cuisin, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisin)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisin]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisin)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisin}</FormLabel>
    </FormItem>
  );
};

export default CuisinCheckbox;
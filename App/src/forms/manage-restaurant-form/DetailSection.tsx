import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailSection = ( ) => {
    const {control} = useFormContext()
    return(
        <div className="space-y-2">
            <div>
          <h2 className="text-2xl font-bold">Details</h2>
        </div>
        <FormDescription>Enter the details about your restaurant!</FormDescription>
        <FormField
          control={control}
          name="restaurantName"
          render={({ field }) => 
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white"/>
                </FormControl>
                <FormMessage/>
            </FormItem>}
        />
        <div className="flex flex-col md:flex-row gap-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => 
            <FormItem className="flex-1">
                <FormLabel>city</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white"/>
                </FormControl>
                <FormMessage/>
            </FormItem>}
        />
        <FormField
          control={control}
          name="country"
          render={({ field }) => 
            <FormItem className="flex-1">
                <FormLabel>country</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white"/>
                </FormControl>
                <FormMessage/>
            </FormItem>}
        /> 
        </div>

        <FormField
          control={control}
          name="deliveryCharge"
          render={({ field }) => 
            <FormItem>
                <FormLabel>deliveryCharge($)</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white"/>
                </FormControl>
                <FormMessage/>
            </FormItem>}
        />
        <FormField
          control={control}
          name="deliveryTime"
          render={({ field }) => 
            <FormItem>
                <FormLabel>DeliveryTime (min)</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white"/>
                </FormControl>
                <FormMessage/>
            </FormItem>}
        />
        </div>
    )
}

export default DetailSection;
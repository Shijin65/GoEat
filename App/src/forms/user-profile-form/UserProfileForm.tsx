import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import user from "@/types";
import { useEffect } from "react";
const formschema = z.object({
  email: z.string().optional(),
  name: z.string().min(1,"name is required"),
  address1: z.string().min(1,"address1 is required"),
  city: z.string().min(1,"city is required"),
  country: z.string().min(1,"country is required"),
});

type UserformData = z.infer<typeof formschema>;

type Props = {
  onSave: (userprofileData: UserformData) => void;
  isLoading: boolean;
  currentUser:user;
};

const UserProfileForm = ({ isLoading, onSave,currentUser}: Props) => {
  const form = useForm<UserformData>({
    resolver: zodResolver(formschema),
    defaultValues:currentUser
  });
useEffect(() => {
 form.reset(currentUser)
}, [currentUser,form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">User profile form</h2>
        </div>
        <FormDescription>view and edit your profile!</FormDescription>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => 
            <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                    <Input {...field} disabled className="bg-white"/>
                </FormControl>
            </FormItem>}
        />

<FormField
          control={form.control}
          name="name"
          render={({ field }) => 
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field}  className="bg-white" required/>
                </FormControl>
                <FormMessage />
            </FormItem>}
        />



        <div className="flex flex-col md:flex-row gap-4">
        
        
        <FormField 
         
          control={form.control}
          name="address1"
          render={({ field }) => 
            <FormItem className="flex-1">
                <FormLabel>Address1</FormLabel>
                <FormControl>
                    <Input {...field}  className="bg-white"/>
                </FormControl>
            </FormItem>}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => 
            <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                    <Input {...field}  className="bg-white"/>
                </FormControl>
            </FormItem>}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => 
            <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                    <Input {...field}  className="bg-white"/>
                </FormControl>
            </FormItem>}
        />
            
        </div>
        {isLoading?<LoadingButton/>:<Button type="submit" className="bg-orange-500">Submit</Button>}
      </form>
    </Form>
  );
};

export default UserProfileForm;

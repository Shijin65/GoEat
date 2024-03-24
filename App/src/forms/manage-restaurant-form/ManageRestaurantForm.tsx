import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import CuisinSection from "./CuisinSection";
import { Separator } from "@/components/ui/separator";
import MenuItemSection from "./MenuItemSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const formschema = z.object({
  restaurantName: z.string({
    required_error: "RestaurantName is required !!!",
  }),
  city: z.string({ required_error: "city is required !!" }),
  country: z.string({ required_error: "country is required !!" }),
  deliveryCharge: z.coerce.number({
    required_error: "deliveryCharge is required !!!",
    invalid_type_error: "deliveryCharge must be number !!!",
  }),
  deliveryTime: z.coerce.number({
    required_error: "deliveryTime is required !!",
    invalid_type_error: "deliveryCharge must be number !!",
  }),
  cuisin: z
    .array(z.string())
    .nonempty({ message: "Select atleast one item !!!" }),
  menuItem: z.array(
    z.object({
      dishname: z.string().min(1, "dish name is required !!"),
      price: z.coerce.number().min(1, "price is required !!"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required !!!" }),
});

type RestaurantFormData = z.infer<typeof formschema>;

type Props = {
  onsave: (RestaurantFormData: FormData) => void;
  isloding: boolean;
};

const ManageRestaurantForm = ({ onsave, isloding }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formschema),
    defaultValues: {
      cuisin: [],
      menuItem: [{ dishname: "", price: 0 }],
    },
  });

  const onsubmit = (formdatajson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formdatajson.restaurantName);
    formData.append("city", formdatajson.city);
    formData.append("country", formdatajson.country);
    formData.append(
      "deliveryCharge",
      (formdatajson.deliveryCharge * 100).toString()
    );
    formData.append("deliveryTime", formdatajson.deliveryTime.toString());
    formdatajson.cuisin.forEach((cuisin, index) => {
      formData.append(`cuisin[${index}]`, cuisin);
    });
    formdatajson.menuItem.forEach((menuItem, index) => {
      formData.append(`menuItem[${index}][dishname]`, menuItem.dishname);
      formData.append(
        `menuItem[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    formData.append("imageFile",formdatajson.imageFile)
    onsave(formData)
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className=" flex flex-col gap-5 space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <DetailSection />
        <Separator className="my-2" />
        <CuisinSection />
        <Separator className="my-2" />
        <MenuItemSection />
        <Separator className="my-2" />
        <ImageSection />
        {isloding ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;

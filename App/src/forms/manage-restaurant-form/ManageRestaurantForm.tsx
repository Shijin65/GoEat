import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import CuisineSection from "./CuisineSection";
import { Separator } from "@/components/ui/separator";
import MenuItemSection from "./MenuItemSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formschema = z
  .object({
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
    cuisines: z
      .array(z.string())
      .nonempty({ message: "Select atleast one item !!!" }),
    menuItems: z.array(
      z.object({
        dishname: z.string().min(1, "dish name is required !!"),
        price: z.coerce.number().min(1, "price is required !!"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageFile ||data.imageUrl , {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

/////////////////////////////////////

type RestaurantFormData = z.infer<typeof formschema>;


type Props = {
  onsave: (RestaurantFormData: FormData) => void;
  isloding: boolean;
  restaurant?: Restaurant;
};




const ManageRestaurantForm = ({ onsave, isloding, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formschema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ dishname: "", price: 0 }],
    },
  });
  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const formattedDeliverycharge = parseInt(
      (restaurant?.deliveryCharge / 100).toFixed(2)
    );
    const menuitemformate = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryCharge: formattedDeliverycharge,
      menuItems: menuitemformate,
    };
    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onsubmit = (formdatajson: RestaurantFormData) => {
    console.log(formdatajson);
    const formData = new FormData();

    formData.append("restaurantName", formdatajson.restaurantName);
    formData.append("city", formdatajson.city);
    formData.append("country", formdatajson.country);
    formData.append(
      "deliveryCharge",
      (formdatajson.deliveryCharge * 100).toString()
    );
    formData.append("deliveryTime", formdatajson.deliveryTime.toString());

    formdatajson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formdatajson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][dishname]`, menuItem.dishname);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    if (formdatajson.imageFile instanceof File) {
      formData.append("imageFile", formdatajson.imageFile);
    }

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    onsave(formData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className=" flex flex-col gap-5 space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <DetailSection />
        <Separator className="my-2" />
        <CuisineSection />
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

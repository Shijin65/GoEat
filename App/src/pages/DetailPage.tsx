import MenuItem from "@/components/MenuItem";

import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { menuItem } from "../types";
import { UseGetRestaurant } from "@/Apis/RestaurantApi";
import OrderSummery from "@/components/OrderSummery";
import CheckoutButton from "@/components/CheckoutButton";
import { UserformData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/Apis/OrderApis";

export type CartItem = {
  id: string;
  dishname: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();

  const { restaurant, isLoading } = UseGetRestaurant(restaurantId);

  const {CreateCheckoutsession,isLoading :isCheckoutLoading}=useCreateCheckoutSession()
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItem = sessionStorage.getItem(`cartItem-${restaurantId}`);
    return storedCartItem ? JSON.parse(storedCartItem) : [];
  });

  const addToCart = (menuItem: menuItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem.id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem.id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            id: menuItem._id,
            dishname: menuItem.dishname,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItem-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const removeOne = (menuItem: menuItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem.id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem.id === menuItem._id && cartItem.quantity !== 0
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            id: menuItem._id,
            dishname: menuItem.dishname,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItem-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  ///////
  if (isLoading || !restaurant) {
    return "Loading...";
  }

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem.id !== item.id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckOut = async(Formdata: UserformData) => {
    console.log(Formdata);

    const checkoutdata = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemid: cartItem.id,
        dishname: cartItem.dishname,
        quantity:cartItem.quantity.toString()
      })),
      deliveryDetails:{
        email:Formdata.email as string,
        name:Formdata.name,
        address:Formdata.address1,
        city:Formdata.city,
        country:Formdata.country
      },
      restaurantId:restaurant._id
    };
    const data = await CreateCheckoutsession(checkoutdata)
    window.location.href=data.url
    console.log(data)
  };
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 lg:px-15 ">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              menuItem={menuItem}
              AddToCart={() => addToCart(menuItem)}
              removeOne={() => removeOne(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummery
              restaurant={restaurant}
              cartItem={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckOut={onCheckOut}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

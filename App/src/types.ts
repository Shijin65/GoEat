import { User } from "@auth0/auth0-react";

export type user = {
  _id: string;
  name: string;
  email: string;
  address1: string;
  city: string;
  country: string;
};
export type menuItem = {
  _id: string;
  dishname: string;
  price: number;
};
export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryCharge: number;
  deliveryTime: number;
  cuisines: string[];
  menuItems: menuItem[];
  imageUrl: string;
  lastUpdated: string;
};
export type RestaurentSearchResponse ={
  data :Restaurant[],
  pagination:{
    total:number,
    page:number,
    pages:number
  }
}
export type orderstatus ="placed"| "paid"| "inProgress"| "outForDelivery"| "delivered"
export type Order ={
  _id:string;
  user:User;
  restaurant :Restaurant;
  cartItems: {
    menuItemid: string;
    dishname: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    address: string;
    city: string;
    country: string;
  };
  totalAmount:number;
  status:orderstatus;
  createdAt:string;
  restaurantId:string;
}

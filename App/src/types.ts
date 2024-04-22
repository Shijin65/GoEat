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
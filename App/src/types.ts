export type user ={
    _id : string;
    name: string;
    email:string;
    address1:string;
    city:string;
    country:string;
}
export type menuItem={
    _id : string;
    name:string;
    price:number
}
export type Restaurant ={
    _id : string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryCharge: number
    deliveryTime: number
    cuisin: string[];
    menuItem: menuItem[]
    imageFile: string;
    lastUpdated:string
}
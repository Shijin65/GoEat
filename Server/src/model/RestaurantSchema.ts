import mongoose from "mongoose";
const menuItemSchema= new mongoose.Schema({
    dishname:{type :String},
    price:{type:Number}
})
const RestaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, require: true },
  city: { type: String, require: true },
  country: { type: String, require: true },
  deliveryCharge: { type: Number, require: true },
  deliveryTime: { type: Number, require: true },
  cuisines: [{ type: String, require: true }],
  menuItems: [menuItemSchema],
  imageUrl: { type: String, require: true },
  lastupdate: { type: Date, require: true },
});


const Restaurant = mongoose.model("Restaurant",RestaurantSchema)
export default Restaurant;
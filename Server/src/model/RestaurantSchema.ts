import mongoose, { InferSchemaType } from "mongoose";
const menuItemSchema = new mongoose.Schema({
  _Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  dishname: { type: String, required: true },
  price: { type: Number, required: true },
});

export type MenuItemType = InferSchemaType<typeof menuItemSchema>;

const RestaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryCharge: { type: Number, required: true },
  deliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemSchema],
  imageUrl: { type: String, required: true },
  lastupdate: { type: Date, required: true },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
export default Restaurant;

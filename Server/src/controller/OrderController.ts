import { Request, Response } from "express";
import strip, { Stripe } from "stripe";
import Restaurant, { MenuItemType } from "../model/RestaurantSchema";
import Order from "../model/Order";

const STRIPE = new strip(process.env.STRIP_SECRET_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_BASEURL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET as string;


const getOrderDetails =async(req: Request, res: Response)=>{
  try {
    const orders=await Order.find({user:req.userId}).populate("restaurant").populate("user");
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wronge"})
  }
}
type CheckoutSession = {
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
  restaurantId: string;
};

const stripeWebHookHandler = async (req: Request, res: Response) => {
  // console.log("RECEIVED EVENT");
  // console.log("==============");
  // console.log("EVENT :",req.body);
  // res.send();
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig as string,
      STRIPE_ENDPOINT_SECRET
    );
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(`webhook error : ${error.message}`);
  }
  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    order.totalAmount=event.data.object.amount_total
    order.status= "paid";
    await order.save();

  }
};

const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const CheckoutSessionrequest: CheckoutSession = req.body;
    const restaurant = await Restaurant.findById(
      CheckoutSessionrequest.restaurantId
    );

    if (!restaurant) {
      throw new Error("Restaurant Not Found");
    }
    const LineItems = creatLineItem(
      CheckoutSessionrequest,
      restaurant.menuItems
    );
    const newOrder = new Order({
      restaurant: restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails: CheckoutSessionrequest.deliveryDetails,
      cartItems: CheckoutSessionrequest.cartItems,
      createdAt: new Date(),
    });
    const Session = await createSession(
      LineItems,
      newOrder._id.toString(),
      restaurant.deliveryCharge,
      restaurant._id.toString()
    );

    if (!Session.url) {
      return res
        .status(500)
        .json({ message: "error createing stripe session" });
    }

    await newOrder.save();

    res.json({ url: Session.url });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.raw.message });
  }
};

const creatLineItem = (
  CheckoutSession: CheckoutSession,
  menuitems: MenuItemType[]
) => {
  const lineitem = CheckoutSession.cartItems.map((cartitem) => {
    console.log(cartitem.menuItemid);
    const menuitem = menuitems.find(
      (item) => item._id.toString() === cartitem.menuItemid.toString()
    );
    if (!menuitem) {
      throw new Error(`MenuItem Not Found ${cartitem.menuItemid}`);
    }
    const Line_Item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "inr",
        unit_amount: menuitem.price,
        product_data: {
          name: menuitem.dishname,
        },
      },
      quantity: parseInt(cartitem.quantity),
    };
    return Line_Item;
  });
  return lineitem;
};

const createSession = async (
  LineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryCharge: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: LineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: { amount: deliveryCharge, currency: "inr" },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancellled=true`,
  });

  return sessionData;
};
export default { getOrderDetails,createCheckoutSession, stripeWebHookHandler };

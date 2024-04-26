import { Request, Response } from "express";
import strip, { Stripe } from "stripe";
import Restaurant, { MenuItemType } from "../model/RestaurantSchema";

const STRIPE = new strip(process.env.STRIP_SECRET_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL;

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
  };
  restaurantId: string;
};
const createCheckoutSession = async (req: Request, res: Response) => {
  try {
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

    const Session = await createSession(
      LineItems,
      "TEST_ORDER_ID",
      restaurant.deliveryCharge,
      restaurant._id.toString()
    );

    if (!Session.url) {
      return res
        .status(500)
        .json({ message: "error createing stripe session" });
    }
    res.json({url:Session.url})
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
    const menuitem = menuitems.find(
      (item) => item._Id.toString() === cartitem.menuItemid.toString()
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
export default { createCheckoutSession };

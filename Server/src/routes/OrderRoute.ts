
import Express from 'express'
import { jwtCheck, jwtparse } from '../middlewear/auth'
import OrderController from '../controller/OrderController'
const route=Express.Router()
route.get("/",jwtCheck,jwtparse,OrderController.getOrderDetails)
route.post("/checkout/create-checkout-session",jwtCheck,jwtparse,OrderController.createCheckoutSession)
route.post("/checkout/webhook",OrderController.stripeWebHookHandler)
export default route
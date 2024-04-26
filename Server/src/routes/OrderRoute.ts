
import Express from 'express'
import { jwtCheck, jwtparse } from '../middlewear/auth'
import OrderController from '../controller/OrderController'
const route=Express.Router()

route.post("/checkout/create-checkout-session",jwtCheck,jwtparse,OrderController.createCheckoutSession)

export default route
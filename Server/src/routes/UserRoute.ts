import express from 'express'
import UserController from '../controller/UserController'
import { jwtCheck, jwtparse } from '../middlewear/auth'
import { validatemyuserrequest } from '../middlewear/validation'
const router = express.Router()

router.post("/",jwtCheck, UserController.CreateCurrentUser)
router.put("/",jwtCheck,jwtparse,validatemyuserrequest, UserController.UpdateCurrentUser)

export default router
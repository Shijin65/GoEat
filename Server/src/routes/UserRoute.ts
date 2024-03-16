import express from 'express'
import UserController from '../controller/UserController'
import { jwtCheck } from '../middlewear/auth'
const router = express.Router()

router.post("/",jwtCheck, UserController.CreateCurrentUser)
router.put("/",jwtCheck, UserController.UpdateCurrentUser)

export default router
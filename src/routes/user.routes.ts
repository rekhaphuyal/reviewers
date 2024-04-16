/* eslint-disable @typescript-eslint/no-unsafe-argument */

// import { getAll } from '../controllers/todo.controller'



import express from 'express'
import { isAdmin} from '../middlewares/authentication.middlewares'
import { validate } from '../utils/validate'
import * as UserController from '../controllers/user.controllers'
import { createUserDto } from '../validators/create.user.validators'
const route = express.Router()

route.get('/', UserController.login)

route.post('/login', UserController.login)

route.post(`/signup`, validate(createUserDto), UserController.createUser)




export default route;



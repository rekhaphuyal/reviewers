 import { NextFunction, Request, Response } from "express"
 import * as TodoController from '../controllers/todo.controller'


 /* eslint-disable @typescript-eslint/no-unsafe-argument */
 import express from 'express'
 import { getAll } from '../controllers/todo.controller'
 import { validate } from '../utils/validate'
 import { createTodoSchema } from '../validators/create-post.validators'
 import { authenticateToken, isAdmin } from "../middlewares/authentication.middlewares"
 const route = express.Router()


 route.get('/', authenticateToken, TodoController.getAll)

 route.post('/', validate(createTodoSchema), authenticateToken, TodoController.create)

 route.delete('/:id',authenticateToken, TodoController.remove)

 route.patch('/:id', TodoController.update)
 route.get('/:id',TodoController.Get)


 export default route;

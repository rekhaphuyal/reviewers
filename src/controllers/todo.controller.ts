import e, { NextFunction, Request, Response, request, response } from "express"
 import * as TodoService from '../services/todo.service'
 import Httpstatus from "http-status-codes"
import { findTodoById } from "../services/restro.service"
 export const getAll = async (req: Request, res: Response, next: NextFunction) => {
   const loggedInUserId = (req as any).user.userId
   const todos = await TodoService.getAll(loggedInUserId)
   res.send(todos)
 }

 export const create = async (req: Request, res: Response, next: NextFunction) => {
   const todo: any = req.body
   const loggedInUserId = (req as any).user.userId

   console.log(req.body, ' is request body')
   const todos = await TodoService.postTodos(todo,loggedInUserId )
   res.status(Httpstatus.CREATED).send(todos)
   ''
   

 }



 export const update = async(req: Request, res: Response, next: NextFunction) => {
   const todo: any = req.body
   
   
 }
 export const remove = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id)
   console.log(id, ' request params ko id yo ho hai')
   try{
     const todos = TodoService.remove(id)
   res.status(Httpstatus.NO_CONTENT).send()
 
     }catch(e){
       next(e )
     }
   }


 export const Get = async(req: Request, res: Response, next: NextFunction) => {
   const id = Number(req.params.id)
  
    try{
     const todos = await TodoService.Get(id)
     console.log('line 36?')
     res.send(todos)
  } catch(e: any) {
     console.log('controller ma ayo?')
     next(e)
   }
 }


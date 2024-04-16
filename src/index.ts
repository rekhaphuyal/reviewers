import express from 'express'
//import todoRouter from './routes/todo.routes'
import userRouter from './routes/user.routes'
import cors from 'cors'
import { genericErrorHandler } from './middlewares/error.middlewares'
const PORT = 3000
const app = express()


app.use(cors())
app.use(express.json())
app.use('/users', userRouter)
//app.use('/todos', todoRouter)
app.listen(PORT, () => {
    
  console.log('Running on port', PORT);
})
app.use(genericErrorHandler)

export default app;
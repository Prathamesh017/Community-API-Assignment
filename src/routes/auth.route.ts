import { Router } from 'express'
import { loginUser, registerUser,getMe } from '../controller/auth.controller'
import verifyToken from '../middleware/middleware'
const authRouter = Router()

authRouter
  .post('/signup', registerUser)
  .post('/signin', loginUser)
  .get("/me",verifyToken,getMe)


export default authRouter
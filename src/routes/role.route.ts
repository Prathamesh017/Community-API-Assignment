import { Router } from 'express'
import { createRole, getAllRoles } from '../controller/role.controller'

const roleRouter = Router()

roleRouter.get("/", getAllRoles)
  .post('/', createRole)



export default roleRouter
import { Router } from 'express'

import verifyToken, { authorizeScope } from '../middleware/middleware'
import { createMember, deleteMember } from '../controller/member.controller'

const memberRouter = Router()

memberRouter.post("/",verifyToken,authorizeScope("member-add"), createMember).delete("/:id",verifyToken,authorizeScope("member-remove"), deleteMember)





export default memberRouter
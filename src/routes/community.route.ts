import { Router } from 'express'
import { createCommunity, getAllCommunities, getMyCommunity, getAllMembersOfACommunity, getAllCommunityJoinedByme } from '../controller/community.controller'
import verifyToken from '../middleware/middleware'

const communityRouter = Router()

communityRouter.get("/me/members", verifyToken, getAllCommunityJoinedByme).get("/:id/members", getAllMembersOfACommunity).post('/', verifyToken, createCommunity).get("/", getAllCommunities).get("/me/owner", verifyToken, getMyCommunity)


export default communityRouter
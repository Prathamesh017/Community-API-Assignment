import { Request, Response } from "express"
import { CustomRequest } from "../middleware/middleware";
import { communityValidation } from "../validators/validator";
import { IDGenerator, createMemberFunc, createSlug } from "../utility/utility";
import { communityModel } from "../models/community.model";
import { roleModel } from "../models/role.model";
import { memberModel } from "../models/member.model";

// @api-  v1/community POST
//@desc - create Community
//@access - protected  requires token
export const createCommunity = async (req: Request, res: Response) => {
  try {
    let id = (req as CustomRequest).user.id;
    const { error } = communityValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        "status": false,
        "message": error.message
      })
    }
    const { name } = req.body;
    const community = new communityModel({
      _id: await IDGenerator(),
      name,
      slug: createSlug(name),
      ownerId: id,

    });
    await community.save();
    if (community) {
      const adminRole = await roleModel.findOne({ name: "Community Admin" }).select("id");
      if (adminRole) {
        await createMemberFunc(community.id, adminRole.id, id);
      }
      res.status(200).json({
        "status": true,
        "content": {
          "data": community,
        }
      })
    }
  } catch (err: any) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

// @api-  v1/community GET
//@desc - get all Communites
//@access - public 
export const getAllCommunities = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Current page (default to 1)
    const perPage = parseInt(req.query.perPage as string) || 5; // 5 communites per page default
    const allCommunities = await communityModel.find({}).skip((page - 1) * perPage)
      .limit(perPage).populate({
        path: 'ownerId',
        select: 'id name'
      });

    const meta = {
      total: allCommunities.length,
      pages: Math.ceil(allCommunities.length / perPage),
      page: page,
    };


    return res.status(200).json({
      "status": true,
      "content": {
        meta,
        "data": allCommunities,

      }
    })


  } catch (error: any) {
    return res.status(400).json({
      status: 'failure',
      message: error.message,
    })
  }

}

// @api-  v1/community/me/owner GET
//@desc - get all loggedUser Communites
//@access - protected requires token
export const getMyCommunity = async (req: Request, res: Response) => {
  try {
    let id = (req as CustomRequest).user.id;
    const page = parseInt(req.query.page as string) || 1; // Current page (default to 1)
    const perPage = parseInt(req.query.perPage as string) || 5; // 5 communites per page default
    const myCommunities = await communityModel.find({ ownerId: id }).skip((page - 1) * perPage)
      .limit(perPage)

    const meta = {
      total: myCommunities.length,
      pages: Math.ceil(myCommunities.length / perPage),
      page: page,
    };


    return res.status(200).json({
      "status": true,
      "content": {
        meta,
        "data": myCommunities,

      }
    })


  } catch (error: any) {
    return res.status(400).json({
      status: 'failure',
      message: error.message,
    })
  }

}


// @api-  v1/community/:id/members GET
//@desc - get all members of a  Community
//@access - public
export const getAllMembersOfACommunity = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const page = parseInt(req.query.page as string) || 1; // Current page (default to 1)
    const perPage = parseInt(req.query.perPage as string) || 5;
    const membersList = await memberModel.find({ communityId: id }).skip((page - 1) * perPage)
      .limit(perPage).populate({
        path: 'userId',
        select: 'id name'
      }).populate({
        path: 'roleId',
        select: 'id name'
      })
    const meta = {
      total: membersList.length,
      pages: Math.ceil(membersList.length / perPage),
      page: page,
    };


    return res.status(200).json({
      "status": true,
      "content": {
        meta,
        "data": membersList,

      }
    })
  } catch (err: any) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

// @api-  v1/community/me/members GET
//@desc - get all communities joined logged in user
//@access - protected access token
export const getAllCommunityJoinedByme = async (req: Request, res: Response) => {
  try {
    let id = (req as CustomRequest).user.id;

    const page = parseInt(req.query.page as string) || 1; // Current page (default to 1)
    const perPage = parseInt(req.query.perPage as string) || 5;
    const communityIds = await memberModel.find({ userId: id }).select({ _id: false, communityId: true });
    const communtiyIdsArray = communityIds.map((community) => { return community.communityId });

    const communityList = await communityModel.find({ _id: { $in: communtiyIdsArray } }).skip((page - 1) * perPage)
      .limit(perPage).populate({
        path: 'ownerId',
        select: 'id name'
      })
    const meta = {
      total: communityList.length,
      pages: Math.ceil(communityList.length / perPage),
      page: page,
    };


    return res.status(200).json({
      "status": true,
      "content": {
        meta,
        "data": communityList,

      }
    })
  } catch (err: any) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
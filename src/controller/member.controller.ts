import { Request, Response } from "express";
import { memberModel } from "../models/member.model";
import { IDGenerator, createMemberFunc } from "../utility/utility";
import { memberValidation } from "../validators/validator";
import { communityModel } from "../models/community.model";
import { userModel } from "../models/user.model";
import { CustomRequest } from "../middleware/middleware";

// @api v1/member POST
//@desc Create A Member
//@access protected requires token and scope based authorization
export const createMember = async (req: Request, res: Response) => {
  try {
    const { error } = memberValidation.validate(req.body);
    let id = (req as CustomRequest).user.id;
    if (error) {
      return res.status(400).json({
        "status": false,
        "message": error.message
      })
    }
    const { community, role, user } = req.body;
    const communityDetails = await communityModel.find({ _id: community });
    const userDetails = await userModel.find({ _id: user });
    if (communityDetails.length === 0 || userDetails.length === 0) {
      return res.status(400).json({
        status: 'failure',
        message: "Invalid Data Provided",
      })
    }
    const { ownerId } = communityDetails[0];
    if (ownerId !== id) {
      return res.status(400).json({
        status: 'failure',
        message: "Only Owner Can Add Members",
      })
    }
    const member = await createMemberFunc(community, role, user);

    if (member) {
      res.status(201).json({
        "status": true,
        "content": {
          "data": member,
        }
      }
      )
    }
  }
  catch (err: any) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
// @api v1/member/:id DELETE
//@desc DELETE A Member
//@access protected requires token and scope based authorization
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const member = await memberModel.findOne({ _id });
    if (!member) {
      return res.status(404).json({
        "status": false,
        "message": "Member Not Found"
      })
    }
    await memberModel.findByIdAndDelete({ _id })
    return res.status(200).json({
      "status": true
    })

  }
  catch (err: any) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
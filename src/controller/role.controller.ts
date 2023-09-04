import { Request, Response } from "express";
import { roleValidation } from "../validators/validator";
import { roleModel } from "../models/role.model";
import { IDGenerator } from "../utility/utility";

// @api v1/role POST
//@desc Create A Role
//@access public
export const createRole = async (req: Request, res: Response) => {
  try {
    const { error } = roleValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        "status": false,
        "message": error.message
      })
    }
    const { name,scopes } = req.body;

    const role = new roleModel({
      _id: await IDGenerator(),
      name,
      scopes,
    });
    await role.save();
    if (role) {
      return res.status(201).json({
        "status": true,
        "content": {
          "data": {
            "id": role.id,
            "name": role.name,
            "created_at": role.createdAt,
            "updated_at": role.updatedAt,

          },

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

// @api v1/role POST
//@desc Get all Roles
//@access public
export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Current page (default to 1)
    const perPage = parseInt(req.query.perPage as string) || 3; // 3 roles per page default
    const roles = await roleModel.find({}).skip((page - 1) * perPage)
      .limit(perPage);;
    if (!roles) {
      return res.status(404).json({
        "status": false,
        "message": "Roles Not Found"
      })
    }
    const meta = {
      total: roles.length,
      pages: (roles.length / perPage),
      page: page,
    };


    return res.status(200).json({
      "status": true,
      "content": {
         meta,
        "data": roles,

      }
    })


  } catch (error: any) {
    return res.status(400).json({
      status: 'failure',
      message: error.message,
    })
  }

}
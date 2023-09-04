import { Request, Response } from 'express';
import { userLoginValidation, userRegisterValidation } from '../validators/validator';
import { hashPassword, generateToken, validatePassword, IDGenerator } from '../utility/utility';
import { userModel } from '../models/user.model';
import { CustomRequest } from '../middleware/middleware';
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { error } = userRegisterValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        "status": false,
        "message": error.message
      })
    }
    const { name, email, password } = req.body;
    const emailAlreadyExists = await userModel.findOne({ email })
    if (emailAlreadyExists) {
      return res.status(409).json({
        "status": false,
        "message": "User Alreay Exists"
      })
    }
    const hashedPassword = await hashPassword(password);


    const user = new userModel({
      _id: await IDGenerator(),
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    if (user) {
      let token = await generateToken(user.id)

      res.status(201).json({
        "status": true,
        "content": {
          "data": {
            "_id": user.id,
            "name": user.name,
            "email": user.email,
            "created_at": user.createdAt,
          },
          "meta": {
            "access_token": token
          }
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


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { error } = userLoginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        "status": false,
        "message": error.message
      })
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({
        "status": false,
        "message": "User Not Found"
      })
    }
    const isPasswordCorrect = await validatePassword(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        "status": false,
        "message": "Invalid Creditanals"
      })
    }
    if (user) {
      let token = await generateToken(user.id)
      let { password, ...userObj } = user;
      res.status(201).json({
        "status": true,
        "content": {
          "data": {
            "_id": user.id,
            "name": user.name,
            "email": user.email,
            "created_at": user.createdAt
          },
          "meta": {
            "access_token": token
          }
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


export const getMe = async (req: Request, res: Response) => {
  try {
    let _id = (req as CustomRequest).user.id;
    const user = await userModel.findOne({ _id }).select("-password");
    if (!user) {
      return res.status(404).json({
        "status": false,
        "message": "User Not Found"
      })
    }

    return res.status(200).json({
      "status": true,
      "content": {
        "data": user,

      }
    })


  } catch (error: any) {
    return res.status(400).json({
      status: 'failure',
      message: error.message,
    })
}

}







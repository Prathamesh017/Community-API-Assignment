import { Request, Response, NextFunction } from "express"
import jwt, { Secret} from 'jsonwebtoken'


interface jwtPayload {
  id: string;
}
export interface CustomRequest extends Request {
  user: jwtPayload;
}
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const SECRET_KEY: Secret = process.env.SECRET as string;
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res
        .status(403)
        .json({ message: 'A token is required for authentication' })
    }
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).user = decoded as jwtPayload;

      next()
    } catch (err) {
      console.log(err)
      return res.status(401).json({ message: 'No Authorization' })
    }
  } else {
    return res.status(401).json({ message: 'No Authorization, No Token' })
  }
}
export default verifyToken
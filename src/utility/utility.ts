import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Snowflake } from "@theinternetfolks/snowflake";

// @description - to hash and secure password
export const hashPassword = async (password: string) => {
  try {
    let saltRounds: number = 10
    let hash: string = await bcrypt.genSalt(saltRounds)
    let hashedPassword = await bcrypt.hash(password, hash)
    return hashedPassword
  } catch (e) {
    console.log(e)
  }
}


// @description - to decrypt and match password
export const validatePassword = async (password: string, userPassword: string) => {
  try {
    let isPasswordCorrect = await bcrypt.compare(password, userPassword)

    return isPasswordCorrect ? true : false
  } catch (error) {
    console.log(error)
  }
}

// @description - to generate token for authorization
export const generateToken = async (id: string) => {
 

  const token = jwt.sign({ id }, process.env.SECRET as string, {
    expiresIn: '2h',
  })

  return token
}

export const IDGenerator = async () => {
  return Snowflake.generate();
}
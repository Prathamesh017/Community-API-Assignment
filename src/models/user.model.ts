
import { Schema, model} from 'mongoose';
import { IUser } from '../types/interface';


const userSchema = new Schema<IUser>({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },



})

userSchema.set("timestamps", true);

export const userModel = model<IUser>('User', userSchema);
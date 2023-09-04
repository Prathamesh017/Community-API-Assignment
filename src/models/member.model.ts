
import { Schema, model } from 'mongoose';
import { IMember } from '../types/interface';


const memberSchema = new Schema<IMember>({
  _id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  roleId: {
    type: String,
    ref: 'Role',
    required: true,
  },
  communityId: {
    type: String,
    ref: 'Community',
    required: true,
  }




})

memberSchema.set("timestamps", true);

export const memberModel = model<IMember>('Member', memberSchema);
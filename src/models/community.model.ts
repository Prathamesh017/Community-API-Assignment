
import { Schema, model } from 'mongoose';
import { ICommunity } from '../types/interface';


const communitySchema = new Schema<ICommunity>({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  ownerId: {
    type: String,
    ref: 'User',
    required: true,
  },




})

communitySchema.set("timestamps", true);

export const communityModel = model<ICommunity>('Community', communitySchema);

import { Schema, model } from 'mongoose';
import { IRole } from '../types/interface';


const roleSchema = new Schema<IRole>({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },




})

roleSchema.set("timestamps", true);

export const roleModel = model<IRole>('Role', roleSchema);
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IRole {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

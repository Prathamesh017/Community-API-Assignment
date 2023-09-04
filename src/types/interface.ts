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
  scopes: string[]
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommunity {
  _id: string;
  name: string;
  slug: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IMember {
  _id: string;
  communityId: string;
  userId: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
}

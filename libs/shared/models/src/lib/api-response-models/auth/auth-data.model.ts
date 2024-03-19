import { UserModel } from "../user/user.model";

export interface AuthDataModel {
  token: string;
  refreshToken: string;
  expiresAt: Date;
  user: UserModel;
}
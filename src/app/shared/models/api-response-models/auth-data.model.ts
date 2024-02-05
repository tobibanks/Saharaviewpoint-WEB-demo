import { UserModel } from "./user.model";

export interface AuthDataModel {
  token: string;
  refreshToken: string;
  expiresAt: Date;
  user: UserModel;
}
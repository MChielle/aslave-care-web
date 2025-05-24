import { UserModel } from "./user.model";

export class UserProfileModel {
  id: string;
  name: string;
  disable: boolean;
  userId: string;
  user: UserModel;
}
import { BaseModel } from "../base/base.model";
import { UserModel } from "../user/user.model";

export class ManagerModel extends BaseModel<string> {
  photoPath: string;
  userId: string;
  user: UserModel;
}
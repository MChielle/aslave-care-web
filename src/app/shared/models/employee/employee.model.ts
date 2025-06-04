import { BaseModel } from "../base/base.model";
import { UserModel } from "../user/user.model";

export class EmployeeModel extends BaseModel<string> {
  photoPath: string;
  userId: string;
  user: UserModel;
}
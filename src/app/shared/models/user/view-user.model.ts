import { UserType } from "app/shared/enums/role.enum";
import { UserModel } from "./user.model";
import { BaseModel } from "../base/base.model";

export class ViewUserModel extends BaseModel<string> {    
  name: string;
  disable: boolean;
  email: string;
  phoneNumber: string;  
  role: UserType;
  userId: string;
  user: UserModel;
}
import { UserType } from "app/shared/enums/role.enum";
import { UserModel } from "./user.model";
import { BaseModel } from "../base/base.model";
import { ManagerModel } from "../manager/manager.model";
import { EmployeeModel } from "../employee/employee.model";

export class ViewUserModel extends BaseModel<string> {
  name: string;
  disable: boolean;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  userId: string;
  user: UserModel;

  fromUserModel(model: UserModel) {
    this.id = model.id;
    this.name = model.name;
    this.disable = model.disable;
    this.email = model.email;
    this.phoneNumber = model.phoneNumber;
    this.role = UserType[model.userRoles[0].role.userType];
    this.userId = model.id;
    this.user = model;
    this.password = "";
  }

  fromManagerUserModel(model: ManagerModel) {
    this.id = model.id;
    this.name = model.user.name;
    this.disable = model.user.disable;
    this.email = model.user.email;
    this.phoneNumber = model.user.phoneNumber;
    this.role = UserType[model.user.userRoles[0].role.userType];
    this.userId = model.userId;
    this.user = model.user;
    this.password = "";
  }

  fromEmployeeUserModel(model: EmployeeModel) {
    this.id = model.id;
    this.name = model.user.name;
    this.disable = model.user.disable;
    this.email = model.user.email;
    this.phoneNumber = model.user.phoneNumber;
    this.role = UserType[model.user.userRoles[0].role.userType];
    this.userId = model.userId;
    this.user = model.user;
    this.password = "";
  }
}

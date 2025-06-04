import { UserType } from "app/shared/enums/role.enum";
import { BaseModel } from "../base/base.model";

export class RoleModel extends BaseModel<string> {
    name: string;
    userType: UserType;
}
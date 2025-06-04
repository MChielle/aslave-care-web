import { RoleModel } from "../role/role.model";
import { UserModel } from "../user/user.model";

export class UserRoleModel {
    user: UserModel;
    userId: string;
    role: RoleModel;
    roleId: string;
}
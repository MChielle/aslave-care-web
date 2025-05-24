import { RoleModel } from "../role/role.model";
import { UserModel } from "../user/user.model";

export interface UserRole {
    user: UserModel;
    userId: string;
    role: RoleModel;
    roleId: string;
}
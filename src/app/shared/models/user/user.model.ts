import { BaseModel } from "../base/base.model";
import { UserRoleModel } from "../user-role/user-role.model";
import { UserValidationModel } from "../user-validation/user-validation.model";

export class UserModel extends BaseModel<string> {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    disable: boolean;
    lastLogin: string | null;
    appleUserId: string;
    lastPasswordChangeDate: string | null;
    userRoles: UserRoleModel[];
    userValidationId: string;
    userValidation: UserValidationModel;
    fireBaseCloudMessageToken: string;
}
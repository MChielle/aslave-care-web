import { UserRole } from "../user-role/user-role.model";
import { UserValidationModel } from "../user-validation/user-validation.model";

export class UserModel {
    phoneNumber: string;
    email: string;
    password: string;
    lastLogin: string | null;
    appleUserId: string;
    lastPasswordChangeDate: string | null;
    userRoles: UserRole[];
    userValidationId: string;
    userValidation: UserValidationModel;
    fireBaseCloudMessageToken: string;
}
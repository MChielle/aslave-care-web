import { UserValidationModel } from "../user-validation/user-validation.model";

export class UserSignInModel {
  email: string;
  phoneNumber: string;
  lastLogin: Date;
  lastPasswordChange: Date;
  userValidation: UserValidationModel;
}

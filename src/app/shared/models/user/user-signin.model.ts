import { UserValidationModel } from "../user-validation/user-validation.model";

export class UserSignInModel {
  email: string;
  phoneNumber: string;
  name: string;
  lastLogin: Date;
  lastPasswordChange: Date;
  userValidation: UserValidationModel;
}

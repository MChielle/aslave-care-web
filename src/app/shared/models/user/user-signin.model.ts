import { UserValidationModel } from "../user-validation/user-validation.model";

export class UserSignInModel {
  name: string;
  email: string;
  phoneNumber: string;
  lastLogin: Date;
  lastPasswordChange: Date;
  userValidation: UserValidationModel;
}

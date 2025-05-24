import { BaseModel } from "../base/base.model";

export class UserValidationModel extends BaseModel<string> {
  emailValidated: boolean;
  phoneNumberValidated: boolean;
}

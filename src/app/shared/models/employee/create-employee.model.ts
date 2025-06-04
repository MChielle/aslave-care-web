import { BaseModel } from "../base/base.model";
import { SignUpGenericModel } from "../signup/signup-generic.model";

export class CreateEmployeeModel extends BaseModel<string> {
  PhotoBase64String: string;
  signUp: SignUpGenericModel;
}
import { BaseModel } from "../base/base.model";
import { SignUpGenericModel } from "../signup/signup-generic.model";

export class CreateManagerModel extends BaseModel<string> {
  PhotoBase64String: string;
  signUp: SignUpGenericModel;
}
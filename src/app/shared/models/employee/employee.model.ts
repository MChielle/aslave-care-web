import { BaseModel } from "../base/base.model";
import { UserModel } from "../user/user.model";

export class EmployeeModel extends BaseModel<string>{
        name: string;
        photoPath: string;
        disable: boolean;
        userId: string;
        user: UserModel;
}


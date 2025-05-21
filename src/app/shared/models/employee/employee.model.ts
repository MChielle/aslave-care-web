import { UserSignInModel } from "../user/user-signin.model";

export class EmployeeModel{
        name: string;
        about: string;
        photoPath: string;
        disable: boolean;
        userId: string;
        user: UserSignInModel;
}


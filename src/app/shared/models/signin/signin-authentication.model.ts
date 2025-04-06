import { UserSignInModel } from "../user/user-signin.model";

export class SignInAuthenticationModel {
    access_token: string;
    accressTokenExpiration: Date;
    refresh_Token: string;
    refreshTokenExpiration: Date;
    user: UserSignInModel;    
}
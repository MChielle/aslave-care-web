export class SignInChangePasswordModel{
    oldPassword: string
    newPassword: string

    constructor(oldPassword: string, newPassword: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
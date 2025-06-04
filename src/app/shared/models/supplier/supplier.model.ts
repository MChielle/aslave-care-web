import { BaseModel } from "../base/base.model";

export class SupplierModel extends BaseModel<string> {
    name: string;
    email: string;
    phoneNumber: string;
    disable: boolean;
}
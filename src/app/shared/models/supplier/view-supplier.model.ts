import { FormatHelper } from "app/shared/utils/helpers/format.helper";
import { BaseModel } from "../base/base.model";
import { SupplierModel } from "./supplier.model";

export class ViewSupplierModel extends BaseModel<string> {
    name: string;
    email: string;
    phoneNumber: string;
    formatedPhoneNumber: string;
    disable: boolean;

    constructor(
        private formatHelper: FormatHelper,
        SupplierModel: SupplierModel) {
        super();
        this.id = SupplierModel.id;
        this.name = SupplierModel.name;
        this.email = SupplierModel.email;
        this.phoneNumber = SupplierModel.phoneNumber;
        this.formatedPhoneNumber = this.formatHelper.phoneNumberFormatter(SupplierModel.phoneNumber);
        this.disable = SupplierModel.disable;        
    }
}
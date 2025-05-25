import { FormatHelper } from "app/shared/utils/helpers/format.helper";
import { BaseModel } from "../base/base.model";
import { RegisterOutStockModel } from "../register-out-stock/register-out-stock.model";
import { RegisterOutModel } from "./register-out.model";

export class ViewRegisterOutModel extends BaseModel<string> {
  number: number;
  applyDate?: Date;
  formattedApplyDate?: string;
  description: string;
  apply: boolean;
  registerOutStocks: RegisterOutStockModel[];

  constructor(
    private formatHelper: FormatHelper,
    registerOut: RegisterOutModel
  ) {
    super();
    this.id = registerOut.id;
    this.number = registerOut.number;
    this.applyDate = registerOut.applyDate;
    this.formattedApplyDate = this.formatHelper.dateFormatter(
      registerOut.applyDate
    );
    this.description = registerOut.description;
    this.apply = registerOut.apply;
    this.registerOutStocks = registerOut.registerOutStocks;
  }
}

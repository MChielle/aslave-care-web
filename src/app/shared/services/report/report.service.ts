import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { ResponseBase } from "app/shared/Responses/response-base";
import { ReportNames, StockNames } from "app/shared/utils/names";

@Injectable({
  providedIn: "root",
})
export class ReportService {

      constructor(
        private baseService: BaseService,
        private names: ReportNames
      ) {}
    
    public getRestockReport<TReport>() {
        return this.baseService.get<ResponseBase<TReport[]>>(`${this.names.URL_LOWER_CASE}/restock-report`);
    }

    public getDonationsReport<TReport>(initialDate: Date, finalDate: Date) {
        return this.baseService.get<ResponseBase<TReport[]>>(`${this.names.URL_LOWER_CASE}/donations-report/${initialDate.toISOString()}/${finalDate.toISOString()}`);
    }
}
import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { ResponseBase } from "app/shared/Responses/response-base";
import { ReportNames } from "app/shared/utils/names";

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
  
  public getTopDonors<TReport>() {
    return this.baseService.get<ResponseBase<TReport[]>>(`${this.names.URL_LOWER_CASE}/month-top-donors-report`);
  }
  
  public getStockReport<TReport>() {
    return this.baseService.get<ResponseBase<TReport[]>>(`${this.names.URL_LOWER_CASE}/stock-report`);
  }

  public getConsumptionsReport<TReport>(initialDate: Date, finalDate: Date) {
    return this.baseService.get<ResponseBase<TReport[]>>(`${this.names.URL_LOWER_CASE}/consumptions-report/${initialDate.toISOString()}/${finalDate.toISOString()}`);
  }
}
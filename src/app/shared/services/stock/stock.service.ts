import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { ResponseBase } from "app/shared/Responses/response-base";
import { HttpParams } from "@angular/common/http";
import { StockNames } from "app/shared/utils/names";
import { StocksQuantityWarningModel as StocksQuantityWarningModel } from "app/shared/models/dashboard/stocks-quantity-warning.model";

@Injectable({
  providedIn: "root",
})
export class StockService<TModel> {
  constructor(private baseService: BaseService, private names: StockNames) {}

  public getToList() {
    return this.baseService.get<ResponseBase<TModel[]>>(
      `${this.names.URL_LOWER_CASE}/to-list`
    );
  }

  public create(model) {
    return this.baseService.post<ResponseBase<TModel>>(
      this.names.URL_LOWER_CASE,
      model
    );
  }

  public getByParameters(model: TModel) {
    let params = new HttpParams();
    Object.keys(model).forEach((key) => {
      if (model[key]) params = params.set(key, model[key]);
    });

    return this.baseService.getByParams<ResponseBase<TModel[]>>(
      `${this.names.URL_LOWER_CASE}/get-by-parameters`,
      params
    );
  }

  public softDelete(id: string) {
    return this.baseService.delete<ResponseBase<TModel>>(
      `${this.names.URL_LOWER_CASE}/${id}`
    );
  }

  public getById(id: string) {
    return this.baseService.get<ResponseBase<TModel>>(
      `${this.names.URL_LOWER_CASE}/${id}`
    );
  }

  public update(model) {
    return this.baseService.put<ResponseBase<TModel>>(
      `${this.names.URL_LOWER_CASE}/${model.id}`,
      model
    );
  }

  public getLowerStocks(number: number = 10) {
    return this.baseService.get<ResponseBase<TModel[]>>(
      `${this.names.URL_LOWER_CASE}/lower-stocks/${number}`
    );
  }

  public getTotalStocksQuantityWarning() {
    return this.baseService.get<ResponseBase<StocksQuantityWarningModel>>(
      `${this.names.URL_LOWER_CASE}/total-stocks-quantity-warning`
    );
  }
}

import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { ResponseBase } from "app/shared/Responses/response-base";
import { HttpParams } from "@angular/common/http";
import { RegisterInNames } from "app/shared/utils/names";
import { DonationsPerMonthModel } from "app/shared/models/dashboard/donations-per-month.model";
import { ShoppingPerMonthModel } from "app/shared/models/dashboard/shopping-per-month.model";

@Injectable({
  providedIn: "root",
})
export class RegisterInService<TModel> {
  constructor(
    private baseService: BaseService,
    private names: RegisterInNames
  ) {}

  public getToList() {
    return this.baseService.get<ResponseBase<TModel[]>>(
      `${this.names.API_URL_LOWER_CASE}/to-list`
    );
  }

  public create(model) {
    return this.baseService.post<ResponseBase<TModel>>(
      this.names.API_URL_LOWER_CASE,
      model
    );
  }

  public getByParameters(model: TModel) {
    let params = new HttpParams();
    Object.keys(model).forEach((key) => {
      if (model[key]) params = params.set(key, model[key]);
    });

    return this.baseService.getByParams<ResponseBase<TModel[]>>(
      `${this.names.API_URL_LOWER_CASE}/get-by-parameters`,
      params
    );
  }

  public softDelete(id: string) {
    return this.baseService.delete<ResponseBase<TModel>>(
      `${this.names.API_URL_LOWER_CASE}/${id}`
    );
  }

  public getById(id: string) {
    return this.baseService.get<ResponseBase<TModel>>(
      `${this.names.API_URL_LOWER_CASE}/${id}`
    );
  }

  public update(model) {
    return this.baseService.put<ResponseBase<TModel>>(
      `${this.names.API_URL_LOWER_CASE}/${model.id}`,
      model
    );
  }

  public getByIdToUpdate(id: string) {
    return this.baseService.get<ResponseBase<TModel>>(
      `${this.names.API_URL_LOWER_CASE}/${id}/to-update`
    );
  }

  public getDonationsPerMonth() {
    return this.baseService.get<ResponseBase<DonationsPerMonthModel[]>>(
      `${this.names.API_URL_LOWER_CASE}/donations-per-month`
    );
  }

  public getShoppingPerMonth() {
    return this.baseService.get<ResponseBase<ShoppingPerMonthModel[]>>(
      `${this.names.API_URL_LOWER_CASE}/shopping-per-month`
    );
  }
}

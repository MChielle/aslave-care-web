import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { ResponseBase } from "app/shared/Responses/response-base";
import { SignInNames } from "app/shared/utils/names";

@Injectable({
  providedIn: "root",
})
export class SignInService<TModel> {
  
  constructor(
    private baseService: BaseService,
    private names: SignInNames
  ) {}
    
  public getByToken() {
    return this.baseService.get<ResponseBase<TModel>>(`${this.names.API_URL_LOWER_CASE}/token`);
  }

  public getAnyToList() {
    return this.baseService.get<ResponseBase<TModel[]>>(`${this.names.API_URL_LOWER_CASE}/any-to-list`);
  }
}

import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { ResponseBase } from "app/shared/Responses/response-base";
import { HttpParams } from "@angular/common/http";
import { UserNames } from "app/shared/utils/names";
import { UserProfileModel } from "app/shared/models/user/user-profile.model";

@Injectable({
  providedIn: "root",
})
export class UserService<TModel> {
  
  constructor(
    private baseService: BaseService,
    private names: UserNames
  ) {}
  
  public getToList() {
    return this.baseService.get<ResponseBase<TModel[]>>(`${this.names.URL_LOWER_CASE}/to-list`);
  }
  
  public create(model) {
    return this.baseService.post<ResponseBase<TModel>>(this.names.URL_LOWER_CASE, model);
  }
  
  public getByParameters(model: TModel) {
    let params = new HttpParams();
    Object.keys(model).forEach(key => {
      if(model[key])
        params = params.append(key, model[key]);
    });
    
    return this.baseService.getByParams<ResponseBase<TModel[]>>(`${this.names.URL_LOWER_CASE}/get-by-parameters`, params);
  }
  
  public softDelete(id: string) {
    return this.baseService.delete<ResponseBase<TModel>>(`${this.names.URL_LOWER_CASE}/${id}`);
  }
  
  public getById(id: string) {
    return this.baseService.get<ResponseBase<TModel>>(`${this.names.URL_LOWER_CASE}/${id}`);
  }
  
  public update(model) {
    return this.baseService.put<ResponseBase<TModel>>(`${this.names.URL_LOWER_CASE}/${model.id}`, model);
  }
  
  public getByToken() {
    return this.baseService.get<ResponseBase<UserProfileModel>>(`signin/token`);
  }

  public getAnyToList() {
    return this.baseService.get<ResponseBase<UserProfileModel[]>>(`signin/any-to-list`);
  }
}

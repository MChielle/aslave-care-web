import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { SupplierModel } from "app/shared/models/supplier/supplier.model";
import { ResponseBase } from "app/shared/Responses/response-base";
import { HttpParams } from "@angular/common/http";
import { param } from "jquery";

@Injectable({
  providedIn: "root",
})
export class SupplierService {

  constructor(private baseService: BaseService) {}

  public getToList() {
    return this.baseService.get<ResponseBase<SupplierModel[]>>("supplier/to-list");
  }

  public create(supplier) {
    return this.baseService.post<ResponseBase<SupplierModel>>("supplier", supplier);
  }

  public getByParameters(supplier: SupplierModel) {
    var params = new HttpParams();    
    if(supplier.id) params = params.append('id', supplier.id);
    if(supplier.email) params = params.append('email', supplier.email);
    if(supplier.disable) params = params.append('disable', supplier.disable);
    if(supplier.phoneNumber) params = params.append('phoneNumber', supplier.phoneNumber);

    return this.baseService.getByParams<ResponseBase<SupplierModel[]>>(`supplier/get-by-parameters`, params);
  }

  public softDelete(id: string) {
    return this.baseService.delete<ResponseBase<SupplierModel>>(`supplier/${id}`);
  }

  public getById(id: string) {
    return this.baseService.get<ResponseBase<SupplierModel>>(`supplier/${id}`);
  }

  public update(supplier) {
    return this.baseService.put<ResponseBase<SupplierModel>>(`supplier/${supplier.id}`, supplier);
  }
}

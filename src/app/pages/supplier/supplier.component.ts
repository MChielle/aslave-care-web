import { Component, OnInit } from '@angular/core';
import { SupplierModel } from 'app/shared/supplier/models/supplier-model';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  private supplier: SupplierModel;
  private suppliers: SupplierModel[];

  constructor() { }

  ngOnInit(): void {
    this.getSuppliers();
  }

  async getSuppliers(){
     let response = this.supplierService.getSuppliers();
  }

}

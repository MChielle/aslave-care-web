import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier/supplier.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'app/shared/services/notification/notification.service';
import { SupplierModel } from 'app/shared/models/supplier/supplier.model';
declare var $: any;

type UserFields = 'name' | 'email' | 'phoneNumber';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  public createSupplierForm: FormGroup;
  public formErrors: FormErrors = {
    name: '',
    email: '',
    phoneNumber: '',
  }
  
  constructor(
    private supplierService: SupplierService,
    private notificationService: NotificationService,
    private router: Router,
  ) { 
    this.createSupplierForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),

    });
  }

  ngOnInit(): void {
  }

  showEmailAvailableNotification() {
    const notification = this.notificationService.buildNotification('Conflito, este email pertence a outro cadastro.','warning','bottom','right');
    $.notify(notification.content, notification.format);
  }

  sendSupplierSaveRequest(supplier: SupplierModel) {
      this.supplierService.create(supplier)
      .subscribe(response => {
        if(response.isSuccess) 
          this.router.navigate(['suppliers']);
      })
  }

  createSupplier(){
    const supplier = this.createSupplierForm.value as SupplierModel;    
    supplier.disable = true;
    this.supplierService.getByParameters(supplier)
      .subscribe(response =>
      {
        if(response.isSuccess && !response?.data && this.createSupplierForm.valid)
          this.sendSupplierSaveRequest(supplier);
        else
          this.showEmailAvailableNotification();
      }
    )  
    }catch(error){
      console.log("createSupplier", error);
    };    
}

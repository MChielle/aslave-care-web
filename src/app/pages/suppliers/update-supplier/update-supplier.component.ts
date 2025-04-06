import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validateAdditionalItems } from 'ajv/dist/vocabularies/applicator/additionalItems';
import { SupplierModel } from 'app/shared/models/supplier/supplier.model';
import { NotificationService } from 'app/shared/services/notification/notification.service';
import { SupplierService } from 'app/shared/services/supplier/supplier.service';
import { firstValueFrom } from 'rxjs';
declare var $: any;


type UserFields = 'id' | 'name' | 'email' | 'phoneNumber' | 'disable';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.scss']
})
export class UpdateSupplierComponent implements OnInit {
  public updateSupplierForm: FormGroup;
  public formErrors: FormErrors = {
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    disable: '',
  }
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) { 
    this.updateSupplierForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      disable: new FormControl(false)
    });
  }

  get id() { return this.updateSupplierForm.get('id').value }
  get name() { return this.updateSupplierForm.get('name').value }
  get email() { return this.updateSupplierForm.get('email').value }
  get phoneNumber() { return this.updateSupplierForm.get('phoneNumber').value }
  get disable() { return this.updateSupplierForm.get('disable').value }

  ngOnInit(): void {
    const supplierId = this.route.snapshot.paramMap.get('id');
    firstValueFrom(this.supplierService.getById(supplierId))
    .then(response =>{
      if(response.isSuccess){
        const supplier = response.data as SupplierModel;        
        this.updateSupplierForm.patchValue(supplier);
      }
    })
  }

  showEmailAvailableNotification() {
    const notification = this.notificationService.buildNotification('Conflito, este email pertence a outro cadastro.','warning','bottom','right');
    $.notify(notification.content, notification.format);
  }

  sendUpdateRequest(supplier: SupplierModel) {
    this.supplierService.update(supplier)
    .subscribe(response => {
      if(response.isSuccess) {
        this.router.navigate(['suppliers']);
      }
    })
  }

  update(){
    const supplier = this.updateSupplierForm.value as SupplierModel;
    console.log(supplier);
    console.log(this.updateSupplierForm.valid);
    console.log(this.updateSupplierForm.errors);
    this.supplierService.getByParameters(supplier)
      .subscribe(response =>
      {
        if(response.isSuccess 
          && ((!response?.data[0]) || (response?.data[0]?.id == supplier.id))
          && this.updateSupplierForm.valid){
          this.sendUpdateRequest(supplier);
        }else{
          this.showEmailAvailableNotification();
        }
      }
    )  
    }catch(error){
      console.log("updateSupplier", error);
    };    
}

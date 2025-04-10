import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateRegistryInStockModel } from 'app/shared/models/registry-in-stock/create-registry-in-stock.model';
import { RegistryInSelectedSupply } from 'app/shared/models/registry-in-stock/registry-in-selected-supplies.model';
import { RegistryInStockModel } from 'app/shared/models/registry-in-stock/registry-in-stock.model';
import { CreateRegistryInModel } from 'app/shared/models/registry-in/create-registry-in.model';
import { RegistryInModel } from 'app/shared/models/registry-in/registry-in.model';
import { StockModel } from 'app/shared/models/stock/stock.model';
import { SupplierModel } from 'app/shared/models/supplier/supplier.model';
import { NotificationService } from 'app/shared/services/notification/notification.service';
import { RegistryInService } from 'app/shared/services/registryin/registry-in.service';
import { StockService } from 'app/shared/services/stock/stock.service';
import { SupplierService } from 'app/shared/services/supplier/supplier.service';
import { RegistryInNames } from 'app/shared/utils/names';

declare var $: any;
type UserFields = "supplier" | "supplierId" | "donation" | "description" | "apply" | "registryInStocks";
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-create-registry-in-stock',
  templateUrl: './create-registry-in-stock.component.html',
  styleUrls: ['./create-registry-in-stock.component.scss']
})
export class CreateRegistryInStockComponent implements OnInit {
  public suppliers: SupplierModel[];
  public supplies: StockModel[];
  public supply: string;
  public selectedSupplies: RegistryInSelectedSupply[] = new Array; 
  public registryIn: CreateRegistryInModel = new CreateRegistryInModel();
  public createForm: FormGroup;
  public formErrors: FormErrors = {
    supplier: "",
    supplierId: "",
    donation: "",
    description: "",
    apply: "",
    registryInStocks: "",
  };

  constructor (
    private names: RegistryInNames,
    private fb: FormBuilder,
    private service: RegistryInService<RegistryInModel>,
    private stockService: StockService<StockModel>,
    private supplierService: SupplierService<SupplierModel>,
    private notificationService: NotificationService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.createForm = this.fb.group({
      supplier: new FormControl(''),
      supplierId: new FormControl(''),
      donation: new FormControl(false),
      description: new FormControl(''),
      apply: new FormControl(false),
      registryInStocks: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.supplierService.getToList().subscribe((response)=> {
      if(response.isSuccess) this.suppliers = response.data;
    });
    this.stockService.getToList().subscribe((response) => {
      if(response.isSuccess) this.supplies = response.data;
    });
  }

  showNameAvailableNotification() {
    const notification = this.notificationService.buildNotification(
      "Conflito, este nome pertence a outro cadastro.",
      "warning",
      "bottom",
      "right"
    );
    $.notify(notification.content, notification.format);
  }

  sendCreateRequest(supplier: CreateRegistryInModel) {
    this.service.create(supplier).subscribe((response) => {
      if (response.isSuccess)
        this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
    });
  }

  create() {
    this.createForm.controls['registryInStocks'].setValue(this.selectedSupplies);
    const model = this.createForm.value as CreateRegistryInModel;
    console.log(model);
    this.sendCreateRequest(model);    
  }
  catch(error) {
    console.log("create", error);
  }

  selectSupplier(supplier) {
    this.createForm.controls['supplierId'].setValue(supplier?.id);
    this.createForm.controls['supplier'].setValue(supplier);
    this.cdr.detectChanges();
  }  

  selectSupply(stock) {
    const alreadySelected = this.selectedSupplies.find(x => x.stockId == stock.id);
    if(alreadySelected) return;

    const selectedSupplie = new  RegistryInSelectedSupply;
    selectedSupplie.stockId = stock.id;
    selectedSupplie.name = stock.name;
    selectedSupplie.price = 0;
    selectedSupplie.quantity = 0;
    
    this.selectedSupplies.push(selectedSupplie);
    console.log(this.selectedSupplies);
    //this.createForm.controls['registryInStocks'].setValue(this.selectedSupplies);
  }

  setQuantity(registryInStock: CreateRegistryInModel) {
    console.log(registryInStock);
  }

  setPrice(registryInStock: CreateRegistryInModel) {
    console.log(registryInStock);
  }

  deleteSupply(id: string){
    console.log(id);
    this.selectedSupplies = this.selectedSupplies.filter(x => x.stockId != id);
  }

  onEdit(selectedSupplies: RegistryInSelectedSupply){
    selectedSupplies
  }

  onQuantityChange(supply: RegistryInSelectedSupply){
    console.log(supply);
  }
}

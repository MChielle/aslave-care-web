import { Component, OnInit } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { RegistersInModel } from 'app/shared/models/registries/registries.model';
import { RegistryInModel } from 'app/shared/models/registry-in/registry-in.model';
import { RegistryInService } from 'app/shared/services/registryin/registry-in.service';
import { RegistersNames, RegistryInNames } from 'app/shared/utils/names';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})
export class RegistersComponent implements OnInit {
public models: RegistersInModel[];
public inModels: RegistryInModel[];

  constructor(
    private names: RegistersNames,
    private inNames: RegistryInNames,
    private inService: RegistryInService<RegistryInModel>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllRegistersIn();
  }

  getAllRegistersIn() {
    firstValueFrom(this.inService.getToList())
      .then((response) => {
        if (response.isSuccess) {
          this.models = response.data.map((x)=> { 
            return {
              id: x.id,
              number: x.number,
              name: x.supplier.name,
              apply: x.apply,
              donation: x.donation,
              description: x.description,
          }});
          this.models = this.sortByNumber(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortByNumber(cres: boolean): RegistersInModel[]{
    return cres ? this.models.sort((a , b) => a.number - b.number) : this.models.sort((a , b) => b.number - a.number);

  }

  createNewRegistryIn() {
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }

  softDeleteRegistryIn(id: string) {
    console.log(id);
    firstValueFrom(this.inService.softDelete(id))
      .then((response) => {
        console.log(response);
        this.inModels = this.inModels.filter((x) => x.id !== id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editRegistryIn(id: string) {
    this.router.navigate([`update-${this.inNames.URL_LOWER_CASE}`, id]);
  }

  registryIn() {
    this.router.navigate([`create-${this.inNames.URL_LOWER_CASE}`]);
  }
}

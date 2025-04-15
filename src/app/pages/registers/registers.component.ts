import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistersModel } from 'app/shared/models/registers/registers.model';
import { RegisterInModel } from 'app/shared/models/register-in/register-in.model';
import { RegisterInService } from 'app/shared/services/register-in/register-in.service';
import { RegistersNames, RegisterInNames, RegisterOutNames } from 'app/shared/utils/names';
import { firstValueFrom } from 'rxjs';
import { RegisterOutModel } from 'app/shared/models/register-out/register-out.model';
import { RegisterOutService } from 'app/shared/services/register-out/register-out.service';

@Component({
  selector: 'app-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss']
})
export class RegistersComponent implements OnInit {
public models: RegistersModel[];
public inModels: RegisterInModel[];

  constructor(
    private names: RegistersNames,
    private inNames: RegisterInNames,
    private outNames: RegisterOutNames,
    private inService: RegisterInService<RegisterInModel>,
    private outService: RegisterOutService<RegisterOutModel>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllRegistersIn();
  }

  getAllRegistersIn() {
    firstValueFrom(this.inService.getToList())
      .then((response) => {
        if (response.isSuccess) {
          response.data.map((x)=> { 
            const registerIn = {
              id: x.id,
              number: x.number,
              name: x.supplier.name,
              apply: x.apply,
              donation: x.donation,
              description: x.description,
              applyDate: x.applyDate,
              type: 'in',    
            }

            this.models.push(registerIn);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

      firstValueFrom(this.outService.getToList())
      .then((response) => {
        if (response.isSuccess) {
          response.data.map((x)=> { 
            const registerIn = {
              id: x.id,
              number: x.number,
              name: x.supplier.name,
              apply: x.apply,
              donation: x.donation,
              description: x.description,
              applyDate: x.applyDate,
              type: 'out',
            }

            this.models.push(registerIn);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortByNumber(cres: boolean): RegistersModel[]{
    return cres ? this.models.sort((a , b) => a.number - b.number) : this.models.sort((a , b) => b.number - a.number);

  }

  createNewRegisterIn() {
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }

  softDeleteRegisterIn(id: string) {
      firstValueFrom(this.inService.softDelete(id))
      .then((response) => {
          console.log(response);
          this.inModels = this.inModels.filter((x) => x.id !== id);
      })
      .catch((error) => {
        console.log(error);
      });
    
  }

  editRegisterIn(id: string) {
    this.router.navigate([`update-${this.inNames.URL_LOWER_CASE}`, id]);
  }

  registerIn() {
    this.router.navigate([`create-${this.inNames.URL_LOWER_CASE}`]);
  }

  registerOut() {
    this.router.navigate([`create-${this.outNames.URL_LOWER_CASE}`]);
  }
}

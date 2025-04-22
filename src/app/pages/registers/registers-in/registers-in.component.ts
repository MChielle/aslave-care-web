import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterInModel } from 'app/shared/models/register-in/register-in.model';
import { RegisterInService } from 'app/shared/services/register-in/register-in.service';
import { RegisterInNames } from 'app/shared/utils/names';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-registers-in',
  templateUrl: './registers-in.component.html',
  styleUrls: ['./registers-in.component.scss']
})
export class RegistersInComponent implements OnInit {
public models: RegisterInModel[];

  constructor(
    private names: RegisterInNames,
    private service: RegisterInService<RegisterInModel>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllRegisters();
  }

  getAllRegisters() {
    firstValueFrom(this.service.getToList())
      .then((response) => {
        if (response.isSuccess && response.data[0]) {
          this.models = response.data;
          this.models = this.sortByNumber(this.models, false);
        }        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortByNumber(models: RegisterInModel[], ascendent: boolean): RegisterInModel[] {
    return ascendent
      ? models.sort((a, b) => a.number - b.number)
      : models.sort((a, b) => b.number - a.number);
  }

  createNewRegister() {
    this.router.navigate([this.names.URL_LOWER_CASE_PLURAL]);
  }

  softDeleteRegister(id: string) {
      firstValueFrom(this.service.softDelete(id))
        .then((response) => {
          console.log(response);
          this.models = this.models.filter((x) => x.id !== id);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  navigateToUpdateRegister(id: string) {
    this.router.navigate([`update-${this.names.URL_LOWER_CASE}`, id]);
  }

  navigateToCreateRegister() {
    this.router.navigate([`create-${this.names.URL_LOWER_CASE}`]);
  }
}

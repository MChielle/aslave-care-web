import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RegisterOutModel } from "app/shared/models/register-out/register-out.model";
import { RegisterOutService } from "app/shared/services/register-out/register-out.service";
import { RegisterOutNames } from "app/shared/utils/names";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-registers-out",
  templateUrl: "./registers-out.component.html",
  styleUrls: ["./registers-out.component.scss"],
})
export class RegistersOutComponent implements OnInit {
  public models: RegisterOutModel[];

  constructor(
    private names: RegisterOutNames,
    private service: RegisterOutService<RegisterOutModel>,
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

  sortByNumber(models: RegisterOutModel[], ascendent: boolean): RegisterOutModel[] {
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

  navigateToEditRegister(id: string) {
    this.router.navigate([`update-${this.names.URL_LOWER_CASE}`, id]);
  }

  navigateToCreateRegister() {
    this.router.navigate([`create-${this.names.URL_LOWER_CASE}`]);
  }
}

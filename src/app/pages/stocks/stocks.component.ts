import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockModel } from 'app/shared/models/stock/stock.model';
import { StockService } from 'app/shared/services/stock/stock.service';
import { FormatHelper } from 'app/shared/utils/helpers/format.helper';
import { RegistersNames, RegistryInNames, StockNames } from 'app/shared/utils/names';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StockComponent implements OnInit {
  public models: StockModel[];

  constructor(
    private names: StockNames,
    private registersNames: RegistersNames,
    private service: StockService<StockModel>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    firstValueFrom(this.service.getToList())
      .then((response) => {
        if (response.isSuccess) {
          this.models = response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createNew() {
    this.router.navigate([`create-${this.names.URL_LOWER_CASE}`]);
  }

  softDelete(id: string) {
    console.log(id);
    firstValueFrom(this.service.softDelete(id))
      .then((response) => {
        console.log(response);
        this.models = this.models.filter((x) => x.id !== id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  update(id: string) {
    this.router.navigate([`update-${this.names.URL_LOWER_CASE}`, id]);
  }

  registers() {
    this.router.navigate([this.registersNames.URL_LOWER_CASE]);
  }
}

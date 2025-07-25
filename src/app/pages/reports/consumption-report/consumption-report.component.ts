import { formatDate } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ConsumptionReportModel } from "app/shared/models/report/consumption-report.model";
import { ReportService } from "app/shared/services/report/report.service";
import { environment } from "environments/environment";
import { firstValueFrom } from "rxjs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-consumption-report",
  templateUrl: "./consumption-report.component.html",
  styleUrls: ["./consumption-report.component.scss"],
})
export class ConsumptionReportComponent implements OnInit {
  public propertyLenght;
  public dataSource: MatTableDataSource<ConsumptionReportModel>;
  public initialDate: Date;
  public finalDate: Date;
  public consumptions: ConsumptionReportModel[];
  public displayedColumns: string[] = ["stockName", "stockTypeId", "quantity"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ReportService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getConsumptionsReport() {
    this.initialDate.setHours(0);
    this.initialDate.setMinutes(0);
    this.finalDate.setHours(23);
    this.finalDate.setMinutes(59);

    firstValueFrom(
      this.service.getConsumptionsReport<ConsumptionReportModel>(
        this.initialDate,
        this.finalDate
      )
    )
      .then((response) => {
        if (response.isSuccess && response.data[0]) {
          this.consumptions = response.data;
          this.reloadDataSource();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTotalConsumptions() {
    return this.dataSource.data.reduce((summ, v) => (summ += v.quantity), 0);
  }

  generatePdfConsumptionsReport() {
    const total = this.getTotalConsumptions();

    const tableBody = [
      [
        { text: "Nome", bold: true },
        { text: "Tipo", bold: true },
        { text: "Quantidade", bold: true },
      ],
      ...this.dataSource.data.map((row) => [
        row.stockName?.toString() ?? "",
        row.stockTypeId?.toString() ?? "",
        row.quantity?.toString() ?? "",
      ]),
      [
        { text: "", bold: true },
        { text: "", bold: true },
        { text: total, bold: true },
      ],
    ];

    let docDefinition = {
      language: "pt-BR",
      info: {
        title: "Lista de Consumo no Período",
        author: environment.APPLICATION_NAME,
        subject: "consumption report",
      },
      content: [
        {
          text: "Lista de Consumo",
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          text: `Relatório de suprimentos consumidos no período de ${formatDate(
            this.initialDate,
            "dd/MM/yyyy",
            "en-Us"
          )} até ${formatDate(this.finalDate, "dd/MM/yyyy", "en-Us")}`,
        },
        {
          text: `Data: ${formatDate(Date.now(), "dd/MM/yyyy", "en-US")}`,
          alignment: "right",
          margin: [0, 10, 0, 10],
        },
        {
          layout: "lightHorizontalLines",
          style: "table",
          margin: [0, 0, 0, 100],
          table: {
            headerRows: 1,
            widths: ["auto", "*", "*"],
            body: tableBody,
          },
        },
        {
          text: `Total de items ${this.dataSource.data.length}`,
          bold: true,
          alignment: "right",
          margin: [0, 10, 0, 10],
        },
      ],
      footer: {
        stack: [
          {
            text: `Documento emitido pelo sistema ${environment.APPLICATION_NAME}`,
            alignment: "center",
            fontSize: 10,
          },
        ],
      },
    };

    let pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
  }

  reloadDataSource() {
    this.dataSource = new MatTableDataSource<ConsumptionReportModel>(
      this.consumptions
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

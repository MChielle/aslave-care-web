import { Component, OnInit, ViewChild } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { environment } from "environments/environment";
import { ReportService } from "app/shared/services/report/report.service";
import { StockReportModel } from 'app/shared/models/report/stock-report.model';
import { MatTableDataSource } from '@angular/material/table';
import { StockModel } from 'app/shared/models/stock/stock.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { firstValueFrom } from 'rxjs';
import { formatDate } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss']
})
export class StockReportComponent implements OnInit {
  public propertyLenght;
  public dataSource: MatTableDataSource<StockReportModel>;
  public stocks: StockModel[];
  public displayedColumns: string[] = [
    "stockName",
    "stockTypeId",
    "quantity",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ReportService) {}

  ngOnInit(): void {
    this.getStockReport();
  }

  getStockReport() {
    firstValueFrom(this.service.getStockReport<StockModel>())
      .then((response) => {
        if (response.isSuccess) {
          this.stocks = response.data;
          this.reloadDataSource();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generatePdfStockReport() {
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
    ];

    let docDefinition = {
      language: "pt-BR",
      info: {
        title: "Lista de Estoque",
        author: environment.APPLICATION_NAME,
        subject: "restock report",
      },
      content: [
        {
          text: "Lista de Estoque",
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          text: "Relatório de suprimentos em estoque.",
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
    console.log(pdf);
    pdf.open();
  }

  reloadDataSource() {
    let source = this.stocks.map(
      (x) =>
        new StockReportModel(
          x.name,
          x.stockTypeId,
          x.quantity,
        )
    );

    this.dataSource = new MatTableDataSource<StockReportModel>(source);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
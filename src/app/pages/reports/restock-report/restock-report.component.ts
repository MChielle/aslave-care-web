import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { RestockReportModel } from "app/shared/models/report/restock-report.model";
import { StockModel } from "app/shared/models/stock/stock.model";
import { StockService } from "app/shared/services/stock/stock.service";
import { firstValueFrom } from "rxjs";
import { formatDate } from "@angular/common";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-restock-report",
  templateUrl: "./restock-report.component.html",
  styleUrls: ["./restock-report.component.scss"],
})
export class RestockReportComponent implements OnInit {
  public propertyLenght;
  public dataSource: MatTableDataSource<RestockReportModel>;
  public stocks: StockModel[];
  public displayedColumns: string[] = [
    "name",
    "supplierName",
    "stockTypeId",
    "quantity",
    "lowerPrice",
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: StockService<StockModel>) {}

  ngOnInit(): void {
    this.getRestockReport();
  }

  getRestockReport() {
    firstValueFrom(this.service.getRestockReport())
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

  generatePdfRestockReport() {
    const tableHeader = [
      [
        { text: "Nome", bold: true },
        { text: "Fornecedor", bold: true },
        { text: "Tipo", bold: true },
        { text: "Quantidade", bold: true },
        { text: "Menor Preço", bold: true },
      ],
      ...this.dataSource.data.map((row) => [
        row.name?.toString() ?? "",
        row.supplierName?.toString() ?? "",
        row.stockTypeId?.toString() ?? "",
        row.quantity?.toString() ?? "",
        row.lowerPrice
          ? `R$ ${row.lowerPrice.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          : "R$ 0,00",
      ]),
    ];

    let docDefinition = {
      language: "pt-BR",
      info: {
        title: "Lista de compras",
        author: "Aslave Care",
        subject: "restock report",
      },
      content: [
        {
          text: "Lista de compras",
          bold: true,
          fontSize: 20,
          alignment: "center",
          margin: [0, 0, 0, 20],
        },
        {
          text: "Relatório de suprimentos com estoque abaixo do limite.",
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
            widths: ["auto", "auto", "auto", "*", "*"],
            body: tableHeader,
          },
        },
      ],
    };

    let pdf = pdfMake.createPdf(docDefinition);
    console.log(pdf);
    pdf.open();
  }

  // downloadRestockReport() {
  //   const tableHeader = [
  //     { text: "Nome", bold: true },
  //     { text: "Fornecedor", bold: true },
  //     { text: "Tipo", bold: true },
  //     { text: "Quantidade", bold: true },
  //     { text: "Menor Preço", bold: true },
  //   ];

  //   const tableData = [
  //     ...this.dataSource.data.map((row) => [
  //       row.name ?? "",
  //       row.supplierName ?? "",
  //       row.stockTypeId ?? "",
  //       row.quantity ?? "",
  //       row.lowerPrice ?? "",
  //     ]),
  //   ];

  //   const tableBody = [
  //     {
  //       headerRows: 1,
  //       widths: ["*", "*", "*", "*", "auto"],
  //       body: [
  //         tableHeader,
  //         //tableData
  //       ],
  //     },
  //   ];

  //   let docDefinition = {
  //     language: "pt-BR",
  //     info: {
  //       title: "Lista de compras",
  //       author: "Aslave Care",
  //       subject: "restock report",
  //     },
  //     content: [
  //       {
  //         text: "Lista de compras",
  //         bold: true,
  //         fontSize: 20,
  //         alignment: "center",
  //         margin: [0, 0, 0, 20],
  //       },
  //       {
  //         text: "Relatório de suprimentos com estoque abaixo do limite.",
  //       },
  //       {
  //         text: `Data: ${formatDate(Date.now(), "dd/MM/yyyy", "en-US")}`,
  //         alignment: "right",
  //         margin: [0, 10, 0, 10],
  //       },
  //       {
  //         layout: "lightHorizontalLines",
  //         style: "table",
  //         margin: [0, 0, 0, 100],
  //         table: [
  //           { text: "Nome", bold: true },
  //           { text: "Fornecedor", bold: true },
  //           { text: "Tipo", bold: true },
  //           { text: "Quantidade", bold: true },
  //           { text: "Menor Preço", bold: true },
  //         ],
  //       },
  //     ],
  //   };

  //   let pdf = pdfMake.createPdf(docDefinition);
  //   console.log(pdf);
  //   pdf.open();
  // }

  reloadDataSource() {
    let source = this.stocks.map(
      (x) =>
        new RestockReportModel(
          x.name,
          x.registerInStocks[0].registerIn.supplier.name,
          x.stockTypeId,
          x.quantity,
          x.registerInStocks[0].price
        )
    );

    this.dataSource = new MatTableDataSource<RestockReportModel>(source);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

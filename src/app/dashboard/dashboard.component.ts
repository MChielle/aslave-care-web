import { Component, OnInit } from "@angular/core";
import { DonationsPerMonthModel } from "app/shared/models/dashboard/donations-per-month.model";
import { RegisterInModel } from "app/shared/models/register-in/register-in.model";
import { RegisterOutModel } from "app/shared/models/register-out/register-out.model";
import { StockModel } from "app/shared/models/stock/stock.model";
import { RegisterInService } from "app/shared/services/register-in/register-in.service";
import { RegisterOutService } from "app/shared/services/register-out/register-out.service";
import { StockService } from "app/shared/services/stock/stock.service";
import * as Chartist from "chartist";

//TODO: Adicionar stockLowWarning na dashboard


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  public stocks: StockModel[] = new Array();
  public lowerStock: number = 5;
  public actualMonthDonations: number = 0;
  public actualMonthShopping: number = 0;
  public actualMonthConsumptions: number = 0;

  constructor(
    private stockService: StockService<StockModel>,
    private registerInService: RegisterInService<RegisterInModel>,
    private RegisterOutService: RegisterOutService<RegisterOutModel>
  ) {}

  getLowerStocks() {
    this.stockService.getLowerStocks(this.lowerStock).subscribe((response) => {
      if (response.isSuccess) this.stocks = response.data;
    });
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }

  ngOnInit() {
    this.getLowerStocks();
    this.buildDonationsChart();
    this.buildConsumptionsChart();
    this.buildShoppingChart();
  }

  buildShoppingChart(){
    this.registerInService.getShoppingPerMonth().subscribe((response) => {
      if (!response.isSuccess) return;
      const shoppingPerMonth = response.data;
      let labels: string[] = new Array();
      let series: number[] = new Array();

      shoppingPerMonth.forEach((item) => {
        labels.unshift(item.month);
        series.unshift(item.total);
      });

      this.actualMonthShopping = shoppingPerMonth[0]?.total ?? 0;

      const dataShoppingChart: any = {
        labels: labels,
        series: [series],
      };
  
      const optionsShoppingChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 500,
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
      };
  
      var dailyShoppingChart = new Chartist.Line(
        "#dailySalesChart",
        dataShoppingChart,
        optionsShoppingChart
      );
  
      this.startAnimationForLineChart(dailyShoppingChart);
    });
  }

  buildConsumptionsChart() {
    this.RegisterOutService.getConsumptionsPerMonth().subscribe((response) => {
      if (!response.isSuccess) return;
      const consumptionsPerMonth = response.data;
      let labels: string[] = new Array();
      let series: number[] = new Array();

      consumptionsPerMonth.forEach((item) => {
        labels.unshift(item.month);
        series.unshift(item.total);
      });
      
      this.actualMonthConsumptions = consumptionsPerMonth[0]?.total ?? 0;

      const dataConsumptionsChart: any = {
        labels: labels,
        series: [series],
      };
  
      const optionsConsumptionsChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0,
        }),
        low: 0,
        high: 500,
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
      };
  
      var ConsumptionsChart = new Chartist.Line(
        "#completedTasksChart",
        dataConsumptionsChart,
        optionsConsumptionsChart
      );
  
      this.startAnimationForLineChart(ConsumptionsChart);
    });}

  buildDonationsChart() {
    this.registerInService.getDonationsPerMonth().subscribe((response) => {
      if (!response.isSuccess) return;
      const donationsPerMonth = response.data;
      let labels: string[] = new Array();
      let series: number[] = new Array();

      donationsPerMonth.forEach((item) => {
        labels.unshift(item.month);
        series.unshift(item.total);
      });

      this.actualMonthDonations = donationsPerMonth[0]?.total ?? 0;
      
      var dataDonationsChart = {
        labels: labels,
        series: [series],
      };

      var optionsDonationsChart = {
        axisX: {
          showGrid: false,
        },
        low: 0,
        high: 500,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
      };

      var responsiveOptions: any[] = [
        [
          "screen and (max-width: 640px)",
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              },
            },
          },
        ],
      ];
      
      var DonationsChart = new Chartist.Bar(
        "#websiteViewsChart",
        dataDonationsChart,
        optionsDonationsChart,
        responsiveOptions
      );
      
      this.startAnimationForBarChart(DonationsChart);
    });
  }
}

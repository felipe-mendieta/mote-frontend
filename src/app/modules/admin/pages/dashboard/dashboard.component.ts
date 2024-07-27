import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/modules/admin/components/layout/service/app.layout.service';
import { ChartModule } from 'primeng/chart';
import { EmotionsChartComponent } from "../../components/emotions-chart/emotions-chart.component";
import { ExcellentClassChartComponent } from "../../components/excellent-class-chart/excellent-class-chart.component";
import { SleepChartComponent } from "../../components/sleep-chart/sleep-chart.component";
import { IdoNotGetItChartComponent } from "../../components/ido-not-get-it-chart/ido-not-get-it-chart.component";
import { TakeAbreakChartComponent } from "../../components/take-abreak-chart/take-abreak-chart.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [ChartModule, EmotionsChartComponent, ExcellentClassChartComponent, SleepChartComponent, IdoNotGetItChartComponent, TakeAbreakChartComponent]
})
export class DashboardComponent implements OnInit, OnDestroy {

  lineData: any;

  barData: any;

  polarData: any;

  lineOptions: any;

  barOptions: any;

  polarOptions: any;

  subscription: Subscription;

  constructor(private layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initCharts();
      });
  }

  ngOnInit() {
    this.initCharts();
  }


  initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
      }
    };

    this.lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
      }
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

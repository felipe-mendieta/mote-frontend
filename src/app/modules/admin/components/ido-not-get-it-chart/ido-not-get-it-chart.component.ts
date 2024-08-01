import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../layout/service/app.layout.service';
import { Subscription, debounceTime, filter, map } from 'rxjs';
import { DashboardActivity } from 'src/app/interfaces/activity.interface';
import { ACTIVITY } from 'src/app/modules/student/enums/activity.enum';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { initChartconf } from 'src/app/utils/configchartsettings';

@Component({
  selector: 'app-ido-not-get-it-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './ido-not-get-it-chart.component.html',
  styleUrl: './ido-not-get-it-chart.component.scss'
})
export class IdoNotGetItChartComponent implements OnInit, AfterViewInit {
  barData: any;
  barOptions: any;
  subscription: Subscription;
  currentPosition: number = 0;
  interactionsPerInterval: number[] = Array(initChartconf.numberOfBeans).fill(
    0
  );
  previousValues: number[] = [];
  historial: number[] = [];
  Interactions: number = 0;
  barChartXaxisLabels = initChartconf.barChartXaxisLabels;

  constructor(private layoutService: LayoutService, private dataRealTimeService: DataRealTimeService, private cdr: ChangeDetectorRef) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initCharts();
      });
  }

  ngOnInit() {
    this.initCharts();
    this.loadPreviousValues();
  }

  ngAfterViewInit() {
    this.dataRealTimeService
      .getActivity$()
      .pipe(
        //tap((res) => console.log('tap en excellent chart logic', res)),
        filter<DashboardActivity>(
          (activity) => activity.activityType == ACTIVITY.iDontGetIt
        )
      )
      .subscribe((activity: DashboardActivity) => {
        this.fetchRealTimeData(activity);
        this.cdr.detectChanges();
      });
  }

  fetchRealTimeData(activity: DashboardActivity): void {
    this.Interactions = activity.count;
    this.currentPosition = activity.historial.length;
    this.historial = activity.historial;

    if (this.isVectorLengthReached()) {
      /* End Updates*/
      // console.log('end updates');
    } else {
      this.updateLineChartData(this.Interactions);
    }
  }

  isVectorLengthReached(): boolean {
    if (this.currentPosition == this.interactionsPerInterval.length) {
      this.interactionsPerInterval.splice(
        0,
        this.historial.length,
        ...this.historial
      );
      return true;
    } else {
      return false;
    }
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
  }

  loadPreviousValues() {
    this.dataRealTimeService
      .getDashboardActivities()
      .pipe(
        map<DashboardActivity[], DashboardActivity[]>(
          (activities: DashboardActivity[]) => {
            return activities.filter((activity: DashboardActivity) => {
              return activity.activityType === ACTIVITY.iDontGetIt;
            });
          }
        )
      )
      .subscribe((data: DashboardActivity[]) => {
        if (data.length > 0) {
          this.previousValues = data[0].historial;
          this.currentPosition = this.previousValues.length;
          /*console.log(
            'Historial of "excellent class" activity:',
            this.previousValues
          );*/
          //console.log('currrent position', this.currentPosition);
          if (this.isPositionWithinDataRange()) {
            this.interactionsPerInterval.splice(
              0,
              this.previousValues.length,
              ...this.previousValues
            );
            // console.log(
            //   'Se ejecuta  "isPositionWithinDataRange"',
            //   this.interactionsPerInterval
            // );
            if (this.currentPosition == this.interactionsPerInterval.length) {
              /* End Updates*/
              //console.log('end updates');
            } else {
              // console.log('valor de count', data[0].count);
              this.updateLineChartData(data[0].count);
            }
            //this.lineChart.update();
          }
        } else {
          //console.log('No "excellent class" activity found.');
        }
      });
  }
  isPositionWithinDataRange(): boolean {
    /*console.log(
      'el tamano del vector de la grafica excellent-class',
      this.lineChart.data.datasets[0].data.length
    );*/
    console.log('current position', this.currentPosition);
    return this.currentPosition <= 12;
  }

  updateLineChartData(interactions: number): void {
    if (this.isPositionWithinDataRange()) {
      this.updateDataInterval(interactions);
      // this.lineChart.update();
    } else {
      this.endRealTimeUpdates();
    }
  }
  updateDataInterval(interactions: number) {
    this.interactionsPerInterval[this.currentPosition] = interactions;
    this.barData = {
      labels: this.barChartXaxisLabels,
      datasets: [
        {
          label: 'Sensaciones',
          data: [...this.interactionsPerInterval],
          fill: true,
          borderColor: '#4bc0c0',
          backgroundColor: '#4bc0c0',
          pointBackgroundColor: '#4bc0c0',
          pointBorderColor: '#4bc0c0',
          pointHoverBackgroundColor: '#4bc0c0',
          pointHoverBorderColor: '#4bc0c0'
        }
      ]
    };
  }
  endRealTimeUpdates() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/modules/admin/components/layout/service/app.layout.service';
import { ChartModule } from 'primeng/chart';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { Emotion } from 'src/app/interfaces/emotion.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [ChartModule]
})
export class DashboardComponent implements OnInit, OnDestroy {

  lineData: any;

  barData: any;

  pieData: any;

  polarData: any;

  radarData: any;

  lineOptions: any;

  barOptions: any;

  pieOptions: any;

  polarOptions: any;

  radarOptions: any;

  subscription: Subscription;

  constructor(private layoutService: LayoutService, private dataRealTimeService: DataRealTimeService) {
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

  loadPreviousValues() {
    this.dataRealTimeService
      .getDashboardEmotions()
      .pipe(/*tap((res) => console.log('tap in emotions chart logic get', res))*/)
      .subscribe((data: Emotion) => {
        if (data != null) {
          this.updateChart(data);
        } else {
          //console.log('No "emotions" activity found.');
        }
      });
  }

  updateChart(newData: Emotion) {
    const documentStyle = getComputedStyle(document.documentElement);
    this.pieData = {
      labels: ['Sorprendido', 'Asustado', 'Enfadado', 'Triste', 'Feliz'],
      datasets: [
        {
          data: [newData.surprised, newData.afraid, newData.angry, newData.sad, newData.happy],
          backgroundColor: [
            documentStyle.getPropertyValue('--indigo-500'),
            documentStyle.getPropertyValue('--purple-500'),
            documentStyle.getPropertyValue('--black-500'),
            documentStyle.getPropertyValue('--orange-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--indigo-400'),
            documentStyle.getPropertyValue('--purple-400'),
            documentStyle.getPropertyValue('--black-400'),
            documentStyle.getPropertyValue('--orange-400'), ,
            documentStyle.getPropertyValue('--green-400')
          ]
        }]
    };
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

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
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

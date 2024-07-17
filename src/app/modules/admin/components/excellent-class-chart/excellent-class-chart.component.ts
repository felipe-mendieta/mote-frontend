import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../layout/service/app.layout.service';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-excellent-class-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './excellent-class-chart.component.html',
  styleUrl: './excellent-class-chart.component.scss'
})
export class ExcellentClassChartComponent implements OnInit {
  barData: any;
  barOptions: any; 
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
  }
}

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartModule } from 'primeng/chart';
import { Subscription } from 'rxjs';
import { Emotion } from 'src/app/interfaces/emotion.interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';

@Component({
  selector: 'app-emotions-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './emotions-chart.component.html',
  styleUrl: './emotions-chart.component.scss'
})
export class EmotionsChartComponent implements OnInit, AfterViewInit {
  pieData: any;
  pieOptions: any;
  radarOptions: any;
  radarData: any;
  emotionsDataSubscription: Subscription = new Subscription();
  emotionsChart!: Chart;
  @ViewChild('emotionsChart')
  chartRef!: ElementRef;
  constructor(private dataRealTimeService: DataRealTimeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.initChart();
    this.loadPreviousValues();
  }

  ngAfterViewInit() {
    this.emotionsDataSubscription = this.dataRealTimeService
      .getEmotionsDataObservable$()
      .subscribe((newData: Emotion) => {
        this.updateChart(newData);
        this.cdr.detectChanges(); // Manually trigger change detection
      });
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.radarData = {
      labels: ['Sorprendido', 'Asustado', 'Enfadado', 'Triste', 'Feliz'],
      datasets: [
          {
              label: 'Emociones',
              borderColor: documentStyle.getPropertyValue('--indigo-400'),
              pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
              pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
              pointHoverBackgroundColor: textColor,
              pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
              data: [0, 0, 0, 0, 0]
          }
      ]
  };

    this.radarOptions = {
      plugins: {
        legend: { 
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        r: {
          pointLabels: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
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
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.radarData = {
      labels: ['Sorprendido', 'Asustado', 'Enfadado', 'Triste', 'Feliz'],
      datasets: [
          {
              label: 'Emociones',
              borderColor: documentStyle.getPropertyValue('--indigo-400'),
              pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
              pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
              pointHoverBackgroundColor: textColor,
              pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
              data: [newData.surprised, newData.afraid, newData.angry, newData.sad, newData.happy]
          }
      ]
  };
  }

}

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  WritableSignal,
  signal,
  effect,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Emotion } from 'src/app/interfaces/emotion.interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';

@Component({
  selector: 'app-emotions-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './emotions-chart.component.html',
  styleUrls: ['./emotions-chart.component.scss'],
})
export class EmotionsChartComponent implements OnInit, AfterViewInit {
  barData: any;
  barOptions: any;
  emotionsData: WritableSignal<Emotion> = signal({
    _id: '',
    surprised: 0,
    afraid: 0,
    angry: 0,
    sad: 0,
    happy: 0,
  });

  constructor(
    private dataRealTimeService: DataRealTimeService,
    private cdr: ChangeDetectorRef
  ) {
    this.setupReactivity();
  }

  ngOnInit() {
    this.initChart();
    this.loadPreviousValues();
  }

  ngAfterViewInit() {
    this.dataRealTimeService
      .getEmotionsDataObservable$()
      .subscribe((newData: Emotion) => {
        this.emotionsData.set(newData);
        this.cdr.detectChanges();
      });
  }

  initChart() {
    const textColor = '#333333';

    this.barData = {
      labels: ['Feliz', 'Triste', 'Enfadado', 'Sorprendido', 'Asustado'],
      datasets: [
        {
          label: 'Número de Estudiantes',
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
            '#FFD700', // Feliz (Amarillo)
            '#1E90FF', // Triste (Azul)
            '#FF4500', // Enfadado (Rojo)
            '#FFA500', // Sorprendido (Naranja)
            '#8A2BE2', // Asustado (Morado)
          ],
          borderColor: '#fff',
          borderWidth: 1,
        },
      ],
    };

    this.barOptions = {
      indexAxis: 'y', // Cambia el gráfico a barras horizontales
      plugins: {
        legend: {
          display: false, // Oculta la leyenda
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context: any) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.x !== null) {
                label += `${context.parsed.x} estudiantes`;
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Número de Estudiantes',
            color: textColor,
            font: {
              size: 14,
              weight: 'bold',
            },
          },
          ticks: {
            color: textColor,
            beginAtZero: true,
            stepSize: 1,
          },
          grid: {
            display: true,
            color: '#e9e9e9',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Emociones',
            color: textColor,
            font: {
              size: 14,
              weight: 'bold',
            },
          },
          ticks: {
            color: textColor,
            font: {
              size: 12,
            },
          },
          grid: {
            display: false,
          },
        },
      },
    };
  }

  loadPreviousValues() {
    this.dataRealTimeService
      .getDashboardEmotions()
      .subscribe((data: Emotion) => {
        if (data != null) {
          this.emotionsData.set(data);
        }
      });
  }

  setupReactivity() {
    effect(() => {
      const newData = this.emotionsData();
      this.updateChart(newData);
    });
  }

  updateChart(newData: Emotion) {
    this.barData = {
      ...this.barData,
      datasets: [
        {
          ...this.barData.datasets[0],
          data: [
            newData.happy,
            newData.sad,
            newData.angry,
            newData.surprised,
            newData.afraid,
          ],
        },
      ],
    };
  }
}

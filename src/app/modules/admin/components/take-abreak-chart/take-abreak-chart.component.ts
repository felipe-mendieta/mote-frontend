import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../layout/service/app.layout.service';
import { Subscription, debounceTime, filter, map } from 'rxjs';
import { DashboardActivity } from 'src/app/interfaces/activity.interface';
import { ACTIVITY } from 'src/app/modules/student/enums/activity.enum';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { initChartconf } from 'src/app/utils/configchartsettings';

@Component({
  selector: 'app-take-abreak-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './take-abreak-chart.component.html',
  styleUrls: ['./take-abreak-chart.component.scss'],
})
export class TakeAbreakChartComponent implements OnInit, AfterViewInit {
  barData: any;
  barOptions: any;
  subscription: Subscription;
  currentPosition: number = 0;
  interactionsPerInterval: number[] = Array(initChartconf.numberOfBeans).fill(0);
  previousValues: number[] = [];
  historial: number[] = [];
  Interactions: number = 0;
  barChartXaxisLabels = initChartconf.barChartXaxisLabels;

  constructor(
    private layoutService: LayoutService,
    private dataRealTimeService: DataRealTimeService,
    private cdr: ChangeDetectorRef
  ) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe(() => {
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
        filter<DashboardActivity>(
          (activity) => activity.activityType == ACTIVITY.break
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
      // Fin de las actualizaciones
    } else {
      this.updateBarChartData(this.Interactions);
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
    const textColor = '#333333';
    const gridLineColor = '#e9e9e9';

    this.barOptions = {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += `${context.parsed.y} estudiantes`;
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
            text: 'Intervalos de Tiempo (cada 10 minutos)',
            color: textColor,
          },
          ticks: {
            color: textColor,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: true, // Muestra las líneas guía en el eje X
            color: gridLineColor,
          },
        },
        y: {
          title: {
            display: true,
            text: 'Número de Interacciones',
            color: textColor,
          },
          ticks: {
            color: textColor,
            stepSize: 1, // Incrementos de 1 en el eje Y
            beginAtZero: true, // Inicia el eje Y desde cero
            precision: 0, // Evita mostrar decimales
            callback: function (value:any) {
              return Number(value).toFixed(0); // Formatea las etiquetas para mostrar enteros
            },
          },
          grid: {
            display: true, // Muestra las líneas guía en el eje Y
            color: gridLineColor,
          },
        },
      },
    };

    // Inicializa los datos del gráfico
    this.barData = {
      labels: this.barChartXaxisLabels,
      datasets: [
        {
          label: 'Interacciones',
          data: [...this.interactionsPerInterval],
          backgroundColor: '#8E44AD', // Color distintivo para "Tomar un Descanso"
          borderColor: '#8E44AD',
          borderWidth: 1,
        },
      ],
    };
  }

  loadPreviousValues() {
    this.dataRealTimeService
      .getDashboardActivities()
      .pipe(
        map<DashboardActivity[], DashboardActivity[]>((activities: DashboardActivity[]) => {
          return activities.filter((activity: DashboardActivity) => {
            return activity.activityType === ACTIVITY.break;
          });
        })
      )
      .subscribe((data: DashboardActivity[]) => {
        if (data.length > 0) {
          this.previousValues = data[0].historial;
          this.currentPosition = this.previousValues.length;
          if (this.isPositionWithinDataRange()) {
            this.interactionsPerInterval.splice(
              0,
              this.previousValues.length,
              ...this.previousValues
            );
            if (this.currentPosition == this.interactionsPerInterval.length) {
              // Fin de las actualizaciones
            } else {
              this.updateBarChartData(data[0].count);
            }
          }
        }
      });
  }

  isPositionWithinDataRange(): boolean {
    return this.currentPosition <= this.interactionsPerInterval.length;
  }

  updateBarChartData(interactions: number): void {
    if (this.isPositionWithinDataRange()) {
      this.updateDataInterval(interactions);
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
          label: 'Interacciones',
          data: [...this.interactionsPerInterval],
          backgroundColor: '#8E44AD',
          borderColor: '#8E44AD',
          borderWidth: 1,
        },
      ],
    };
  }

  endRealTimeUpdates() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartModule } from 'primeng/chart';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { PollEngagementResponse } from 'src/app/interfaces/pollResponses.interface';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss'],
  standalone: true,
  imports: [ChartModule, NgForOf],
})
export class SurveyResultsComponent implements OnInit {
  barData: any;
  barOptions: any;

  // Agrego las explicaciones de cada dimensión y puntaje
  engagementExplanations = [
    {
      dimension: 'Cognitivo',
      color: '#42A5F5',
      low: '1 - Muy bajo compromiso cognitivo: El estudiante muestra poco interés en comprender el material.',
      high: '5 - Muy alto compromiso cognitivo: El estudiante está altamente involucrado en el aprendizaje y comprensión profunda del material.',
    },
    {
      dimension: 'Afectivo',
      color: '#66BB6A',
      low: '1 - Muy bajo compromiso afectivo: El estudiante tiene poca conexión emocional con el curso.',
      high: '5 - Muy alto compromiso afectivo: El estudiante se siente muy conectado y entusiasmado con el curso.',
    },
    {
      dimension: 'Conductual',
      color: '#FFA726',
      low: '1 - Muy bajo compromiso conductual: El estudiante participa mínimamente.',
      high: '5 - Muy alto compromiso conductual: El estudiante participa activamente.',
    },
  ];

  constructor(private dataRealTimeService: DataRealTimeService) {}

  ngOnInit() {
    this.initChartOptions();
    this.loadSurveyData();
  }

  loadSurveyData() {
    this.dataRealTimeService.getDashboardPollEngagementResponse().subscribe((data: PollEngagementResponse) => {
      if (data) {
        this.updateChartData(data);
      }
    });
  }

  updateChartData(data: PollEngagementResponse) {
    this.barData = {
      labels: ['Cognitivo', 'Afectivo', 'Conductual'],
      datasets: [
        {
          label: 'Puntaje Promedio',
          backgroundColor: this.engagementExplanations.map((item) => item.color),
          data: [data.cognitive, data.emotional, data.behavioral],
        },
      ],
    };
  }

  initChartOptions() {
    const textColor = '#333';
    const gridLineColor = '#e0e0e0';

    this.barOptions = {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context: any) => {
              let label = `${context.label}: `;
              label += context.parsed.y.toFixed(1);
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Dimensiones de Compromiso',
            color: textColor,
            font: {
              size: 16,
              weight: 'bold',
            },
          },
          ticks: {
            color: textColor,
            font: {
              size: 14,
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          title: {
            display: true,
            text: 'Puntaje Promedio (1-5)',
            color: textColor,
            font: {
              size: 16,
              weight: 'bold',
            },
          },
          ticks: {
            color: textColor,
            stepSize: 1,
            beginAtZero: true,
            max: 5,
            callback: function (value: any) {
              return Number(value).toFixed(0);
            },
          },
          grid: {
            color: gridLineColor,
          },
        },
      },
    };
  }

}

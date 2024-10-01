import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/modules/admin/components/layout/service/app.layout.service';
import { ChartModule } from 'primeng/chart';
import { EmotionsChartComponent } from "../../components/emotions-chart/emotions-chart.component";
import { ExcellentClassChartComponent } from "../../components/excellent-class-chart/excellent-class-chart.component";
import { SleepChartComponent } from "../../components/sleep-chart/sleep-chart.component";
import { IdoNotGetItChartComponent } from "../../components/ido-not-get-it-chart/ido-not-get-it-chart.component";
import { TakeAbreakChartComponent } from "../../components/take-abreak-chart/take-abreak-chart.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [ChartModule, EmotionsChartComponent, ExcellentClassChartComponent, SleepChartComponent, IdoNotGetItChartComponent, TakeAbreakChartComponent, NgIf]
})
export class DashboardComponent  {
  activeTab1: string = 'excellent';
  activeTab2: string = 'sleepy';

  selectTab1(tabName: string) {
    this.activeTab1 = tabName;
  }

  selectTab2(tabName: string) {
    this.activeTab2 = tabName;
  }
}

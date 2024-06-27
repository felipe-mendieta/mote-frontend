import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';
import { IDoNotGetItChartComponent } from '../../components/ido-not-get-it-chart/ido-not-get-it-chart.component';
import { SleepChartComponent } from '../../components/sleep-chart/sleep-chart.component';
import { TakeAbreakChartComponent } from '../../components/take-abreak-chart/take-abreak-chart.component';
import { DonnutsEmotionsComponent } from '../../components/donnuts-emotions/donnuts-emotions.component';
import { ExcellentClassChartComponent } from '../../components/excellent-class-chart/excellent-class-chart.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [
        ExcellentClassChartComponent,
        DonnutsEmotionsComponent,
        TakeAbreakChartComponent,
        SleepChartComponent,
        IDoNotGetItChartComponent,
    ],
})
export class DashboardComponent implements OnInit {
  sidebarWidth = true;
  private subscription: Subscription = new Subscription();
  constructor(private sideBarService: SidebarService) {
    this.sideBarService.getwidthObservable$().subscribe((data: boolean) => {
      this.sidebarWidth = data;
    });
  }

  ngOnInit(): void {
    //console.log('soy ngOnInit Del Dashboard');
  }

  ngOnDestroy() {
    //console.log('onDestroy Dashboard');
  }
}

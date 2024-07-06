import { Component } from '@angular/core';
import { SurveyResultsChartComponent } from '../../components/survey-results-chart/survey-results-chart.component';

@Component({
    selector: 'my-survey-results',
    templateUrl: './my-survey-results.component.html',
    styleUrls: ['./my-survey-results.component.scss'],
    standalone: true,
    imports: [SurveyResultsChartComponent],
})
export class MySurveyResultsComponent {}

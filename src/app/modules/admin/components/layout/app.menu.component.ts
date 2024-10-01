import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: true,
    imports: [NgFor, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home', icon: 'pi pi-home', routerLink: ['/admin/panel']
            },
          {
            label: 'Sala', icon: 'pi pi-fw pi-wallet', routerLink: ['/admin/panel/roomInfo']
          },
            {
                label: 'Comentarios', icon: 'pi pi-fw pi-comments',routerLink: ['/admin/panel/comments']
            },
            {
                label: 'Estadísticas', icon: 'pi pi-chart-line',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-chart-pie', routerLink: ['/admin/panel/dashboard'] },
                    { label: 'Resultado Encuestas', icon: 'pi pi-chart-bar', routerLink: ['/admin/panel/surveyResults'] }
                ]
            },

          {
            label: 'Encuestas', icon: 'pi pi-fw pi-send', routerLink: ['/admin/panel/survey']
          },
          {
            label: 'Flashquestion', icon: 'pi pi-fw pi-question', routerLink: ['/admin/panel/flashquestions']
          },

        ];
    }
}

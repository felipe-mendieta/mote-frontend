import {Component, inject, OnInit} from '@angular/core';
import { ScreenService } from './services/screen.service';
import {NotificationsService} from "./services/notifications.service";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['../styles.scss'],
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'studentFront';
  constructor(private screenService: ScreenService) {}
  notificationService = inject(NotificationsService);
  ngOnInit() {
    // Llama al servicio para mantener la pantalla activa
    this.keepScreenOn();
    this.notificationService.reqNotificationPermission();
  }
  ngOnDestroy() {
    this.screenService.disableKeepAwake(); // Desactiva mantener la pantalla activa al salir del componente
  }
  keepScreenOn() {
    this.disableScreenOn();
  }
  disableScreenOn() {
    this.screenService.disableKeepAwake();
  }
}

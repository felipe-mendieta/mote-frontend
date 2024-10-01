import {Component, inject, OnInit} from '@angular/core';
import { ScreenService } from './services/screen.service';
import {NotificationsService} from "./services/notifications.service";
import { RouterOutlet } from '@angular/router';
import {PrimeNGConfig} from "primeng/api";
import {AppConfig, LayoutService} from "./modules/admin/components/layout/service/app.layout.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['../styles.scss'],
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  title = 'studentFront';
  constructor(private screenService: ScreenService, private primengConfig: PrimeNGConfig, private layoutService: LayoutService) {}
  notificationService = inject(NotificationsService);
  ngOnInit() {
    // Llama al servicio para mantener la pantalla activa
    this.keepScreenOn();
    this.notificationService.reqNotificationPermission();

    this.primengConfig.ripple = true;       //enables core ripple functionality

    //optional configuration with the default configuration
    const config: AppConfig = {
      ripple: false,                      //toggles ripple on and off
      inputStyle: 'outlined',             //default style for input elements
      menuMode: 'slim-plus',                   //layout mode of the menu, valid values are "static", "overlay", "slim", and "slim-plus"
      colorScheme: 'light',               //color scheme of the template, valid values are "light", "dim" and "dark"
      theme: 'indigo',                    //default component theme for PrimeNG, see theme section for available values
      layoutTheme: 'colorScheme',         //theme of the layout, see layout theme section for available values
      scale: 14                           //size of the body font size to scale the whole application
    };
    this.layoutService.config.set(config);

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

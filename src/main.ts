import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { config } from 'src/config/socket.config';
import { SocketIoModule } from 'ngx-socket-io';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, SocketIoModule.forRoot(config), ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        })),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),

    ]
})
  .catch(err => console.error(err));

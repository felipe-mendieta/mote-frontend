import { Component } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { DataRealTimeService } from '../../../../services/data-real-time.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'dashboard-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet]
})
export class LayoutComponent {
  constructor(
  ) { }
  ngOnInit(): void {
  }
}

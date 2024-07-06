import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-room-info',
  standalone: true,
  imports: [ButtonModule, InputTextModule],
  templateUrl: './room-info.component.html',
  styleUrl: './room-info.component.scss'
})
export class RoomInfoComponent {
  roomCreated: boolean = false;
  ngOnInit() {
    const exitDiv = document.getElementById('exitDiv');
    exitDiv!.style.display = 'none';
  }
  toggleDivs() {
    const enterDiv = document.getElementById('enterDiv');
    const exitDiv = document.getElementById('exitDiv');

    this.roomCreated = !this.roomCreated;
    if (this.roomCreated) {
      enterDiv!.style.display = 'none';
      exitDiv!.style.display = 'block';
    } else {
      enterDiv!.style.display = 'block';
      exitDiv!.style.display = 'none';
    }
  }
}


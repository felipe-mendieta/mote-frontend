import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { Room } from 'src/app/interfaces/room.interface';
import { NgIf } from '@angular/common';
import {Ripple} from "primeng/ripple";
import {environment} from "../../../../../../environments/environment";
import {QrCodeModule} from "ng-qrcode";

@Component({
  selector: 'app-room-info',
  standalone: true,
  imports: [ButtonModule, InputTextModule, NgIf, ReactiveFormsModule, Ripple, QrCodeModule],
  templateUrl: './room-info.component.html',
  styleUrl: './room-info.component.scss'
})
export class RoomInfoComponent {
  qrCodeUrl: string = '';
  isRoomCreated: boolean = false;
  myFormRoom: FormGroup = this.formBuilder.group({});
  newCode: string = '';
  newRoomId: string = '';
  isCodeCopied: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private dataRealTimeService: DataRealTimeService
  ) {
    this.builForm();
    this.isRoomJoined();
  }

  ngOnInit() {
    if(this.newCode) {
      this.qrCodeUrl = this.createUrlCode();
    }
    this.toggleDivs();
  }

  private builForm() {
    this.myFormRoom = this.formBuilder.group({
      roomName: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  isRoomJoined() {
    if (this.roomService.isRoomCreated()) {
      this.isRoomCreated = true;
      this.newCode = this.roomService.getRoomCode() || '';
    }
    return;
  }

  createRoom() {
    if (this.myFormRoom.valid) {
      const newRoom = this.myFormRoom.get('roomName')?.value;
      this.roomService.createRoom(newRoom).subscribe((response: Room) => {
        //console.log('Nueva sala creada con exito', response);
        this.newCode = response.code;
        this.newRoomId = response._id;

        this.qrCodeUrl = this.createUrlCode();
      });

      this.roomService.setRoomId(this.newRoomId);
      this.roomService.joinRoom(this.newCode);
      this.isRoomCreated = true;
      this.toggleDivs();
    }
  }

  exitRoom() {
    this.dataRealTimeService.clearIntervals().subscribe();
    this.isRoomCreated = false;
    this.roomService.leaveRoom(this.newCode);
    this.toggleDivs();
  }

  get isRoomNameValid() {
    return (
      this.myFormRoom.get('roomName')?.valid &&
      this.myFormRoom.get('roomName')?.touched
    );
  }

  get isRoomNameInvalid() {
    return (
      this.myFormRoom.get('roomName')?.invalid &&
      this.myFormRoom.get('roomName')?.touched
    );
  }

  toggleDivs() {
    const enterDiv = document.getElementById('enterDiv');
    const exitDiv = document.getElementById('exitDiv');
    if (this.isRoomCreated) {
      enterDiv!.style.display = 'none';
      exitDiv!.style.display = 'block';
    } else {
      enterDiv!.style.display = 'block';
      exitDiv!.style.display = 'none';
    }
  }
  copyCodeToClipboard() {
    navigator.clipboard.writeText(this.newCode).then(() => {
      this.isCodeCopied = true;
      setTimeout(() => this.isCodeCopied = false, 3000); // Aviso visible por 3 segundos
    }, (err) => {
      console.error('Error al copiar el código: ', err);
    });
  }

  private createUrlCode() {
    return `${environment.mainUrl}/auth/login?room=${this.newCode}`;;
  }
}


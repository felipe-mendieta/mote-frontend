import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { RequestStatus } from 'src/app/interfaces/models/request-status.model';
import { RoomService } from '../../../../services/room.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'auth-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgClass,
        NgIf,
    ],
})
export class LoginFormComponent {
  isRoomInvalid: boolean = false; // Variable para rastrear si la sala no es válida
  miFormulario!: FormGroup;
  status: RequestStatus = 'init';
  mainUrl = environment.mainUrl;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roomService: RoomService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.builForm();
  }
//http://localhost:4200/#/auth/login?room=V5pv
  ngOnInit(): void {
    //print my actual link for this component
    console.log(this.router.url);
    //join with qr code room
    this.route.queryParams.subscribe((params) => {
      if (params['room']) {
        console.log("trying to join with qr",params['room']);
        this.miFormulario.get('userPin')?.setValue(params['room']);
        this.loginRoom();
      }
    });
  }

  get isPinValid() {
    return (
      this.miFormulario.get('userPin')?.valid &&
      this.miFormulario.get('userPin')?.touched
    );
  }

  get isPinInvalid() {
    return (
      this.miFormulario.get('userPin')?.invalid &&
      this.miFormulario.get('userPin')?.touched
    );
  }

  private builForm() {
    this.miFormulario = this.formBuilder.group({
      userPin: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
  loginRoom() {
    if (this.miFormulario.valid) {
      const { userPin } = this.miFormulario.getRawValue();
      this.status = 'loading';

      this.roomService
        .checkRoomExists(userPin, 'user')
        .subscribe((roomExists) => {
          if (roomExists.ok) {
            this.authService.setAndStoreUserRole('student');
            this.router.navigateByUrl(`/student/my-emotions`);
          } else if (!roomExists.ok) {
            this.isRoomInvalid = true;
            this.miFormulario.markAllAsTouched();
          }
        });
    } else {
      this.miFormulario.markAllAsTouched();
    }
  }
}

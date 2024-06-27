import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoomService } from 'src/app/services/room.service';
import { TokenService } from 'src/app/services/token.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [LoginFormComponent],
})
export class LoginComponent implements OnInit {
  //injection of services
  constructor(private tokenService: TokenService,
    private router: Router,
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';
import { ValuemanagerService } from './valuemanager.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseLoginDashboard } from '../interfaces/models/auth.model';
import { environment } from 'src/environments/environment';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl;
  userRole: string = '';
  constructor(
    private valueManagerService: ValuemanagerService,
    private tokenService: TokenService,
    private router: Router,
    private http: HttpClient,
    private roomService: RoomService
  ) { }
  //token = ''
  login(rol = '', data = {email:'',aud:'',name:'',picture:''}): Observable<ResponseLoginDashboard> {
    // console.log('login service');
    const info = {
      rol: rol,
      name: data.name,
      email: data.email,
      aud: data.aud,
      picture: data.picture
    };
    console.log(info);
    return this.http
      .post<ResponseLoginDashboard>(`${this.apiUrl}/auth/login`, info)
      .pipe(
        tap((res) => {
          if (res.ok) {
            this.tokenService.saveToken(res.token);
            this.roomService.setUserId(res.userId);
          }
        })
      );
  }

  setAndStoreUserRole(role: string = '') {
    localStorage.setItem('type-user', role);
  }

  getUserRole(): string {
    let storageKey = 'type-user';
    const userRole = this.userRole || localStorage.getItem(storageKey);
    //console.log('este es el rol del usuario', userRole);
    return userRole || '';
  }

  logout() {
    const roomCode = this.roomService.getRoomCode() || '';
    this.roomService.studentLeaveRoom(roomCode);
    this.tokenService.removeToken();
    localStorage.clear();
    this.router.navigate(['/auth']);
    //recharge page for generate new id token
    location.reload();
    this.valueManagerService.resetValues();
  }
}

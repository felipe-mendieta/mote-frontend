import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
declare var google: any;
//import environment from '../../../../../../environments/environment';
@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.scss'],
  standalone: true,
})
export class LoginDashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    window.onload = () => {
      this.initializeGoogle();
    }
  }

  private decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(this.decodeBase64(base64));
  }

  private decodeBase64(base64: string) {
    const decodedString = atob(base64);
    return decodeURIComponent(
      Array.prototype.map
        .call(decodedString, (c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  handleLogin(response: any) {
    if (response) {
      const payLoad = this.decodeToken(response.credential);
      this.authService.login('admin', payLoad).subscribe((res) => {
        this.ngZone.run(() => {
          this.authService.setAndStoreUserRole('teacher');
          this.router.navigate(['/dashboard']);
        });
      });
    }
  }

  private initializeGoogle() {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350,
    });
  }
}

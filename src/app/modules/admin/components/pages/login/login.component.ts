import { Component, NgZone, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/modules/admin/components/layout/service/app.layout.service';
import { AppConfigComponent } from 'src/app/modules/admin/components/layout/config/app.config.component';
import { RouterLink } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgClass } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
declare var google: any;
@Component({
    templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
    standalone: true,
    imports: [NgClass, InputTextModule, ButtonModule, RippleModule, RouterLink, AppConfigComponent]
})
export class LoginComponent implements OnInit{

	constructor(private layoutService: LayoutService,
		private authService: AuthService,private router: Router,
		private ngZone: NgZone,) {}
		ngOnInit(): void {
			window.onload = () => {
			  this.initializeGoogle();
			}
		  }

	get filledInput(): boolean {
		return this.layoutService.config().inputStyle === 'filled';
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
		  //decode the token
		  const payLoad = this.decodeToken(response.credential);
		  //store in session
		  sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));
		  //navigate to home/browse
	
		  this.authService.login('admin',payLoad).subscribe((res) => {
			//console.log(res);
	
			//ng zone
			this.ngZone.run(() => {
			  this.authService.setAndStoreUserRole('teacher');
			  this.router.navigate(['/admin/panel']);
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
		  width: 300,
		});
	  }

}

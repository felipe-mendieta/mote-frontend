import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { DataRealTimeService } from '../../../../services/data-real-time.service';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../../../services/auth-google.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    standalone: true,
    imports: [RouterLink, NgFor, RouterLinkActive, NgIf, NgClass, InputTextModule, StyleClassModule, RippleModule]
})
export class AppTopBarComponent implements OnInit {

    menu: MenuItem[] = [];

    @ViewChild('searchinput') searchInput!: ElementRef;

    @ViewChild('menubutton') menuButton!: ElementRef;
    
    searchActive: boolean = false;
    private _email: string = '';
    private _profileName: string= '';
    private _profilePicture: string= '';

    constructor(
        public layoutService: LayoutService,
        private tokenService: TokenService,
        private dataRealTimeService: DataRealTimeService,
        private router: Router,
        private authGoogleService: AuthGoogleService,
    ) { }
    ngOnInit(): void {
        var user = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
        this.profileName = user.name;
        this.email = user.email;
        this.profilePicture = user.picture;
    }
    get profilePicture(): string {
        return this._profilePicture;
    }

    set profilePicture(value: string) {
        this._profilePicture = value;
    }
    set profileName(name: string) {
        this._profileName = name;
    }
    get profileName(): string {
        return this._profileName;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }
    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }

    removeTab(event: MouseEvent, item: MenuItem, index: number) {
        this.layoutService.onTabClose(item, index);
        event.preventDefault();
    }

    get layoutTheme(): string {
        return this.layoutService.config().layoutTheme;
    }

    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    get logo(): string {
        const path = 'assets/layout/images/logo-';
        const logo = (this.layoutTheme === 'primaryColor' && !(this.layoutService.config().theme == "yellow")) ? 'light.png' : (this.colorScheme === 'light' ? 'dark.png' : 'light.png');
        // return path + logo;
        return 'assets/logos/main-logo.svg';
    }

    get tabs(): MenuItem[] {
        return this.layoutService.tabs;
    }
    logout() {
        localStorage.clear();
        this.tokenService.removeToken();
        this.dataRealTimeService.clearIntervals().subscribe();
        this.router.navigate(['/admin']);
        this.authGoogleService.signOut();
        //recharge page for generate new id token
        location.reload();
    }
}

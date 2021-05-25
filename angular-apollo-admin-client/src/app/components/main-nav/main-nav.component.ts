import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit  {
  isUserLogged: boolean = !!this.authService.authorizedUser;
  nickname?: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
        this.isUserLogged = isAuthenticated;
        this.nickname = this.authService.authorizedUser?.nickname;
      });
  }

  onLogoutClick() {
    this.authService.logout();
  }
}

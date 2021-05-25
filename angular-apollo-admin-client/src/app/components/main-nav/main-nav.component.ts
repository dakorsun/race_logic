import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  isUserLogged: boolean = !!this.authService.authorizedUser;
  username: string | null = this.authService.authorizedUser && `${
    this.authService.authorizedUser?.firstName
    + this.authService.authorizedUser?.lastName
  }`;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  onLogoutClick() {
    this.authService.doLogout();
  }
  onLoginClick() {

  }
}
